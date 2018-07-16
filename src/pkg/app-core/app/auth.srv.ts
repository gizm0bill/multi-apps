import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take, map, switchMap, switchMapTo, tap, retryWhen, filter, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationSrv
{
  login( username: string, password: string, remember?: boolean ): Observable<any>
  {
    // TODO: mock
    const acc = { authorities: ['hen-grenade', 'time-space-gun'] };
    localStorage.setItem('account', JSON.stringify(acc) );
    this.account.next( acc );
    return this.account;
  }
  // TODO: maybe make server request to invalidate token
  logout()
  {
    localStorage.removeItem( 'account' );
    this.account.next( undefined );
  }
  account = new BehaviorSubject<any>( JSON.parse( localStorage.getItem('account') ) );
  /**
   * refreshable, if expired, account version
   */
  /**
   * @param specific
   *  if falsey allows any authority
   *  else, at least one account authority must be found
   */
  hasRole( specific?: string|string[]): Observable<any>
  {
    // leave stream open for *hasAuth
    return this.account.pipe
    (
      map( ( account: any ) =>
      {
        if ( !account || !account.authorities ) return false;
        if ( typeof specific === 'string' ) specific = [specific];
        if ( !specific ) return !!( account.authorities as string[] ).length;
        // tslint:disable-next-line:no-bitwise
        if ( specific ) return ( account.authorities as string[] ).some( auth => !!~( specific as string[] ).indexOf(auth) );
      })
    );
  }

}
