import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs';
import { PackageRegistrySrv } from './package-registry.srv';

// Individual app config guideline
export interface IAppModuleConfig
{
  roles: Observable<string[]>;
  // user could have ANY of these roles
  anyRole?: Observable<string[]>;
  // usually added my main app router
  link?: string;
}
export let AppModuleConfig = new InjectionToken<IAppModuleConfig>('app.pkg.cfg');

export * from './package-registry.srv';
export * from './auth.grd';
export * from './auth.srv';

@NgModule
({
  providers:
  [
    PackageRegistrySrv,
  ]
})
export class CoreMod
{
  static forRoot(): ModuleWithProviders { return { ngModule: CoreMod, providers: [ ] }; }

  constructor( @Optional() @SkipSelf() parentModule: CoreMod )
  {
    if (parentModule) throw new Error( 'CoreMod is already loaded. Import it in the AppModule only' );
  }
}
