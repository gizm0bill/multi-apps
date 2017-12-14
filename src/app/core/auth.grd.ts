import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, ActivatedRouteSnapshot } from '@angular/router';
import { AuthoritySrv } from './auth.srv';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate
{
  constructor( private auth: AuthoritySrv ) {}

  _can()
  {
    return this.auth.hasRole();
  }
  canActivate(): Observable<boolean>
  {
    return this._can();
  }
  canLoad(): Observable<boolean>
  {
    return this._can();
  }
}

@Injectable()
export class AppAuthGuard implements CanActivate, CanLoad
{
  constructor( private auth: AuthoritySrv ) {}

  _can( authorities )
  {
    return this.auth.hasRole( authorities );
  }
  canActivate(route: ActivatedRouteSnapshot)
  {
    return this._can( route.data.authorities );
  }
  canLoad(route: Route)
  {
    return this._can( route.data.authorities );
  }
}
