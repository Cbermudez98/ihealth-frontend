import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardHomeRoutingModule } from './dashboard-home-routing.module';
import { DashboardHomeComponent } from './dashboard-home.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [CommonModule, DashboardHomeRoutingModule, SharedModule],
})
export class DashboardHomeModule {}
