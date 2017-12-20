import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SomeSrv, RegistrySrv, AppModuleAccess, IAppModuleConfig } from '../../core';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';

export const SECOND_APP_MODULE_ACCESS: IAppModuleConfig =
{
  roles: of(['user_role_2']).pipe( delay( Math.random() * 10000 / 3) ),
  weight: 2,
  icon: 'trending_up'
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
