import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';

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
    name: ['Rawad',[Validators.required]],
    email: ['mrawadyecid@gmail.com', [Validators.required, Validators.email]],
    password: ['Rawadmunoz2004', [Validators.required]],
  });

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
      next:(data) => {
        if (data.status) {
          alert('Registro Exitoso, Digita Tu Informacion');
          console.log(object)
          console.log("Response"+data)
          this.router.navigate(['auth/register-information']);
      
        }
      else{
        alert("Las Credenciales Son Incorrectas")
      }
      },
      error(err){
        alert('Hubo Un Error' + err.message);
        console.log('Hubo Un Error' + err.message);
      }
    });
  }
}
