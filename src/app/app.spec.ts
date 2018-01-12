import
{
  async,
  fakeAsync,
  inject,
  tick,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';
import { NgModuleFactoryLoader } from '@angular/core';
import { DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF, Location } from '@angular/common';
import { Router } from '@angular/router';

import { AppMod } from './';
import { AppCom } from './app.com';
import { INIT_ROUTES } from './routing';
import { AuthCom } from './main/auth/com';

let comp: AppCom;
let fixture: ComponentFixture<AppCom>;
let location: SpyLocation;
let router: Router;

describe('App', () =>
{
  beforeEach( async(() =>
  {
    TestBed.configureTestingModule
    ({
      imports: [ AppMod, RouterTestingModule.withRoutes( INIT_ROUTES ) ],
    })
    .compileComponents();
  }));

  it( 'should have `apps` routes', fakeAsync( inject( [Router], (r: Router) =>
    expect( r.config.find( route => route.data && route.data.appsPlaceholder ).children.length ).toBeGreaterThan(0)
  )));

  it('should navigate to login immediately', fakeAsync(() => {
    createComponent();
    expect(location.path()).toEqual('/auth', 'after initialNavigation()');
    expectElementOf(AuthCom);
  }));

});

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(el).toBeTruthy('expected an element for ' + type.name);
  return el;
}
  
function advance(): void {
  tick();
  fixture.detectChanges();
}

function createComponent()
{
  fixture = TestBed.createComponent(AppCom);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();

  advance();
}  