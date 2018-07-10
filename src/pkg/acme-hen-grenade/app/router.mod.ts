import { MainCom } from './main.com';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const ROUTES: Routes =
[
  {
    path: '',
    children:
    [
      { path: '', component: MainCom },
    ]
  },
];

@NgModule
({
  imports: [ RouterModule.forChild(ROUTES) ],
  exports: [ RouterModule ]
})
export class ACMEHenGrenadeRouterMod {}
