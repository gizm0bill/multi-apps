import { Injectable, ComponentFactoryResolver, Injector, ReflectiveInjector } from '@angular/core';
import { Routes, ActivatedRouteSnapshot, Router, RouterStateSnapshot, Resolve, CanDeactivate } from '@angular/router';
import { MainCom } from './main.com';
import { MenuCom } from './menu.com';
import { SubCom } from './sub.com';
import { MenuSrv } from '../../core/menu.srv';
import {  } from '@angular/router/src/interfaces';

@Injectable()
export class FirstAppResolve implements Resolve<any>
{
  constructor
  (
    private menuSrv: MenuSrv,
    private comFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) {}
  
  resolve( activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot )
  {
    const com = this.comFactoryResolver.resolveComponentFactory(MenuCom);
    this.router.routerState.snapshot = state;
    const inj = ReflectiveInjector.resolveAndCreate([{ provide: Router, useValue: this.router }] );
    this.menuSrv.com.next({ com, inj } );
  }
}

@Injectable()
export class FirstAppDeactivateGuard implements CanDeactivate<any>
{
  constructor( private menuSrv: MenuSrv ) {}

  canDeactivate()
  {
    this.menuSrv.com.next( undefined );
    return true
  }
}

export const ROUTES: Routes =
[
  {
    path: '',
    resolve: [ FirstAppResolve ],
    canDeactivate: [ FirstAppDeactivateGuard ],
    children:
    [
      { path: '', component: MainCom },
      { path: 'sub', component: SubCom },
      { path: 'sub/dub', component: SubCom }
    ]
  },
];
