import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { AppointmentComponent } from './appointment.component';


@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule
  ]
})
export class AppointmentModule { }
