import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './routes';
import { MainCom } from './main.com';

@NgModule({
  declarations: [ MainCom, ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
  ],
})
export class SecondAppMod {
  public static routes = ROUTES;
}
