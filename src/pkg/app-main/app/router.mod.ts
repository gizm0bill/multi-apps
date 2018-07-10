import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core';
import { DashboardCom } from './dashboard';
import { AuthCom } from './auth';

export const ROUTES: Routes =
[
  {
    path: 'home',
    component: DashboardCom,
    canActivate: [ AuthGuard ],
    data: { redirectTo: ['auth'] }
  },
  {
    path: 'authentication',
    component: AuthCom
  }
];

@NgModule
({
  imports: [ RouterModule.forChild(ROUTES) ],
  exports: [ RouterModule ]
})
export class AppMainRouterMod {}
