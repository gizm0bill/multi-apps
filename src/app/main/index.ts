import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatGridListModule } from '@angular/material';
import { DashboardCom } from './dashboard';
import { AuthCom } from './auth';
import { ROUTES } from './routes';

@NgModule
({
  declarations:
  [
    AuthCom,
    DashboardCom
  ],
  imports:
  [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MainMod {}
