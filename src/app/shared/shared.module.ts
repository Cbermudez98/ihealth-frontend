import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { AuthPageComponent } from '../pages/auth/auth-page/auth-page.component';
import { RegisterInformationComponent } from '../pages/auth/register-information/register-information.component';

import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';



const COMPONENTS = [
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  InputComponent,
  ButtonComponent,
  CheckboxComponent,
  AuthPageComponent,
  RegisterInformationComponent
];
const IMPORTS = [
  CommonModule,
  FloatLabelModule,
  InputTextModule,
  ButtonModule,
  CheckboxModule,
  IconFieldModule,
  InputIconModule,
  PasswordModule,
  FormsModule, 
  ReactiveFormsModule,
  DialogModule,
  SidebarModule,
  RouterModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  exports: [...COMPONENTS],
})
export class SharedModule {}
