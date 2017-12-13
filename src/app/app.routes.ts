import { Routes } from '@angular/router';
import { NotFoundCom } from './404.com';

export const INIT_ROUTES: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  // DRP_LK_TS_HT
  { path: '**',    component: NotFoundCom },
];
