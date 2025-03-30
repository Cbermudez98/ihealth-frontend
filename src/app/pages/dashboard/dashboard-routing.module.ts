import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { AppointmentComponent } from './pages/coord-psycologist/appointment/appointment.component';
import { UserComponent } from './pages/coord-psycologist/user/user.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardHomeComponent } from './pages/home/dashboard-home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'home',
        component: DashboardHomeComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'appointment',
        component: AppointmentComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
