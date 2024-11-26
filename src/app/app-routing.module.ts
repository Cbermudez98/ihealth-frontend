import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard-page/dashboard-page.component';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page.component';
import { AppointmentComponent } from './pages/dashboard/pages/coord-psycologist/appointment/appointment.component';
import { UserComponent } from './pages/dashboard/pages/coord-psycologist/user/user.component';
import { authGuard } from './shared/services/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardPageComponent,
    children: [
      {
        path: 'appointment',
        canActivate: [authGuard],
        component: AppointmentComponent,
      },
      {
        path: 'user',
        canActivate: [authGuard],
        component: UserComponent,
      }
    ],
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
