import { NgModule, Optional, SkipSelf, ModuleWithProviders, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard, AuthGuard } from './auth.grd';
import { AuthenticationSrv, AuthoritySrv } from './auth.srv';
import { RegistrySrv } from './registry.srv';

export { RegistrySrv } from './registry.srv';
export { SomeSrv } from './some.srv';
export { AppAuthGuard, AuthGuard } from './auth.grd';
export { AuthenticationSrv, AuthoritySrv } from './auth.srv';

@NgModule
({
  imports: [ CommonModule ],
  providers: [ AppAuthGuard, AuthGuard, AuthenticationSrv, AuthoritySrv, RegistrySrv ]
})
export class CoreMod
{
  static forRoot(): ModuleWithProviders
  {
    return {
      ngModule: CoreMod,
      providers: [
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreMod )
  {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}

import { InjectionToken } from '@angular/core';
export interface IAppModuleAccess
{
  roles: string[];
}
export let AppModuleAccess = new InjectionToken<IAppModuleAccess>('app.module.access');
