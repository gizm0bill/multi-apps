import { NO_ERRORS_SCHEMA } from '@angular/core';
import
{
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

/**
 * Load the implementations that should be tested
 */
import { AppMainCom } from './com';
import { AppStateSrv } from './state.srv';

describe(`App`, () =>
{
  let comp: AppMainCom;
  let fixture: ComponentFixture<AppMainCom>;

  /**
   * async beforeEach
   */
  beforeEach(async(() =>
  {
    TestBed.configureTestingModule
    ({
      declarations: [ AppMainCom ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AppStateSrv]
    })
    /**
     * Compile template and css
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() =>
  {
    fixture = TestBed.createComponent(AppMainCom);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readily initialized`, () =>
  {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it('should log ngOnInit', () =>
  {
    console.log( comp );
  });
});
