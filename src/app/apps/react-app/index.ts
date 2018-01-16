import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef, Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { RegistrySrv, AppModuleConfig, IAppModuleConfig } from '../../core';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';

import * as ReactApp from './static/js';

@Component
({
  selector: 'react-app-main',
  template: ` <div id="root"></div> `,
  encapsulation: ViewEncapsulation.None,
  styles: [require('./static/css/main.8aa80944.css')]
})

export class MainCom implements AfterViewInit
{
  ngAfterViewInit()
  {
    console.log( ReactApp.load() );
  }
}

export const REACT_APP_MODULE_CONFIG: IAppModuleConfig =
{
  roles: of([]).pipe( delay( Math.random() * 10000 / 9) ),
  weight: 1,
  order: 4,
  icon: 'react-logo.svg',
};

@NgModule
({
  declarations: [ MainCom, ],
  entryComponents: [ MainCom ],
  imports:
  [
    RouterModule.forChild([{ path: '', component: MainCom }]),
  ],
  providers: [ { provide: AppModuleConfig, useValue: REACT_APP_MODULE_CONFIG } ]
})
export class ReactAppMod
{
  static appName = 'React App';
  constructor
  (
    private reg: RegistrySrv,
    private mod: NgModuleRef<ReactAppMod>,
    private iconReg: MatIconRegistry,
    private sanitizer: DomSanitizer,
  )
  {
    this.iconReg.addSvgIcon('react-logo', sanitizer.bypassSecurityTrustResourceUrl('assets/img/react-logo.svg') );
    this.reg.registerApp(this.mod);
    console.log('React App constructed');
  }
}
