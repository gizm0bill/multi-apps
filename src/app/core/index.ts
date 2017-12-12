import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { SomeSrv } from './some.srv';
export { SomeSrv } from './some.srv';

@NgModule
({
  imports: [ CommonModule ],
  providers: [ SomeSrv ]
})
export class CoreMod {}
