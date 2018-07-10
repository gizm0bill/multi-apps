import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, keyframes, animate, style } from '@angular/animations';
import { delay, take, map, switchMap, flatMap }  from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { PackageRegistrySrv, AppModuleConfig, AuthenticationSrv } from '@app/core';

@Component
({
  selector: 'dashboard',
  templateUrl: './com.pug',
  styleUrls: ['./com.scss'],
  animations:
  [
    trigger('flyIn',
    [
      state('in', style({transform: 'scale(1)'})),
      transition('void => *',
      [
        animate(300, keyframes
        ([
          style({opacity: 0, transform: 'scale(0)', offset: 0}),
          style({opacity: .5, transform: 'scale(1.1)', offset: 0.3}),
          style({opacity: 1, transform: 'scale(1)', offset: 1.0})
        ]))
      ]),
    ]),
    trigger('fadeOut', [ transition('* => void', [ animate(300, style({opacity: 0})) ]) ])
  ]
})
export class DashboardCom implements OnInit
{
  @HostBinding('@fadeOut') fadeOut = true;
  constructor
  (
    private reg: PackageRegistrySrv,
    private router: Router,
    private auth: AuthenticationSrv,
  ) {}

  minutes = 0;
  maxGridWidth = 4;
  lekkerApps: any[] = [];
  ngOnInit()
  {
    setInterval( () => this.minutes += 1, 3000);
    // see what loaded apps the user has access to
    this.auth.account.pipe
    (
      take(1),
      map( (account: any) => account.authorities ),
      switchMap( (authorities: any[]) =>
      {
        return this.reg.apps.pipe
        (
          map( module => ({ module, config: module.injector.get(AppModuleConfig)}) ),
          flatMap( ({module, config}) => config.roles, ( {module, config}, roles ) => ({ module, ...config, roles }) ),
          map( ({ module, roles, ...stuff}) =>
          {
            if ( roles.every( role => authorities.indexOf( role ) !== -1 ) )
              this.lekkerApps.push
              ({
                // H4xX for infiloop - angular calling contructor on `instance` prop ¯\_(ツ)_/¯
                // tbh setTimeout woulda sufficed
                name: defer( () => of(module.instance.constructor.appName) ).pipe(delay( Math.random() * 10000 / 9 )),
                roles, ...stuff
              });
          })
        );
      })
    ).subscribe();
  }

  isSvg(icon) { return icon && icon.split('.')[1] === 'svg'; }
}
