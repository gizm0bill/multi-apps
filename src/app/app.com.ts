import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.state';
import { AuthenticationSrv } from './core/auth.srv';

/**
 * App Component
 * Top Level Component
 */
@Component
({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './app.com.css' ],
  templateUrl: './app.com.pug'
})
export class AppCom implements OnInit {

  loggedIn = false;
  constructor
  (
    public appState: AppState,
    private authSrv: AuthenticationSrv,
  ) {}

  ngOnInit()
  {
    this.authSrv.account.subscribe( l => this.loggedIn = l );
    console.log('Initial App State', this.appState.state);
  }
}
