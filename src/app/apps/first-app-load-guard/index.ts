// tslint:disable:max-line-length
/**
 * TODO: https://github.com/webpack/webpack/blob/master/lib/NormalModuleReplacementPlugin.js
 * TODO: https://github.com/angular/angular-cli/blob/master/packages/%40ngtools/webpack/src/angular_compiler_plugin.ts#L530
 */

import { NgModule, NgModuleRef, Injectable, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule, CanLoad } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { delay, map, switchMap } from 'rxjs/operators';
import { RegistrySrv, AuthoritySrv, AppModuleConfig, IAppModuleConfig } from '../../core';

export const FIRST_APP_MODULE_CONFIG: IAppModuleConfig =
{
  // simulate latency
  roles: of(['user_role_1']).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 2,
  order: 0,
  icon: 'extension'
};

@Injectable()
export class TestGuard implements CanLoad
{
  constructor
  (
    private auth: AuthoritySrv,
    @Inject(AppModuleConfig) private moduleConfig: IAppModuleConfig
  ) {}

  canLoad()
  {
    return this.moduleConfig.roles
      .pipe( switchMap( authorities => this.auth.hasRole( authorities ) ) );
  }
}

@NgModule
({
  imports:
  [
    RouterModule.forChild
    (
      [{
        path: '',
        loadChildren: '../first-app#FirstAppMod',
        canLoad: [ TestGuard ]
      }]
    ),
  ],
  providers: [ { provide: AppModuleConfig, useValue: FIRST_APP_MODULE_CONFIG }, TestGuard ]
})
export class FirstAppLoadGuardMod
{
  static appName = 'Table App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<FirstAppLoadGuardMod> )
  {
    this.reg.registerApp(this.mod);
  }
}
