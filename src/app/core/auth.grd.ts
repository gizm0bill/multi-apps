import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthoritySrv } from './auth.srv';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate
{
  constructor
  (
    private auth: AuthoritySrv,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  _can(): Observable<any> { return this.auth.hasRole(); }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>
  {
    const redirectTo = route.data.redirectTo;
    return this._can().map( a =>
    {
      if ( !a && redirectTo ) this.router.navigate(redirectTo, { relativeTo: this.route });
      return a;
    });
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
