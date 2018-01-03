import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router,
   ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LoadedRouterConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs/Observable';
import { take, map, switchMap } from 'rxjs/operators';
import { AuthoritySrv, AuthenticationSrv,
  AppModuleConfig, IAppModuleConfig } from './';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate
{
  constructor
  (
    private auth: AuthenticationSrv,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  _can(): Observable<any> { return this.auth.account.pipe( take(1), map( a => !!a ) ); }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>
  {
    const redirectTo = route.data.redirectTo;
    return this._can().pipe( map( a =>
    {
      if ( !a && redirectTo ) this.router.navigate(redirectTo, { relativeTo: this.route });
      return a;
    }));
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
    // TODO: hacky, makes use of _loadedConfig, a prop added on RouterPreloader.preloadConfig
    let module;
    if ( route.routeConfig.loadChildren &&
      // TODO: https://github.com/angular/angular/blob/5.1.x/packages/router/src/router_preloader.ts#L128
      ( {module} = (( route.routeConfig as any )._loadedConfig as LoadedRouterConfig )) )
      return ( module.injector.get(AppModuleConfig) as IAppModuleConfig )
        .roles.pipe( switchMap( this._can.bind(this) ) );

    // or check hardcodded config from router data
    if ( route.data.authorities) return this._can( route.data.authorities );

    return false;
  }
  canLoad(route: Route)
  {
    return this._can( route.data.authorities );
  }
}
