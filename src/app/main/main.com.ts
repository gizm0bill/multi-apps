import { Component, OnInit } from '@angular/core';
import { AuthenticationSrv } from '../core/auth.srv';

@Component
({
  selector: 'main',
  template: `
    <a (click)="authSrv.login('user_role_1')">login as auth1</a> <br />
    <a (click)="authSrv.login('user_role_2')">login as auth2</a> <br />
    <a (click)="authSrv.login('user_role_1', 'user_role_2')">login as both</a> <br />
  `
})
export class MainCom
{
  constructor( private authSrv: AuthenticationSrv ) {}
}
