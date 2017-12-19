import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.state';
import { AuthenticationSrv } from './core/auth.srv';
import { Observable } from 'rxjs/Observable';
/**
 * App Component
 * Top Level Component
 */
@Component
({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.com.scss' ],
  templateUrl: './app.com.pug'
})
export class AppCom implements OnInit {

  loggedIn: Observable<any>;
  constructor
  (
    public appState: AppState,
    public authSrv: AuthenticationSrv,
  ) {}

  ngOnInit()
  {
    this.loggedIn = this.authSrv.account;
    console.log('Initial App State', this.appState.state);
  }

  // lazyLoadModuleCallback = () => new Promise( resolve =>
  // {
  //   require.ensure( [], require =>
  //   {
  //     resolve( require('./apps/nth-app/index') );
  //   }, 'nth-app' );
  // })
}
