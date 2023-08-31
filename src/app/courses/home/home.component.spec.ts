import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { CoursesService } from '../services/courses.service';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';




describe( 'HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;
  const beginnerCourses = setupCourses()
    .filter( course => course.category === 'BEGINNER' );
  const advancedCourses = setupCourses()
    .filter( course => course.category === 'ADVANCED' );

  beforeEach( waitForAsync( () => {
    const coursesServiceSpy = jasmine.createSpyObj( 'CoursesService', [ 'findAllCourses' ] );
    TestBed.configureTestingModule( {
      imports: [ CoursesModule,
        NoopAnimationsModule
      ],
      providers: [ {
        provide: CoursesService, useValue: coursesServiceSpy
      } ]
    } ).compileComponents().then( () => {
      fixture = TestBed.createComponent( HomeComponent );
      component = fixture.componentInstance;
      el = fixture.debugElement;
      coursesService = TestBed.inject<CoursesService>( CoursesService );
    } );

  } ) );

  it( "should create the component", () => {
    expect( component ).toBeDefined();
  } );


  it( "should display only beginner courses", () => {

    // It imitates Observable behavior using defined value of courses
    coursesService.findAllCourses.and
      .returnValue( of( beginnerCourses ) );
    fixture.detectChanges();
    // const tabs = el.queryAll( By.css( '.mat-tab-label' ) );
    const tabs = el.queryAll( By.css( '.mdc-tab' ) );
    expect( tabs.length ).toBe( 1, 'Unexpected number of tabs found' );

  } );


  it( "should display only advanced courses", () => {

    coursesService.findAllCourses.and
      .returnValue( of( advancedCourses ) );
    fixture.detectChanges();
    const tabs = el.queryAll( By.css( '.mdc-tab' ) );
    expect( tabs.length ).toBe( 1, 'Unexpected number of tabs found' );

  } );


  it( "should display both tabs", () => {
    coursesService.findAllCourses.and
      .returnValue( of( setupCourses() ) );
    fixture.detectChanges();
    const tabs = el.queryAll( By.css( '.mdc-tab' ) );
    expect( tabs.length ).toBe( 2, 'Expected 2 tabs found' );

  } );


  // done parameter indicates this is an async test
  it( "should display advanced courses when tab clicked", ( done: DoneFn ) => {
    coursesService.findAllCourses.and
      .returnValue( of( setupCourses() ) );
    fixture.detectChanges();
    const tabs = el.queryAll( By.css( '.mdc-tab' ) );
    // Alternative 1. Use debugelement to simulte click
    // el.nativeElement.click();
    // Alternative 2: Use included tool on this project
    click( tabs[ 1 ] );
    // It doesn not works
    // Animations are async tasks as well as setTimeout, fetch, etc.
    fixture.detectChanges();
    // We use a setTimeout to execute the expect function after browser renders 
    // the animation, due to the way as JS call stack works
    setTimeout( () => {
      // const cardTitles = el.queryAll( By.css( '.mat-mdc-card-title' ) );
      const cardTitles = el.queryAll(
        By.css( ".mat-mdc-tab-body-active .mat-mdc-card-title" )
      );
      expect( cardTitles.length ).toBeGreaterThan( 0, 'Coulnt find card titles' );
      expect( cardTitles[ 0 ].nativeElement.textContent ).toContain( 'Angular Security Course' );
      // When an async test receive done parameter, jasmine considere a test finished until
      // done callback is called instead jasmine exit of current code block
      done();
    }, 500 );
  } );


  it( 'should display advanced courses when tab clicked using fakeAsync', fakeAsync( () => {
    coursesService.findAllCourses.and
      .returnValue( of( setupCourses() ) );
    fixture.detectChanges();
    const tabs = el.queryAll( By.css( '.mdc-tab' ) );
    click( tabs[ 1 ] );
    fixture.detectChanges();
    flush();
    const cardTitles = el.queryAll(
      By.css( ".mat-mdc-tab-body-active .mat-mdc-card-title" )
    );
    expect( cardTitles.length ).toBeGreaterThan( 0, 'Coulnt find card titles' );
    expect( cardTitles[ 0 ].nativeElement.textContent ).toContain( 'Angular Security Course' );
  } ) );


  it( 'should display advanced courses when tab clicked using async', waitForAsync( () => {
    coursesService.findAllCourses.and
      .returnValue( of( setupCourses() ) );
    fixture.detectChanges();
    const tabs = el.queryAll( By.css( '.mdc-tab' ) );
    click( tabs[ 1 ] );
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      const cardTitles = el.queryAll(
        By.css( ".mat-mdc-tab-body-active .mat-mdc-card-title" )
      );
      expect( cardTitles.length ).toBeGreaterThan( 0, 'Coulnt find card titles' );
      expect( cardTitles[ 0 ].nativeElement.textContent ).toContain( 'Angular Security Course' );
    } );
  } ) );

} );


