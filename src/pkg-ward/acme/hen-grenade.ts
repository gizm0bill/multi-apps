import { IAppModuleConfig, AppModuleConfig, PackageRegistrySrv, AppModulePresentation } from '@app/core';
import { RouterModule, CanLoad } from '@angular/router';
import { Injectable, NgModuleRef, NgModule, Inject, Component, ComponentFactoryResolver } from '@angular/core';
import { of } from 'rxjs';
import { SharedMod } from '@app/shared';

export const HEN_GRENADE_CONFIG: IAppModuleConfig =
{
  roles: of(['hen-grenade']),
};

@Injectable()
export class ACMEHenGrenadeWard implements CanLoad
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
        If you ever need to use an explosive in a chicken coop, the ACME Hen Grenade is your answer
      </ng-container>
    </package-presentation>
  `
})
export class ACMEHenGrenadePresentationCom {}

@NgModule
({
  declarations: [ ACMEHenGrenadePresentationCom ],
  entryComponents: [ ACMEHenGrenadePresentationCom ],
  imports:
  [
    SharedMod,
    RouterModule.forChild
    ([
      { path: '', loadChildren: '../../pkg/acme-hen-grenade/app#ACMEHenGrenadeMod', canLoad: [ ACMEHenGrenadeWard ] }
    ]),
  ],
  providers:
  [
    { provide: AppModuleConfig, useValue: HEN_GRENADE_CONFIG },
    { provide: AppModulePresentation, useValue: ACMEHenGrenadePresentationCom },
    ACMEHenGrenadeWard
  ]
})
export class ACMEHenGrenadeWardMod
{
  static appName = 'ACME: Hen Grenade';
  constructor
  (
    private reg: PackageRegistrySrv,
    private mod: NgModuleRef<ACMEHenGrenadeWardMod>,
  )
  {
    this.reg.registerApp(this.mod);
  }
}
