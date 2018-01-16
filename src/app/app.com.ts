import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AppState } from './app.state';
import { AuthenticationSrv } from './core/auth.srv';
import { Observable } from 'rxjs/Observable';
import { MenuSrv } from './core/menu.srv';
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
export class AppCom implements OnInit
{
  loggedIn: Observable<any>;
  constructor
  (
    public appState: AppState,
    private authSrv: AuthenticationSrv,
    private router: Router,
    public menu: MenuSrv
  ) {}

  ngOnInit()
  {
    this.loggedIn = this.authSrv.account;
    console.log('Initial App State', this.appState.state);
  }

  logout()
  {
    this.authSrv.logout();
    this.router.navigate(['/auth']);
  }

  // lazyLoadModuleCallback = () => new Promise( resolve =>
  // {
  //   require.ensure( [], require =>
  //   {
  //     resolve( require('./apps/nth-app/index') );
  //   }, 'nth-app' );
  // })
}
