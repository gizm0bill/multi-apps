import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainCom } from './main.com';
import { ROUTES } from './routes';

@NgModule
({
  declarations: [ MainCom ],
  imports: [ RouterModule.forChild(ROUTES) ]
})
export class MainMod {}
