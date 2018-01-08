import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundCom } from './404.com';

// import directly from its path because NgModule/barels mess
import { AuthGuard } from './core/auth.grd';
import { environment } from 'environments/environment';

export const INIT_ROUTES: Routes =
[
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [ AuthGuard ],
    data: { appsPlaceholder: true },
    children: environment.appRoutes
  },
  { path: '**', component: NotFoundCom },
];

@NgModule
({
  imports:
  [
    RouterModule.forRoot(INIT_ROUTES, {
      // enableTracing: environment... : true ? false,
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [ RouterModule ],
})
export class RoutingMod {}

