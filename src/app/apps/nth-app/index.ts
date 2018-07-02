import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule, MatIconModule } from '@angular/material';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { RegistrySrv, AppModuleConfig, IAppModuleConfig } from '../../core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const NTH_APP_MODULE_CONFIG: IAppModuleConfig =
{
  roles: of([]).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 1,
  order: 3,
  icon: 'contacts'
};

@NgModule
({
  declarations: [ MainCom, ],
  entryComponents: [ MainCom ],
  imports:
  [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ { provide: AppModuleConfig, useValue: NTH_APP_MODULE_CONFIG } ]
})
export class NthAppMod
{
  static routes = ROUTES;
  static appName = 'List App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<NthAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Nth App constructed');
  }
}
