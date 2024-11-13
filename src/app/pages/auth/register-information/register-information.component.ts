import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';


@Component({
  selector: 'app-register-information',
  templateUrl: './register-information.component.html',
  styleUrl: './register-information.component.scss'
})
export class RegisterInformationComponent {
  private Loginservice = inject(LoginService);//Crear servicio Register
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public registerUserFrom: FormGroup = this.formBuild.group({
    code: ['',[Validators.required]],
    gender: [''],
    neighborhood: [''],
    age:[0],
    street: [''],
    numberDirection: [''],
    aditionalInformation: ['']
  })

  

  onGenderSelected(gender: string) {
    this.registerUserFrom.patchValue({ gender });
  }

  onAgeCalculated(age: number) {
    this.registerUserFrom.patchValue({ age: age });
  }

}
