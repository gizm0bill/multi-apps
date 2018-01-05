import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SubCom } from './sub.com';
import { SomeSrv, RegistrySrv, AppModuleConfig, IAppModuleConfig } from '../../core';
import { ThreeJsMod } from '../../three-js';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';

export const SECOND_APP_MODULE_ACCESS: IAppModuleConfig =
{
  roles: of(['user_role_2']).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 2,
  order: 1,
  icon: 'trending_up'
};

@NgModule({
  declarations: [ MainCom, SubCom ],
  imports:
  [
    CommonModule,
    MatChipsModule,
    ThreeJsMod,
    RouterModule.forChild(ROUTES),
  ],
  providers:
  [
    SomeSrv,
    { provide: AppModuleConfig, useValue: SECOND_APP_MODULE_ACCESS }
  ]
})
export class SecondAppMod
{
  static routes = ROUTES;
  static appName = 'Fish App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<SecondAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Second App constructed');
  }
}
