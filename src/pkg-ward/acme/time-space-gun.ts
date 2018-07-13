import { IAppModuleConfig, AppModuleConfig, PackageRegistrySrv, AppModulePresentation } from '@app/core';
import { RouterModule, CanLoad } from '@angular/router';
import { Injectable, NgModuleRef, NgModule, Inject, Component } from '@angular/core';
import { of } from 'rxjs';
import { SharedMod } from '@app/shared';

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

@Component
({
  template: `
    <package-presentation>
      <ng-container ngProjectAs="description" i18n>
        Use the ACME Time-Space Gun to move any creature forwards or backwards in time. Just make sure not to have the silly thing in reverse.
      </ng-container>
    </package-presentation>
  `
})
export class ACMETimeSpaceGunPresentationCom {}

@NgModule
({
  declarations: [ ACMETimeSpaceGunPresentationCom ],
  entryComponents: [ ACMETimeSpaceGunPresentationCom ],
  imports:
  [
    SharedMod,
    RouterModule.forChild
    ([
      {
        path: '',
        canLoad: [ ACMETimeSpaceGunWard ],
        loadChildren: '../../pkg/acme-time-space-gun/app#ACMETimeSpaceGunMod',
      }
    ]),
  ],
  providers:
  [
    { provide: AppModuleConfig, useValue: TIME_SPACE_GUN_CONFIG },
    { provide: AppModulePresentation, useValue: ACMETimeSpaceGunPresentationCom },
    ACMETimeSpaceGunWard
  ]
})
export class ACMETimeSpaceGunWardMod
{
  static appName = 'ACME: Time-Space Gun';
  constructor( private reg: PackageRegistrySrv, private mod: NgModuleRef<ACMETimeSpaceGunWardMod> )
  {
    // this.reg.registerApp(this.mod);
  }
}
