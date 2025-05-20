import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
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
        loadChildren: () =>
          import('./pages/home/dashboard-home.module').then(
            (m) => m.DashboardHomeModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./pages/menu/menu.module').then((m) => m.MenuModule),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import(
            './pages/coord-psycologist/appointment/appointment.module'
          ).then((m) => m.AppointmentModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/coord-psycologist/user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./pages/schedule/schedule.module').then(
            (m) => m.ScheduleModule
          ),
      },
      {
        path: 'dashboard/psycho',
        loadChildren: () =>
          import('./pages/coord-psycologist/psycho/psycho.module').then(
            (m) => m.CoordPsycologistModule
          ),
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
