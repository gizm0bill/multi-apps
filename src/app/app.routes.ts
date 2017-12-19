import { Routes } from '@angular/router';
import { NotFoundCom } from './404.com';
import { AuthGuard, AppAuthGuard } from './core';

export const INIT_ROUTES: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children:
    [
      {
        path: 'third',
        loadChildren: './apps/third-app#ThirdAppMod',
        // canLoad: [ AppAuthGuard ], won't report if not loaded
        canActivate: [ AppAuthGuard ],
        // TODO: from each module
        data: { authorities: ['user_role_1', 'user_role_2'] }
      },
      {
        path: 'second',
        loadChildren: './apps/second-app#SecondAppMod',
        canActivate: [ AppAuthGuard ],
        data: { authorities: ['user_role_2'] }
      },
      {
        path: 'first',
        loadChildren: './apps/first-app#FirstAppMod',
        canActivate: [ AppAuthGuard ],
        data: { authorities: ['user_role_1'] }
      },
      {
        path: 'nth',
        loadChildren: './apps/nth-app#NthAppMod',
        canActivate: [ AppAuthGuard ],
        data: { authorities: ['user_role_2'] }
      },
    ]
  },
  { path: '**',    component: NotFoundCom },
];
