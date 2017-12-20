import { Component, OnInit } from '@angular/core';
import { RegistrySrv, AppModuleAccess, AuthenticationSrv, AuthoritySrv } from '../../core';
import { defer }  from 'rxjs/observable/defer';
import { of }     from 'rxjs/observable/of';
import { delay, take, map, switchMap, flatMap }  from 'rxjs/operators';
import { Router } from '@angular/router';

@Component
({
  selector: 'dashboard',
  templateUrl: './com.pug',
  styleUrls: ['./com.scss']
})
export class DashboardCom implements OnInit
{
  constructor
  (
    private reg: RegistrySrv,
    private router: Router,
    private auth: AuthenticationSrv,
    private authy: AuthoritySrv
  ) {}

  maxGridWidth = 4;
  lekkerApps: any[] = [];
  ngOnInit()
  {
    const apps = this.router.config.find( config => config.data && config.data.appsPlaceholder ).children;

    this.auth.account.pipe
    (
      take(1),
      map( account => account.authorities ),
      switchMap( authorities =>
      {
        return this.reg.apps.pipe
        (
          map( module => ({ module, config: module.injector.get(AppModuleAccess)}) ),
          flatMap( ({module, config}) => config.roles, ( {module, config}, roles ) => ({ module, ...config, roles }) ),
          map( ({ module, roles, ...stuff}) =>
          {
            if ( roles.every( role => authorities.indexOf( role ) !== -1 ) )
              this.lekkerApps.push
              ({
                // H4xX for infiloop - angular calling contructor on `instance` prop ¯\_(ツ)_/¯
                name: defer( () => of(module.instance.constructor.name) ).pipe(delay( Math.random() * 10000 / 3 )),
                roles, ...stuff
              });
          })
        );
      })
    ).subscribe();
  }
}
