import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';
import { ToastService } from '../../../shared/services/Toast/toast.service';
import { MenuItem } from 'primeng/api';
import { HttpService } from '../../../shared/services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { LoaderService } from '../../../shared/services/loader/loader.service';
import { IDocument } from '../../../interfaces/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;

  docOptions: IDocument[] = [];

  genderOptions = [
    { name: 'Hombre', code: 'H' },
    { name: 'Mujer', code: 'M' },
  ];

  careerOptions: { id: number; name: string }[] = [];

  constructor(
    private toastService: ToastService,
    private readonly loadingSrv: LoaderService,
    private readonly Loginservice: LoginService,
    private readonly router: Router,
    private formBuild: FormBuilder,
    private httpService: HttpService
  ) {}

  async ngOnInit() {
    this.items = [
      { label: 'Correo electronico' },
      { label: 'Información personal' },
      { label: 'Dirección' },
      { label: 'Contraseña' },
    ];

    this.loadCareers();
    const documents = await this.httpService.request<IDocument[]>(
      `${environment.apiUrl}user/documents`,
      'GET'
    );
    this.docOptions = documents.data;
  }

  // calcularEdad(age: number): void {
  //   console.log("Enter", age)
  //   this.personalForm.get('age')?.setValue(age);
  //   console.log(this.personalForm.get("age")?.value)
  // }

  updateForm(event: number) {
    const idControl = this.personalForm.get('document_number');

    if (event) {
      const doc: IDocument | undefined = this.docOptions.find(
        (doc) => doc.id === event
      );
      console.log(doc);

      idControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]);
      idControl?.enable();

      if (!doc) {
        idControl?.disable();
        idControl?.clearValidators();
      } else if (doc?.name === 'PA') {
        idControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]);
      }
    }

    idControl?.updateValueAndValidity();
  }

  loadCareers(): void {
    const url = `${environment.apiUrl}career`;
    this.httpService
      .request<{ id: number; name: string }[]>(url, 'GET')
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          this.careerOptions = response.data;
        }
      });
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
    // birthdate: ['', [Validators.required]],
    age: ['', [Validators.required]], // Se calcula automáticamente
    // id: ['', [Validators.required]], // Se habilita/deshabilita dinámicamente
    document: ['', [Validators.required]],
    document_number: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    code: ['', [Validators.required]],
    carreer: ['', [Validators.required]],
    semester: ['', [Validators.required]],
  });

  public directionForm: FormGroup = this.formBuild.group({
    neighborhood: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    aditional: [''],
  });

  public passwordForm: FormGroup = this.formBuild.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

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

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(age)
    return age;
  }

  async register() {
    try {
      if (this.passwordForm.invalid) return;
      this.loadingSrv.show();

      const object: User = {
        name: this.personalForm.value.name,
        auth: {
          email: this.emailForm.value.email,
          password: this.passwordForm.value.password,
        },
        last_name: this.personalForm.value.lastname,
        document: {
          id: this.personalForm.value.document,
        },
        document_number: this.personalForm.value.document_number,
        age: this.calculateAge(this.personalForm.value.age),
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
        detail: 'Registro realizado con exito',
        sumary: 'Exito',
      });
      this.loadingSrv.hide();
    } catch (error) {
      this.loadingSrv.hide();
      this.toastService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo guardar',
      });
    }
  }

  login() {
    this.router.navigate(['auth/login']);
  }
}
