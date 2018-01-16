import { NgModule, Optional, SkipSelf, ModuleWithProviders, InjectionToken, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard, AuthGuard } from './auth.grd';
import { AuthenticationSrv, AuthoritySrv } from './auth.srv';
import { RegistrySrv } from './registry.srv';
import { SomeSrv } from './some.srv';
import { Observable } from 'rxjs/Observable';
// exports
import { MenuSrv } from './menu.srv';
export { RegistrySrv } from './registry.srv';
export { SomeSrv } from './some.srv';
export { AppAuthGuard, AuthGuard } from './auth.grd';
export { AuthenticationSrv, AuthoritySrv } from './auth.srv';

@NgModule
({
  imports: [ CommonModule ],
  providers:
  [
    AuthenticationSrv,
    AuthoritySrv,
    RegistrySrv,
    SomeSrv,
    MenuSrv
  ]
})
export class CoreMod
{
  static forRoot(): ModuleWithProviders
  {
    return { ngModule: CoreMod, providers: [ ] };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreMod )
  {
    if (parentModule)
      throw new Error( 'CoreModule is already loaded. Import it in the AppModule only' );
  }
}
// Individual app config guideline
export interface IAppModuleConfig
{
  roles: Observable<string[]>;
  // usually added my main app router
  link?: string;
  // custom example props
  weight?: number;
  order?: number;
  icon?: string;
}
export let AppModuleConfig = new InjectionToken<IAppModuleConfig>('app.module.access');
