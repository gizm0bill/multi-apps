import
{
  NgModule,
  // COMPILER_OPTIONS,
  // Compiler,
  // CompilerFactory
} from '@angular/core';
// import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { CoreMod } from '@app/core';

import { AppMainRouterMod } from './router.mod';
import { AppStateSrv, InternalStateType } from './state.srv';
import { AppMainCom } from './com';
import { NotFoundCom } from './404.com';

import 'styles/styles.scss';

// Application wide providers
const APP_PROVIDERS =
[
  AppStateSrv,
];

interface StoreType
{
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstrapping process
 */
@NgModule
({
  bootstrap: [ AppMainCom ],
  declarations:
  [
    AppMainCom,
    NotFoundCom,
  ],
  /**
   * Import Angular's modules.
   */
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    CoreMod.forRoot(),
    AppMainRouterMod,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers:
  [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})
export class AppMod {}

export { ROOT_SELECTOR } from './com';
