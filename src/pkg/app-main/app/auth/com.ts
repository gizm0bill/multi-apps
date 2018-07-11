import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationSrv } from '@app/core';

@Component
({
  selector: 'main-auth',
  templateUrl: './com.pug',
  styleUrls: ['./com.scss']
})
export class AuthCom
{
  constructor( public authSrv: AuthenticationSrv, private router: Router ) {}
  goHome() { this.router.navigateByUrl('/home'); }
}
