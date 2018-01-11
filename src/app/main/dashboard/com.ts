import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, keyframes, animate, style } from '@angular/animations';
import { defer }  from 'rxjs/observable/defer';
import { of }     from 'rxjs/observable/of';
import { delay, take, map, switchMap, flatMap }  from 'rxjs/operators';
import { RegistrySrv, AppModuleConfig, AuthenticationSrv, AuthoritySrv } from '../../core';

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
    private reg: RegistrySrv,
    private router: Router,
    private auth: AuthenticationSrv,
    private authy: AuthoritySrv
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
      map( account => account.authorities ),
      switchMap( authorities =>
      {
        return this.reg.apps.pipe
        (
          map( module => ({ module, config: module.injector.get(AppModuleConfig)}) ),
          flatMap( ({module, config}) => config.roles, ( {module, config}, roles ) => ({ module, ...config, roles }) ),
          map( ({ module, roles, ...stuff}) =>
          {
            if ( roles.every( role => authorities.indexOf( role ) !== -1 ) )
              this.lekkerApps[ stuff.order ] =
              {
                // H4xX for infiloop - angular calling contructor on `instance` prop ¯\_(ツ)_/¯
                // tbh setTimeout woulda sufficed
                name: defer( () => of(module.instance.constructor.appName) ).pipe(delay( Math.random() * 10000 / 9 )),
                roles, ...stuff
              };
          })
        );
      })
    ).subscribe();
  }
}
