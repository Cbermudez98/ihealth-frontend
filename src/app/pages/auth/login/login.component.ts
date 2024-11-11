import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { Login } from '../../../shared/interfaces/Login';
import { ToastService } from '../../../services/Toast/toast.service';

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
    email: ['mrawadyecid@gmail.com', [Validators.required, Validators.email]],
    password: ['Rawadmunoz2004', [Validators.required]],
  });

  constructor(private toastService: ToastService) {}

  showError() {
    this.toastService.show('InternalError');
  }

  login() {
    if (this.loginForm.invalid) return;

    const object: Login = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.Loginservice.login(object).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem('access_token', data.data.access_token);
          this.router.navigate(['dashboard']);
        } else {
          alert('Las Credenciales Son Incorrectas');
        }
      },
      error: (err) => {
        this.showError();
        console.error('Hubo un error:', err.message);
      },
    });
  }

  register() {
    this.router.navigate(['auth/register']);
  }
}
