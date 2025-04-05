import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { LoginComponent } from '../pages/auth/login/login.component';
// import { RegisterComponent } from '../pages/auth/register/register.component';
// import { AuthPageComponent } from '../pages/auth/auth-page/auth-page.component';

import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { InputPasswordComponent } from './components/input-password/input-password.component';
import { InputCalenderComponent } from './components/input-calender/input-calender.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotificationComponent } from './components/notification/notification.component';

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
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { SidebarBtnComponent } from './components/sidebar-btn/sidebar-btn.component';
import { HttpService } from './services/HTTP/http.service';
import { EventsCalendarComponent } from './components/events-calendar/events-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentFormComponent } from './component/appointment-form/appointment-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoaderService } from './services/loader/loader.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastComponent } from './components/toast/toast.component';
import { jwtDecode } from 'jwt-decode';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { ConfirmDialogService } from './services/confirmation/confirmation.service';
import { ConfirmDialogModule,ConfirmDialog} from "primeng/confirmdialog";

const COMPONENTS = [
  // LoginComponent,
  // RegisterComponent,
  InputComponent,
  ButtonComponent,
  CheckboxComponent,
  // AuthPageComponent,
  InputPasswordComponent,
  InputCalenderComponent,
  DropDownComponent,
  SidebarComponent,
  SidebarBtnComponent,
  EventsCalendarComponent,
  NotificationComponent,
  AppointmentFormComponent,
  NotificationComponent,
  CalendarComponent,
  ToastComponent,
  DynamicTableComponent
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
  TableModule,
  ButtonModule,
  ConfirmDialogModule,
  FullCalendarModule,
  InputTextareaModule,
  PanelMenuModule,
  MultiSelectModule,
  ReactiveFormsModule,
  FormsModule,
];

const PIPES = [DatePipe];

const PROVIDERS = [MessageService, HttpService, LoaderService,ConfirmationService,ConfirmDialogService];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...IMPORTS, ...PIPES],
  exports: [...COMPONENTS, ...IMPORTS],
  providers: [...PROVIDERS],
})
export class SharedModule {}
