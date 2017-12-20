import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SomeSrv, RegistrySrv, AppModuleAccess, IAppModuleConfig } from '../../core';

export const FIRST_APP_MODULE_ACCESS: IAppModuleConfig =
{
  roles: of(['user_role_1']).pipe( delay( Math.random() * 10000 / 3) ),
  weight: 2,
  icon: 'extension'
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
    SomeSrv,
    { provide: AppModuleAccess, useValue: FIRST_APP_MODULE_ACCESS }
  ]
})
export class FirstAppMod
{
  static routes = ROUTES;
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<FirstAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('First App constructed');
  }
}
