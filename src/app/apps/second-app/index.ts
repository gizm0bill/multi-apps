import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SomeSrv, RegistrySrv, AppModuleAccess, IAppModuleAccess } from '../../core';

export const SECOND_APP_MODULE_ACCESS: IAppModuleAccess =
{
  roles: ['user_role_2']
};

@NgModule({
  declarations: [ MainCom, ],
  imports:
  [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  providers:
  [
    SomeSrv,
    { provide: AppModuleAccess, useValue: SECOND_APP_MODULE_ACCESS }
  ]
})
export class SecondAppMod
{
  static routes = ROUTES;
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<SecondAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Second App constructed');
  }
}
