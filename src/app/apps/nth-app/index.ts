import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { RegistrySrv, AppModuleAccess, IAppModuleAccess } from '../../core';

export const NTH_APP_MODULE_ACCESS: IAppModuleAccess =
{
  roles: []
};

@NgModule
({
  declarations: [ MainCom, ],
  entryComponents: [ MainCom ],
  imports:
  [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  providers:
  [
    { provide: AppModuleAccess, useValue: NTH_APP_MODULE_ACCESS }
  ]
})
export class NthAppMod
{
  static routes = ROUTES;
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<NthAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Nth App constructed');
  }
}
