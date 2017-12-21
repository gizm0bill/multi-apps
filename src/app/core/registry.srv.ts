import { Injectable, NgModuleRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Router } from '@angular/router';
import { AppModuleConfig } from './';
import { LoadedRouterConfig } from '@angular/router/src/config';

@Injectable()
export class RegistrySrv
{
  constructor( private router: Router ) {}
  private _apps: ReplaySubject<NgModuleRef<any>> = new ReplaySubject;
  get apps(): ReplaySubject<NgModuleRef<any>> { return this._apps; }
  registerApp( app: NgModuleRef<any> )
  {
    // add app's own specific link after some custom logic
    // setTimeout because app.instance calls constructor, and we are now in the constructor call actually
    setTimeout( () =>
    {
      const
        appsRouteIdx =
          this.router.config.findIndex( cfg => cfg.data && cfg.data.appsPlaceholder ),

        appRouteIdx =
          this.router.config[appsRouteIdx].children.findIndex( route =>
            ((route as any )._loadedConfig as LoadedRouterConfig).module.instance === app.instance );

      app.injector.get(AppModuleConfig).link = this.router.createUrlTree
      ([
        this.router.config[appsRouteIdx].path,
        this.router.config[appsRouteIdx].children[appRouteIdx].path
      ]).toString();
    });
    this.apps.next(app);
  }
}
