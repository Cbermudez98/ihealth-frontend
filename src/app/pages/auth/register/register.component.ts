import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';
import { ToastService } from '../../../services/Toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private Loginservice = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public registerForm: FormGroup = this.formBuild.group({
    name: ['Rawad', [Validators.required]],
    email: ['mrawadyecid@gmail.com', [Validators.required, Validators.email]],
    password: ['Rawadmunoz2004', [Validators.required]],
  });
  constructor(private toastService: ToastService) {}

  showError() {
    this.toastService.show('InternalError');
  }
  

  register() {
    if (this.registerForm.invalid) return;

    const object: User = {
      name: this.registerForm.value.name,
      auth: {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      },
      last_name: '',
      age: 0,
      code: 0,
      gender: '',
      direction: {
        neighborhood: '',
        street: '',
        number: '',
        aditional_information: '',
      },
      student_detail: {
        carreer_id: 0,
        semester: 0,
      },
    };

    this.Loginservice.register(object).subscribe({
      next: (data) => {
        if (data.status) {
          console.log(object);
          this.router.navigate(['auth/register-information']);
        } else {
        }
      },
      error: (err) => {
        this.showError();
        console.error('Hubo un error:', err.message);
      },
    });
  }
}
