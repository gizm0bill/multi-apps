// tslint:disable:max-line-length
import { NgModule, NgModuleRef, Injectable, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule, CanLoad, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
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
export class FirstAppLoadGuard implements CanLoad
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
    RouterModule.forChild( [ { path: '', loadChildren: '../first-app#FirstAppMod', canLoad: [ FirstAppLoadGuard ] } ] ),
  ],
  providers: [ { provide: AppModuleConfig, useValue: FIRST_APP_MODULE_CONFIG }, FirstAppLoadGuard ]
})
export class FirstAppLoadGuardMod
{
  static appName = 'Table App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<FirstAppLoadGuardMod> )
  {
    this.reg.registerApp(this.mod);
  }
}
