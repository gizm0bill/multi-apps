import { Component, ChangeDetectionStrategy, Injector } from '@angular/core';
import { RouterStateSnapshot, Router } from '@angular/router';

@Component
({
  selector: 'menu.top',
  template: 'menu for first app <a [routerLink]="[moduleUrl, \'sub\', \'dub\']">sub</a>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuCom
{
  moduleUrl: string;
  constructor(private inj: Injector)
  {
    console.log( "MenuCom", inj.get(Router) );
    this.moduleUrl = inj.get(Router).routerState.snapshot.url;
  }
}