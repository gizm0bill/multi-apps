import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

@Injectable()
export class SomeSrv
{
  constructor( private router: Router) {}
  auth( role )
  {
    let r: Route[] =
    [
      { path: 'second', loadChildren: '../apps/second-app#SecondAppMod' },
      { path: 'first', loadChildren: '../apps/first-app#FirstAppMod' }
    ];
    this.router.resetConfig([ ...r, ...this.router.config ]);
    return 'some service method';
  }
}
