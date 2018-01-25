import { NgModule } from '@angular/core';
import { SharedMod } from '../shared';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
    SharedMod,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
})
export class MainMod {}
