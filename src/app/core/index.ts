import { NgModule, Optional, SkipSelf, ModuleWithProviders, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthGuard, AuthGuard } from './auth.grd';
import { AuthenticationSrv, AuthoritySrv } from './auth.srv';

export { AppAuthGuard, AuthGuard } from './auth.grd';
export { AuthenticationSrv, AuthoritySrv } from './auth.srv';

@NgModule
({
  imports: [ CommonModule ],
  providers: [ AppAuthGuard, AuthGuard, AuthenticationSrv, AuthoritySrv ]
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
