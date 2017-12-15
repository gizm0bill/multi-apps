import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './routes';
import { MainCom } from './main.com';
// import { SomeSrv } from '../../core';

@NgModule({
  declarations: [ MainCom, ],
  entryComponents: [ MainCom ],
  imports:
  [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
  // providers: [ SomeSrv ]
})
export class FirstAppMod {
  static routes = ROUTES;
  constructor() { console.log('First App constructed'); }
}
