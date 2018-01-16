import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
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
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MainMod {}
