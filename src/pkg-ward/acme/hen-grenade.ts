import { IAppModuleConfig, AppModuleConfig, PackageRegistrySrv } from '@app/core';
import { RouterModule, CanLoad } from '@angular/router';
import { Injectable, NgModuleRef, NgModule, Inject } from '@angular/core';
import { of } from 'rxjs';

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

@NgModule
({
  imports:
  [
    RouterModule.forChild
    ([
      { path: '', loadChildren: '../../pkg/acme-hen-grenade#ACMEHenGrenadeMod', canLoad: [ ACMEHenGrenadeWard ] }
    ]),
  ],
  providers: [ { provide: AppModuleConfig, useValue: HEN_GRENADE_CONFIG }, ACMEHenGrenadeWard ]
})
export class ACMEHenGrenadeWardMod
{
  static appName = 'ACME: Hen Grenade';
  constructor( private reg: PackageRegistrySrv, private mod: NgModuleRef<ACMEHenGrenadeWardMod> )
  {
    this.reg.registerApp(this.mod);
  }
}
