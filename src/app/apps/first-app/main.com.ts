import { Component } from '@angular/core';
import { SomeSrv } from '../../core';

@Component({
  selector: 'first-app-main',
  template: '[first app] SomeSrv: {{someSrvResponse}}'
})

export class MainCom
{
  someSrvResponse: any;
  constructor(private someSrv: SomeSrv)
  {
    this.someSrvResponse = this.someSrv.someMethod();
  }
}
