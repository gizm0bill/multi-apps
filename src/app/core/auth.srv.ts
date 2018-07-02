import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthenticationSrv
{
  // constructor( protected http: Http, private router: Router...

  account = new BehaviorSubject<any>( JSON.parse(localStorage.getItem('account')) );
  // Perform login
  // login( user: string, pass: string, remember?: boolean )
  login( ...args: any[] )
  {
    const user = 'John 🔑 ' + args.map( a => a.replace(/[^\d]*/, '') ).join(', ');
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

  /**
   * decide if user has any or a specific role
   * @param specific what role or list of roles to check of
   */
  hasRole(specific?: string|string[]): Observable<any>
  {
    return this.auth.account.pipe( take(1), map( (acc: any) =>
    {
      if ( !acc ) return false;
      if ( typeof specific === 'string' ) specific = [specific];
      if ( !specific )
        return !!( acc.authorities as string[] ).length;
      if ( specific )
        return ( specific as string[] ).every( role => ( acc.authorities as string[] ).indexOf(role) !== -1 );
    }));
  }

}
