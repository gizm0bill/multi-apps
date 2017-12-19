import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationSrv
{
  // constructor( protected http: Http, private router: Router...

  account = new BehaviorSubject<any>( JSON.parse(localStorage.getItem('account')) );
  // Perform login
  // login( user: string, pass: string, remember?: boolean )
  login( ...args: any[] )
  {
    const user = 'John ' + args.map( a => a.replace(/[^\d]*/, '') ).join(', ');
    const authorities = args;
    // if ( remember )
    localStorage.setItem( 'account', JSON.stringify({ user, authorities }) );
    return this.account.next({ user, authorities });
  }

  logout()
  {
    localStorage.removeItem( 'account' );
    this.account.next(false);
  }

}

@Injectable()
export class AuthoritySrv
{
  constructor( private auth: AuthenticationSrv ) {}

  hasRole(specific?: string|string[]): Observable<any>
  {
    return this.auth.account.take(1).map( (acc: any) =>
    {
      if ( !acc ) return false;
      if ( typeof specific === 'string' ) specific = [specific];
      if ( !specific )
        return !!( acc.authorities as string[] ).length;
      if ( specific )
        return ( specific as string[] ).every( role => ( acc.authorities as string[] ).indexOf(role) !== -1 );
    });
  }

}
