import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard/pages/home/dashboard-home.component';
import { AppointmentComponent } from './pages/dashboard/pages/coord-psycologist/appointment/appointment.component';
import { UserComponent } from './pages/dashboard/pages/coord-psycologist/user/user.component';
import { authGuard } from './shared/services/guards/auth.guard';
import { ScheduleComponent } from './pages/dashboard/pages/schedule/schedule.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';
import { MenuComponent } from './pages/dashboard/pages/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-page/auth-page.module').then(
        (m) => m.AuthPageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [authGuard],
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
