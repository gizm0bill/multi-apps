import { Routes } from '@angular/router';
import { NotFoundCom } from './404.com';
import { AuthGuard, AppAuthGuard } from './core';
import { environment } from 'environments/environment';

export const INIT_ROUTES: Routes =
[
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    data: { appsPlaceholder: true },
    children: environment.appRoutes
  },
  { path: '**',    component: NotFoundCom },
];
