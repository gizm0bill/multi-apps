import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatToolbarModule, MatGridListModule, MatCardModule } from '@angular/material';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { CoreMod } from '@app/core';
import { SharedMod } from '@app/shared';
import { AppMainRouterMod } from './router.mod';
import { AppStateSrv, InternalStateType } from './state.srv';
import { AppMainCom } from './com';
import { NotFoundCom } from './404.com';
import { DashboardCom } from './dashboard';
import { AuthCom } from './auth';

import 'styles/styles.scss';
import { PackagePresentationCom } from './dashboard/package-presentation.com';


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
    DashboardCom,
    AuthCom,
    PackagePresentationCom,
  ],
  /**
   * Import Angular's modules.
   */
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    CoreMod.forRoot(),
    SharedMod,
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
