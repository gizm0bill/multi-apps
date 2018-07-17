import { take, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationSrv } from '@app/core';

export class FakeAuthenticationSrv extends AuthenticationSrv
{
  account = new BehaviorSubject<any>( false );
  login( ...args: any[] )
  {
    const user = 'John 🔑 ' + args.map( a => a.replace(/[^\d]*/, '') ).join(', ');
    const authorities = args;
    this.account.next({ user, authorities });
    return this.account;
  }
  logout()
  {
    this.account.next(false);
  }

}
