import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouteConfigLoadEnd, RouterEvent } from '@angular/router';
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

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppCom ],
  declarations: [
    AppCom,
    NotFoundCom,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CoreMod.forRoot(),
    MainMod,
    RouterModule.forRoot(INIT_ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppMod {

  constructor( private router: Router ) {
    router.events.subscribe( ( event: RouterEvent ) =>
    {
    //   if ( !( event instanceof RouteConfigLoadEnd ) ) return;
      console.log( event );
    //   this.router.config.splice( this.router.config.findIndex( route => event.route.path === route.path ), 1 );
    //   console.dir( this.router.config );
    //   this.router.resetConfig([...this.router.config]);
    });
  }
}
