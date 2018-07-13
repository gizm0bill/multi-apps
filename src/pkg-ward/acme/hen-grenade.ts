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
    <div class="package-presentation" title="ACME Hen Grenade" image="/assets/@acme/hen-grenade/logo.jpg">
      <ng-container ngProjectAs="description" i18n>
        If you ever need to use an explosive in a chicken coop, the ACME Hen Grenade is your answer
      </ng-container>
    </div>
  `,
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
      {
        path: '',
        canLoad: [ ACMEHenGrenadeWard ],
        loadChildren: '../../pkg/acme-hen-grenade/app#ACMEHenGrenadeMod',
      }
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
