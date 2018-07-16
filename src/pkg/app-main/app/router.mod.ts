import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from '@app/core';
import { DashboardCom } from './dashboard';
import { AuthCom } from './auth';
import { NotFoundCom } from './404.com';
import { environment } from 'environments/environment';

export const ROUTES: Routes =
[
  {
    path: '',
    component: DashboardCom,
    canActivate: [ AuthGuard ],
    data: { redirectTo: ['authentication'] }
  },
  {
    path: '',
    canActivate: [ AuthGuard ],
    data: { appsPlaceholder: true },
    children: environment.appRoutes
  },
  {
    path: 'authentication',
    component: AuthCom
  },
  { path: '**', component: NotFoundCom },
];

@NgModule
({
  imports:
  [
    RouterModule.forRoot( ROUTES,
    {
      enableTracing: (!environment.production ? true : false),
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [ RouterModule ]
})
export class AppMainRouterMod {}
