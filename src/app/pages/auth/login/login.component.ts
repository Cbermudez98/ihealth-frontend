import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/auth/login.service';
import { Login } from '../../../shared/interfaces/Login';
import { ToastService } from '../../../shared/services/Toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private Loginservice = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public loginForm: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  

  constructor(private toastService: ToastService) {}


  
  async login() {
    try {
      if (this.loginForm.invalid) return;

      const object: Login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      const data =  await this.Loginservice.login(object);
      this.router.navigate(['dashboard']);
    } catch (error) {
      this.toastService.show({
        severity: "error",
        detail: "Error at login",
        sumary: "Error at credential"
      })
    }
  }

  register() {
    this.router.navigate(['auth/register']);
  }

  getErrorMessage(controlName: string): string {
    const control: AbstractControl | null = this.loginForm.get(controlName);
    if (control && control.hasError('required')) {
      return 'This field is required';
    } else if (control && control.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }

}
