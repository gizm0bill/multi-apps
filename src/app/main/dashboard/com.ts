import { Component, OnInit } from '@angular/core';
import { RegistrySrv, AppModuleAccess } from '../../core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/delay';

@Component
({
  selector: 'dashboard',
  templateUrl: './com.pug'
})
export class DashboardCom implements OnInit
{
  constructor( private reg: RegistrySrv ) {}

  lekkerApps: any[] = [];
  ngOnInit()
  {
    this.reg.apps.subscribe( mod =>
      this.lekkerApps.push
      ({
        // H4xX for infiloop - angular calling contructor on `instance` prop ¯\_(ツ)_/¯
        name: Observable.defer( () => Observable.of(mod.instance.constructor.name) ).delay(1000),
        roles: mod.injector.get(AppModuleAccess).roles
      }));

    setTimeout( () => console.log(this.lekkerApps), 1000 );
  }
}
