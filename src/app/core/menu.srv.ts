import { Injectable, Injector, ComponentFactory } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuSrv
{
  constructor() { console.log('%c Oh my heavens! ', 'background: #222; color: #bada55'); }
  com = new Subject<{ com: ComponentFactory<any>, inj?: Injector}>();
}