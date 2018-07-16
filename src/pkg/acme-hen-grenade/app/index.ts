import { NgModule } from '@angular/core';
import { ROUTES, ACMEHenGrenadeRouterMod } from './router.mod';
import { MainCom } from './main.com';

@NgModule
({
  declarations: [ MainCom ],
  imports:
  [
    ACMEHenGrenadeRouterMod,
  ],
  providers: [  ],
})
export class ACMEHenGrenadeMod
{
  static routes = ROUTES;
}
