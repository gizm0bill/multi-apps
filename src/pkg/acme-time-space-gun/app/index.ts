import { NgModule } from '@angular/core';
import { ROUTES, ACMETimeSpaceGunRouterMod } from './router.mod';
import { MainCom } from './main.com';

@NgModule
({
  declarations: [ MainCom ],
  imports:
  [
    ACMETimeSpaceGunRouterMod,
  ],
  providers: [  ],
})
export class ACMETimeSpaceGunMod
{
  static routes = ROUTES;
}
