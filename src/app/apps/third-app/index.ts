import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { RegistrySrv, AppModuleAccess, IAppModuleAccess } from '../../core';

export const THIRD_APP_MODULE_ACCESS: IAppModuleAccess =
{
  roles: ['user_role_1', 'user_role_2']
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
    { provide: AppModuleAccess, useValue: THIRD_APP_MODULE_ACCESS }
  ]
})
export class ThirdAppMod
{
  static routes = ROUTES;
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<ThirdAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Third App constructed');
  }
}
