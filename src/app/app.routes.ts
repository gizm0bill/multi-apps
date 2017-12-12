import { Routes } from '@angular/router';
import { NotFoundCom } from './404.com';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'second', loadChildren: './apps/second-app#SecondAppMod'},
  { path: 'first', loadChildren: './apps/first-app#FirstAppMod'},
  { path: '**',    component: NotFoundCom },
];
