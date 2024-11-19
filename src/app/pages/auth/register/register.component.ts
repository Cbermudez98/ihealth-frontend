import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';
import { ToastService } from '../../../shared/services/Toast/toast.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;
  private Loginservice = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  //Options of gender dropDown
  genderOptions = [
    { name: 'Hombre', code: 'H' },
    { name: 'Mujer', code: 'M' }
  ];

  public emailForm: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
  })

  public personalForm: FormGroup = this.formBuild.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    code: ['', [Validators.required]]
  })

  public directionForm: FormGroup = this.formBuild.group({
    neighborhood: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    aditional: ['', [Validators.required]],
  })
  
  public passwordForm: FormGroup = this.formBuild.group({
    password: ['', [Validators.required]],
  })

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Email' },
      { label: 'Personal' },
      { label: 'Direction' },
      { label: 'Password' },
    ];
  }

  next() {
    const forms = [this.emailForm, this.personalForm, this.directionForm, this.passwordForm];

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
      age: this.personalForm.value.age,
      code: this.personalForm.value.code,
      gender: this.personalForm.value.gender,
      direction: {
        neighborhood: this.directionForm.value.neighborhood,
        street: this.directionForm.value.street,
        number: this.directionForm.value.number,
        aditional_information: this.directionForm.value.aditional,
      },
      student_detail: {
        carreer: {
          id: 1,
        },
        semester: 5,
      },
    };

    const data = await this.Loginservice.register(object);
    if (data.status) {
      console.log(object);
      this.router.navigate(['auth/login']);
      this.toastService.show({
        severity: 'success',
        detail: 'Success at login',
        sumary: '',
      });
    } else {
      console.log('Error');
    }
  }

  login() {
    this.router.navigate(['auth/login']);
  }
}
