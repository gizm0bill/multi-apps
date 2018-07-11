import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationSrv } from '@app/core';
import { AppStateSrv } from './state.srv';

export const ROOT_SELECTOR = 'app';
/**
 * App Component
 * Top Level Component
 */
@Component
({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [ './com.scss' ],
  templateUrl: './com.pug'
})
export class AppMainCom implements OnInit
{
  loggedIn: Observable<any>;
  constructor
  (
    public appState: AppStateSrv,
    private authSrv: AuthenticationSrv,
    private router: Router,
  ) {}

  ngOnInit()
  {
    this.loggedIn = this.authSrv.account;
    console.log('Initial App State', this.appState.state);
  }

  logout()
  {
    this.authSrv.logout();
    this.router.navigate(['/authentication']);
  }
}
