import { NgModule, NgModuleRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatChipsModule, MatIconModule } from '@angular/material';
import { ROUTES } from './routes';
import { MainCom } from './main.com';
import { SubCom } from './sub.com';
import { CustomShaderMaterialDir } from './custom-shader.dir';
import { SomeSrv, RegistrySrv, AppModuleConfig, IAppModuleConfig } from '../../core';
import { ThreeJsMod } from '../../three-js';
import { SharedMod } from '../../shared';
import { of } from 'rxjs/observable/of';
import { delay, map } from 'rxjs/operators';

export const SECOND_APP_MODULE_CONFIG: IAppModuleConfig =
{
  roles: of(['user_role_2']).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 2,
  order: 1,
  icon: 'trending_up'
};

@NgModule({
  declarations: [ MainCom, SubCom, CustomShaderMaterialDir ],
  imports:
  [
    SharedMod,
    MatChipsModule,
    MatIconModule,
    ThreeJsMod,
    RouterModule.forChild(ROUTES),
  ],
  providers:
  [
    SomeSrv,
    { provide: AppModuleConfig, useValue: SECOND_APP_MODULE_CONFIG }
  ]
})
export class SecondAppMod
{
  static routes = ROUTES;
  static appName = 'Fish App';
  constructor( private reg: RegistrySrv, private mod: NgModuleRef<SecondAppMod> )
  {
    this.reg.registerApp(this.mod);
    console.log('Second App constructed');
  }
}
