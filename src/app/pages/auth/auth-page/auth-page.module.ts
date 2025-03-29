import { AuthPageComponent } from './auth-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [AuthPageComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    SharedModule
  ]
})
export class AuthPageModule { }
