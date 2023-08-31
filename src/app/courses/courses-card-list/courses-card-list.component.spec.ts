import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';


describe( 'CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach( waitForAsync( () => {
    TestBed.configureTestingModule( {
      imports: [ CoursesModule ]
    } ).compileComponents()
      .then( () => {
        fixture = TestBed.createComponent( CoursesCardListComponent );
        component = fixture.componentInstance;
        el = fixture.debugElement;
      } );
  } ) );


  it( "should create the component", () => {
    // expect( component ).toBeTruthy();
    expect( component ).toBeDefined();
  } );


  it( "should display the course list", () => {

    component.courses = setupCourses();
    // After we assign new data to the component we need to trigger a
    // change detection method
    fixture.detectChanges();
    const cards = el.queryAll( By.css( '.course-card' ) );

    expect( cards ).toBeTruthy( 'Could not find cards' );
    expect( cards.length ).toBe( 12, 'Unexpected number of courses' );

  } );


  it( "should display the first course", () => {

    component.courses = setupCourses();
    fixture.detectChanges();
    const course = component.courses[ 0 ];

    // Selecting html elements using CSS selectors
    const card = el.query( By.css( '.course-card:first-child' ) ),
      title = card.query( By.css( 'mat-card-title' ) ),
      image = card.query( By.css( 'img[mat-card-image]' ) );

    expect( card ).toBeTruthy();
    expect( title.nativeElement.textContent ).toBe( course.titles.description );
    expect( image.nativeElement.src ).toBe( course.iconUrl );

  } );


} );


