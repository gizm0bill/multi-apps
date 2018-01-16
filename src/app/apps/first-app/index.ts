import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SomeSrv } from '../../core';
import { SharedMod } from '../../shared';

@NgModule
({
  declarations: [ MainCom, ],
  entryComponents: [ MainCom ],
  imports:
  [
    SharedMod,
    MatTableModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ SomeSrv ]
})
export class FirstAppMod
{
  static routes = ROUTES;
}
