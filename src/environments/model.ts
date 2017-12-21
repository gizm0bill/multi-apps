import { NgModuleRef } from '@angular/core';
import { Route } from '@angular/router';

export interface Environment {
  production: boolean;
  ENV_PROVIDERS: any;
  showDevModule: boolean;
  decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
  appRoutes?: Route[]
}
