import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { PackageRegistrySrv } from './package-registry.srv';
import { AuthenticationSrv } from './auth.srv';
import { AuthGuard, AppAuthGuard } from './auth.grd';

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

export interface IAppModulePresentation extends Type<any> {}
export let AppModulePresentation = new InjectionToken<IAppModulePresentation>('app.pkg.presentation');

export * from './package-registry.srv';
export * from './auth.grd';
export * from './auth.srv';

@NgModule
({
  providers:
  [
    PackageRegistrySrv,
    AuthenticationSrv,
    AuthGuard,
    AppAuthGuard,
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
