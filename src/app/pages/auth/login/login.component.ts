import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loginForm = this.formBuilder.group({
    email: ['mrawadyecid@gmail.com', [Validators.required, Validators.email]],
    Password: ['root', [Validators.required]],
  });
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.Password;
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Login Complete');
      this.router.navigateByUrl('/dashboard');
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
      alert('Hubo un error en la digitacion');
    }
  }
}
