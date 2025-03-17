import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';
import { ToastService } from '../../../shared/services/Toast/toast.service';
import { MenuItem } from 'primeng/api';
import { HttpService} from '../../../shared/services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;
  private Loginservice = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public httpService = inject(HttpService)
 
  docOptions = [
    { name: 'C.C', id: 'CC' },
    { name: 'T.I', id: 'TI' },
    { name: 'C.E', id: 'CE' },
    { name: 'P.A', id: 'PA' },
  ];


  genderOptions = [
    { name: 'Hombre', code: 'H' },
    { name: 'Mujer', code: 'M' },
  ];

  careerOptions: {id: number; name: string}[] = [];
  
  loadCareers(): void {
    const url = `${environment.apiUrl}/career`;
    this.httpService.request<{id: number; name : string}[]>(url,'GET')
    .then(response => {
      if (response && Array.isArray(response.data)){
        this.careerOptions = response.data;
      }
    })
  }
  

  semesterOptions = [
    { name: '1', id: '1' },
    { name: '2', id: '2' },
    { name: '3', id: '3' },
    { name: '4', id: '4' },
    { name: '5', id: '5' },
    { name: '6', id: '6' },
    { name: '7', id: '7' },
    { name: '8', id: '8' },
    { name: '9', id: '9' },
    { name: '10', id: '10' },
  ];


  public emailForm: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
  });

  public personalForm: FormGroup = this.formBuild.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    age: ['', [Validators.required]],
    id: [{ value: '', disabled: true }, [Validators.required]], 
    document: ['', [Validators.required]], 
    gender: ['', [Validators.required]],
    code: ['', [Validators.required]],
    carreer: ['', [Validators.required]],
    semester: ['', [Validators.required]],
  });

  public directionForm: FormGroup = this.formBuild.group({
    neighborhood: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    aditional: ['', [Validators.required]],
  });

  public passwordForm: FormGroup = this.formBuild.group({
    password: ['', [Validators.required]],
  });

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Email' },
      { label: 'Personal' },
      { label: 'Direction' },
      { label: 'Password' },
    ];

    this.loadCareers();
    
    this.personalForm.get('document')?.valueChanges.subscribe((value) => {
      const idControl = this.personalForm.get('id');

      if (value) {

        idControl?.enable();


        if (['CC', 'TI', 'CE'].includes(value)) {
          idControl?.setValidators([Validators.required, Validators.pattern(/^\d+$/)]);
        } else if (value === 'PA') {
          idControl?.setValidators([Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]);
        }
      } else {
    
        idControl?.disable();
        idControl?.clearValidators();
      }


      idControl?.updateValueAndValidity();
    });
  }

  next() {
    const forms = [
      this.emailForm,
      this.personalForm,
      this.directionForm,
      this.passwordForm,
    ];

    const currentForm = forms[this.activeIndex];
    if (currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }

    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  previous() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  async register() {
    if (this.passwordForm.invalid) return;

    const object: User = {
      name: this.personalForm.value.name,
      auth: {
        email: this.emailForm.value.email,
        password: this.passwordForm.value.password,
      },
      last_name: this.personalForm.value.lastname,
      age: 18,
      code: this.personalForm.value.code,
      gender: this.personalForm.value.gender,
      direction: {
        neighborhood: this.directionForm.value.neighborhood,
        street: this.directionForm.value.street,
        number: this.directionForm.value.number,
        aditional_information: this.directionForm.value.aditional,
      },
      student_detail: {
        career: {
          id: this.personalForm.value.carreer,
        },
        semester: this.personalForm.value.semester,
      },
      role: {
        id: 1,
      },
    };

    const data = await this.Loginservice.register(object);
    console.log(object);
    this.router.navigate(['auth/login']);
    this.toastService.show({
      severity: 'success',
      detail: 'Success at login',
      sumary: '',
    });
  }

  login() {
    this.router.navigate(['auth/login']);
  }
}