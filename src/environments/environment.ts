/* tslint:disable */

import { ApplicationRef, NgModuleRef } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';
import { AppAuthGuard } from '@app/core';

Error.stackTraceLimit = Infinity;
require('zone.js/dist/long-stack-trace-zone');

export const environment: Environment = 
{
  production: false,

  showDevModule: true,

  /** 
   * Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   */
  decorateModuleRef(modRef: NgModuleRef<any>)
  {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  },
  ENV_PROVIDERS: [],
  appRoutes:
  [{
    path: 'time-space-gun',
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
