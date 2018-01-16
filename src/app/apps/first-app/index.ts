import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ROUTES, FirstAppResolve, FirstAppDeactivateGuard } from './routes';
import { MainCom } from './main.com';
import { SubCom } from './sub.com';
import { MenuCom } from './menu.com';
import { SharedMod } from '../../shared';
import { MenuSrv } from '../../core/menu.srv';

@NgModule
({
  declarations: [ MainCom, SubCom, MenuCom ],
  entryComponents: [ MainCom, MenuCom ],
  imports:
  [
    SharedMod,
    MatTableModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ FirstAppResolve, FirstAppDeactivateGuard ],
})
export class FirstAppMod
{
  static routes = ROUTES;
}
