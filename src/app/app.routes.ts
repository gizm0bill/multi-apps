import { Routes } from '@angular/router';
import { NotFoundCom } from './404.com';
import { AuthGuard, AppAuthGuard } from './core';

export const INIT_ROUTES: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    children:
    [
      {
        path: 'third',
        loadChildren: './apps/third-app#ThirdAppMod',
        canLoad: [ AppAuthGuard ], canActivate: [ AppAuthGuard ],
        data: { authorities: ['user_role_1', 'user_role_2'] }
      },
      {
        path: 'second',
        loadChildren: './apps/second-app#SecondAppMod',
        canLoad: [ AppAuthGuard ], canActivate: [ AppAuthGuard ],
        data: { authorities: ['user_role_2'] }
      },
      {
        path: 'first',
        loadChildren: './apps/first-app#FirstAppMod',
        canLoad: [ AppAuthGuard ], canActivate: [ AppAuthGuard ],
        data: { authorities: ['user_role_1'] }
      },
    ]
  },
  { path: '**',    component: NotFoundCom },
];
