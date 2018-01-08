import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Router } from '@angular/router';
/**
 * Load the implementations that should be tested
 */
import { AppCom } from './app.com';
import { AppState } from './app.state';
import { AuthenticationSrv } from './core/auth.srv';
import { FakeAuthenticationSrv } from '../test/fake-auth.srv';

class RouterStub
{
  navigateByUrl(url: string) { return url; }
  navigate( ...args: any[] ) { return args; }
}

describe(`App`, () =>
{
  let comp: AppCom;
  let fixture: ComponentFixture<AppCom>;

  beforeEach( async( () =>
  {
    TestBed.configureTestingModule
    ({
      declarations: [ AppCom ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers:
      [
        AppState,
        { provide: AuthenticationSrv, useClass: FakeAuthenticationSrv },
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(AppCom);
    comp    = fixture.componentInstance;

    fixture.detectChanges();
  });

  it(`should be initialized`, () =>
  {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should perform logout`, inject([AuthenticationSrv], (auth: AuthenticationSrv) =>
  {
    const userRole1 = 'user_role_1';
    let currentAccount = null;
    auth.account.subscribe( account => currentAccount = account );
    auth.login( userRole1 );
    expect( currentAccount.authorities.length ).toBe(1);
    expect( currentAccount.authorities[0] ).toBe(userRole1);
    comp.logout();
    expect( currentAccount ).toBeFalsy();
  }));

});
