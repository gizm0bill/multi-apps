import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainCom } from './main.com';
import { ROUTES } from './routes';

@NgModule
({
  declarations: [ MainCom ],
  imports: [ CommonModule, RouterModule.forChild(ROUTES) ]
})
export class MainMod {}
