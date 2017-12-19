import { Injectable, NgModuleRef } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class RegistrySrv
{
  private _apps: ReplaySubject<NgModuleRef<any>> = new ReplaySubject;
  get apps(): ReplaySubject<NgModuleRef<any>> { return this._apps; }
  registerApp( app: NgModuleRef<any> ) { this.apps.next(app); }
}
