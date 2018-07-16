import { NgModule } from '@angular/core';
import { MatChipsModule, MatIconModule } from '@angular/material';
import { ThreeJsMod } from '@app/three-js';
import { SharedMod } from '@app/shared';
import { ROUTES, ACMEDehydratedBouldersRouterMod } from './router.mod';
import { MainCom } from './main.com';

import { CustomShaderMaterialDir } from './custom-shader.dir';

@NgModule
({
  declarations: [ MainCom, CustomShaderMaterialDir ],
  imports:
  [
    SharedMod
    MatChipsModule,
    MatIconModule,
    ThreeJsMod,
    ACMEDehydratedBouldersRouterMod,
  ],
  providers: [  ],
})
export class ACMEDehydratedBouldersMod
{
  static routes = ROUTES;
}
