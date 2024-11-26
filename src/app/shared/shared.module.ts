import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from '../pages/dashboard/dashboard-page/dashboard-page.component';
import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { AuthPageComponent } from '../pages/auth/auth-page/auth-page.component';


import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputCalenderComponent } from './components/input-calender/input-calender.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SidebarBtnComponent } from './components/sidebar-btn/sidebar-btn.component';
import { HttpService } from './services/HTTP/http.service';


const COMPONENTS = [
  DashboardPageComponent,
  LoginComponent,
  RegisterComponent,
  InputComponent,
  ButtonComponent,
  CheckboxComponent,
  AuthPageComponent,
  InputPasswordComponent,
  InputCalenderComponent,
  DropDownComponent,
  SidebarComponent,
  SidebarBtnComponent,
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
  RouterModule,
  ToastModule,
  StepsModule,
  CalendarModule,
  CascadeSelectModule,
  DropdownModule,
];

const PROVIDERS = [MessageService, HttpService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS],
  exports: [...COMPONENTS],
  providers: [...PROVIDERS],
})
export class SharedModule {}
