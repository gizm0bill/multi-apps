import { NgModule, NgModuleRef } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SomeSrv, RegistrySrv, AppModuleConfig, IAppModuleConfig } from '../../core';
import { SharedMod } from '../../shared';

export const FIRST_APP_MODULE_CONFIG: IAppModuleConfig =
{
  // simulate latency
  roles: of(['user_role_1']).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 2,
  order: 0,
  icon: 'extension'
};
@NgModule
({
  declarations: [ MainCom, ],
  entryComponents: [ MainCom ],
  imports:
  [
    SharedMod,
    MatTableModule,
    RouterModule.forChild(ROUTES),
  ],
  providers:
  [
    SomeSrv,
    { provide: AppModuleConfig, useValue: FIRST_APP_MODULE_CONFIG }
  ]
})
export class FirstAppMod
{
  static routes = ROUTES;
  static appName = 'Table App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<FirstAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('First App constructed');
  }
}
