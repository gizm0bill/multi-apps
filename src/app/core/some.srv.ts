import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';

@Injectable()
export class SomeSrv
{
  constructor( private router: Router) {}
  someMethod(): boolean
  {
    return true;
  }
}
