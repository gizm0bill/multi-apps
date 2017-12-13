import { Component } from '@angular/core';
import { SomeSrv } from '../core/some.srv';

@Component({
  selector: 'main',
  template: `
    [main com] <br />
    <a (click)="login('auth1')">login as auth1</a> <br />
    <a (click)="login('auth2')">login as auth2</a> <br />
    <a (click)="login('auth3')">login as auth3</a> <br />
  `
})
export class MainCom
{
  constructor( private authSrv: SomeSrv ) {}

  login( role )
  {
    this.authSrv.auth( role );
  }
}
