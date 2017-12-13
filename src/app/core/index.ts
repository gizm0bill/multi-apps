import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { SomeSrv } from './some.srv';
export { SomeSrv } from './some.srv';

@NgModule
({
  imports: [ CommonModule ],
  providers: [ SomeSrv ]
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

  constructor (@Optional() @SkipSelf() parentModule: CoreMod)
  {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
