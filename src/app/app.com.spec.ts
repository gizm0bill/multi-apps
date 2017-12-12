import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { AppCom } from './app.com';
import { AppState } from './app.service';

describe(`App`, () => {
  let comp: AppCom;
  let fixture: ComponentFixture<AppCom>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCom ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AppState]
    })
    /**
     * Compile template and css
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(AppCom);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be @TipeIO`, () => {
    expect(comp.twitter).toEqual('https://twitter.com/gdi2290');
    expect(comp.tipe).toEqual('assets/img/tipe.png');
    expect(comp.name).toEqual('Angular Starter');
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
