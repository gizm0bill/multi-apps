import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { RegistrySrv, AppModuleConfig, IAppModuleConfig } from '../../core';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';

export const THIRD_APP_MODULE_CONFIG: IAppModuleConfig =
{
  roles: of(['user_role_1', 'user_role_2']).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 3,
  order: 2,
  icon: 'list'
};

@NgModule({
  declarations: [ MainCom, ],
  imports:
  [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ { provide: AppModuleConfig, useValue: THIRD_APP_MODULE_CONFIG } ]
})
export class ThirdAppMod
{
  static routes = ROUTES;
  static appName = 'Pirate App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<ThirdAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Third App constructed');
  }
}
