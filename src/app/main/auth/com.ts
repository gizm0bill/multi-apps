import { Component } from '@angular/core';
import { AuthenticationSrv } from '../../core';

@Component
({
  selector: 'main-auth',
  templateUrl: './com.pug'
})
export class AuthCom
{
  constructor( public authSrv: AuthenticationSrv ) {}
}
