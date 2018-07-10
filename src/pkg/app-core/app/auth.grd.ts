import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Route, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LoadedRouterConfig } from '@angular/router/src/config';
import { take, map, switchMap, tap, filter, concatMap, concat, catchError } from 'rxjs/operators';
import { Observable, race, never } from 'rxjs';
import { AuthenticationSrv } from './auth.srv';
import { AppModuleConfig, IAppModuleConfig } from './';

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
    return this._can().pipe( map( account =>
    {
      if ( !account && redirectTo ) this.router.navigate(redirectTo, { relativeTo: this.route });
      return account;
    }));
  }
  canLoad(): Observable<boolean> { return this._can(); }
}

@Injectable()
export class AppAuthGuard implements CanActivate, CanLoad
{
  constructor( private auth: AuthenticationSrv ) {}

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
    {
      const moduleConfig = ( module.injector.get(AppModuleConfig) as IAppModuleConfig );
      return race
      (
        ( moduleConfig.roles || never() as Observable<string[]> ).pipe
        (
          switchMap( this._can.bind(this) ),
          filter( e => !!e ),
        ),
        ( moduleConfig.anyRole || never() as Observable<string[]> ).pipe
        (
          concatMap( role => role ),
          switchMap( this._can.bind(this) ),
          filter( e => !!e ),
        )
      );
    }
    // or check hardcodded config from router data
    if ( route.data && route.data.authorities ) return this._can( route.data.authorities );

    return false;
  }
  canLoad(route: Route)
  {
    return this._can( route.data.authorities );
  }
}
