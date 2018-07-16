/* tslint:disable */
import { enableProdMode, NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';
import { AppAuthGuard } from '../app/core/auth.grd';

enableProdMode();

export const environment: Environment =
{
  production: true,
  showDevModule: false,

  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {any}
   */
  decorateModuleRef(modRef: NgModuleRef<any>)
  {
    disableDebugTools();
    return modRef;
  },
  ENV_PROVIDERS: [ ],
  appRoutes:
  [{
    path: 'prod-ready-time-space-gun',
    // relative to baseUrl from tsconfig
    // use full file path
    loadChildren: 'pkg-ward/acme/time-space-gun#ACMETimeSpaceGunWardMod',
    canActivate: [ AppAuthGuard ],
  },
  {
    path: 'hen-grenade',
    loadChildren: 'pkg-ward/acme/hen-grenade#ACMEHenGrenadeWardMod',
    canActivate: [ AppAuthGuard ],
  },
  { // no authentication guard
    path: 'dehydrated-boulders',
    loadChildren: '../../acme-dehydrated-boulders/app#ACMEDehydratedBouldersMod',
  }]
};
