import { IAppModuleConfig, AppModuleConfig } from '@app/core';
import { RouterModule, CanLoad } from '@angular/router';
import { Injectable, NgModuleRef, NgModule, Inject } from '@angular/core';
import { of } from 'rxjs';

export const TIME_SPACE_GUN_CONFIG: IAppModuleConfig =
{
  roles: of(['time-space-gun']),
};

@Injectable()
export class ACMETimeSpaceGunWard implements CanLoad
{
  constructor
  (
    @Inject(AppModuleConfig) private moduleConfig: IAppModuleConfig
  ) {}

  canLoad()
  {
    return true;
  }
}

@NgModule
({
  imports:
  [
    RouterModule.forChild
    ([
      { path: '', loadChildren: '../../pkg/acme-time-space-gun/app#ACMETimeSpaceGunMod', canLoad: [ ACMETimeSpaceGunWard ] }
    ]),
  ],
  providers: [ { provide: AppModuleConfig, useValue: TIME_SPACE_GUN_CONFIG }, ACMETimeSpaceGunWard ]
})
export class ACMETimeSpaceGunWardMod
{
  static appName = 'ACME: Time-Space Gun';
  constructor( private mod: NgModuleRef<ACMETimeSpaceGunWardMod> )
  {
  }
}
