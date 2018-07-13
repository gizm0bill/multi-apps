import { Component, OnInit, HostBinding, ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, keyframes, animate, style } from '@angular/animations';
import { delay, take, map, switchMap, flatMap }  from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { PackageRegistrySrv, AppModuleConfig, AuthenticationSrv, AppModulePresentation } from '@app/core';

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
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
  ) {}

  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;

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
          map( module => ({ module, config: module.injector.get(AppModuleConfig), presentation: module.injector.get(AppModulePresentation )}) ),
          flatMap( ({module, config}) => config.roles, ( {module, config, presentation}, roles ) => ({ module, presentation, ...config, roles }) ),
          map( ({ module, roles, ...stuff}) =>
          {
            if ( roles.every( role => authorities.indexOf( role ) !== -1 ) )
            {
              const componentFactory = module.componentFactoryResolver.resolveComponentFactory( stuff.presentation );
              componentFactory.create( module.injector, undefined, this.target.element.nativeElement );
            }

            // if ( roles.every( role => authorities.indexOf( role ) !== -1 ) )
            //   this.lekkerApps.push
            //   ({
            //     // H4xX for infiloop - angular calling constructor on `instance` prop ¯\_(ツ)_/¯
            //     // tbh setTimeout woulda sufficed
            //     name: defer( () => of(module.instance.constructor.appName) ).pipe(delay( Math.random() * 10000 / 9 )),
            //     roles,
            //     injector: module.injector,

            //     // presentation: c.create( this.injector ),

            //     ...stuff,
            //   });

            // debugger;
          })
        );
      })
    ).subscribe();
  }

  isSvg(icon) { return icon && icon.split('.')[1] === 'svg'; }
}
