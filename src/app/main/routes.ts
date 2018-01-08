import { Routes } from '@angular/router';
import { DashboardCom } from './dashboard';
import { AuthCom } from './auth';
import { AuthGuard } from '../core/auth.grd';

export const ROUTES: Routes =
[
  {
    path: 'dashboard',
    component: DashboardCom,
    canActivate: [ AuthGuard ],
    data: { redirectTo: ['auth'] }
  },
  {
    path: 'auth',
    component: AuthCom
  }
];
