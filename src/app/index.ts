import
{
  NgModule,
  // COMPILER_OPTIONS,
  // Compiler,
  // CompilerFactory
} from '@angular/core';
// import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Router, RouteConfigLoadEnd, RouterEvent, provideRoutes } from '@angular/router';
import { MatIconModule, MatToolbarModule, MatButtonModule } from '@angular/material';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { INIT_ROUTES } from './app.routes';
// App is our top level component
import { AppCom } from './app.com';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.state';
import { NotFoundCom } from './404.com';
import { CoreMod } from './core';
import { MainMod } from './main';
import { ThreeJsMod } from './three-js';
import '../styles/styles.scss';

// export function createCompiler(f: CompilerFactory) {
//   return f.createCompiler();
// }

// Application wide providers
const APP_PROVIDERS =
[
  ...APP_RESOLVER_PROVIDERS,
  AppState,
];

interface StoreType
{
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

import { DynamicCom } from './dynamic.com';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule
({
  bootstrap: [ AppCom ],
  declarations:
  [
    AppCom,
    NotFoundCom,
    DynamicCom,
  ],
  /**
   * Import Angular's modules.
   */
  imports:
  [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CoreMod.forRoot(),
    MainMod,
    ThreeJsMod,
    RouterModule.forRoot(INIT_ROUTES,
    {
      // enableTracing: environment... : true ? false,
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers:
  [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    // normal loadChildren routes not working with these overrides
    // {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    // {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    // {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ]
})
export class AppMod {}
