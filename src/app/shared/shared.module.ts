import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { AuthPageComponent } from '../pages/auth/auth-page/auth-page.component';

import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { InputCalenderComponent } from './components/input-calender/input-calender.component';

const COMPONENTS = [
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  InputComponent,
  ButtonComponent,
  CheckboxComponent,
  AuthPageComponent,
  InputPasswordComponent,
  InputCalenderComponent
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
  RouterModule,
  ToastModule,
  StepsModule,
  CalendarModule
];

const PROVIDERS = [MessageService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  exports: [...COMPONENTS],
  providers: [...PROVIDERS]
})
export class SharedModule {}