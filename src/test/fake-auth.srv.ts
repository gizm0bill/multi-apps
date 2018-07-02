import { AuthenticationSrv, AuthoritySrv } from '../app/core/auth.srv';
import { take, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export class FakeAuthenticationSrv implements AuthenticationSrv
{
  account = new BehaviorSubject<any>( false );
  login( ...args: any[] )
  {
    const user = 'John 🔑 ' + args.map( a => a.replace(/[^\d]*/, '') ).join(', ');
    const authorities = args;
    return this.account.next({ user, authorities });
  }
  logout()
  {
    this.account.next(false);
  }

}

export class FakeAuthoritySrv extends AuthoritySrv
{
}
