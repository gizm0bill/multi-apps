import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { SomeSrv } from 'app/core/some.srv';

@NgModule
({
  imports: [ CommonModule ],
  providers: [ SomeSrv ]
})
export class CoreMod {}
