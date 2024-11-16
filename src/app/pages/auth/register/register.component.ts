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

  public registerForm: FormGroup = this.formBuild.group({
    name: ['Rawad Yecith', [Validators.required]],
    lastname: ['Muñoz Romero', [Validators.required]],
    age: ['11/12/2004', [Validators.required]],
    gender: ['M', [Validators.required]],
    code: ['123456789', [Validators.required]],
    neighborhood: ['El pozon', [Validators.required]],
    street: ['39B', [Validators.required]],
    number: ['#29-198', [Validators.required]],
    aditional: ['El pozon cll 39B #29-198 apto 504', [Validators.required]],

    email: ['mrawadyecid@gmail.com', [Validators.required, Validators.email]],
    password: ['Rawadmunoz2004', [Validators.required]],
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
    if (this.registerForm.invalid) return;
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
    if (this.registerForm.invalid) return;

    const object: User = {
      name: this.registerForm.value.name,
      auth: {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      },
      last_name: this.registerForm.value.lastname,
      age: this.registerForm.value.age,
      code: this.registerForm.value.code,
      gender: this.registerForm.value.gender,
      direction: {
        neighborhood: this.registerForm.value.neighborhood,
        street: this.registerForm.value.street,
        number: this.registerForm.value.number,
        aditional_information: this.registerForm.value.aditional,
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
