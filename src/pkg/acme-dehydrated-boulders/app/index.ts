import { NgModule } from '@angular/core';
import { ROUTES, ACMEDehydratedBouldersRouterMod } from './router.mod';
import { MainCom } from './main.com';

@NgModule
({
  declarations: [ MainCom ],
  imports:
  [
    ACMEDehydratedBouldersRouterMod,
  ],
  providers: [  ],
})
export class ACMEDehydratedBouldersMod
{
  static routes = ROUTES;
}
