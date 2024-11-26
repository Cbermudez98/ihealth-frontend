import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';
import { ToastService } from '../../../shared/services/Toast/toast.service';
import { MenuItem } from 'primeng/api';
import { idText } from 'typescript';

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
    { name: 'Mujer', code: 'M' },
  ];

  carreerOptions = [
    { name: 'Licenciatura En Bilinguismo', id: '1' },
    { name: 'Contaduria Publica', id: '2' },
    { name: 'Administracion De Empresas', id: '3' },
    { name: 'Derecho', id: '4' },
    { name: 'Ingenieria Industrial', id: '5' },
    { name: 'Ingenieria De Sistemas', id: '6' },
    { name: 'Administracion De Empresas Turisticas y Hoteleras', id: '7' },
    { name: 'Tecnologia En Desarrollo De Sistemas De Informacion', id: '8' },
    { name: 'Tecnologia En Sistemas De Gestion De Calidad', id: '9' },
    {
      name: 'Tecnologia En Gestion De Servicios Turisticos y Hoteleros',
      id: '10',
    },
  ];

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
          id:this.personalForm.value.carreer,
        },
        semester: this.personalForm.value.semester,
      },
      role: {
        id: 1,
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