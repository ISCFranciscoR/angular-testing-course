import { CalculatorService } from './calculator.service';
import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

// We can disable unit test and individual test cases, prefixing an X letter to describe, it function 
// respectively:
// xdescribe
// xit

// We can focus testing on specific unit test or test cases prefixing an f letter to describe, it function 
// respectively:
// fdescribe
// fit


describe( 'Calculator service', () => {

  let loggerSpy: LoggerService;
  let calculator: CalculatorService;

  //Testbed utility allows us inject dependencies inside our testing methods

  // This method is executed once before each test
  beforeEach( () => {
    loggerSpy = jasmine.createSpyObj( 'LoggerService', [ 'log' ] );


    // Instantiate services using dependency injection
    TestBed.configureTestingModule( {
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    } );

    // calculator = new CalculatorService( loggerSpy );

    // In older version replace TestBed.inject() by TestBed.get()
    calculator = TestBed.inject( CalculatorService );
  } );

  it( 'should add two numbers', () => {
    // It's useful for declare test but without implement at this moment
    // pending();

    /*
    const logger = new LoggerService();
    //Spy an intance object. The second parameters indicates the name of the methods to spy
    // We can look into how many times a method is executed 
    spyOn( logger, 'log' );
    */

    // Create a fake instance of logger service to ensure that Calculator service only fails on an internal
    // error and not in an internal dependency
    // const logger = jasmine.createSpyObj<LoggerService>( 'LoggerService', [ 'log' ] );

    // In case our fake methods returns some value we can simulate this action as follows:
    // logger.log.and.returnValue();

    // const calculator = new CalculatorService( logger );
    const result = calculator.add( 2, 2 );
    expect( result ).toBe( 4 );
    expect( loggerSpy.log ).toHaveBeenCalledTimes( 1 );
  } );

  it( 'should subtract two numbers', () => {
    // It simulate fail test
    // fail();

    const result = calculator.subtract( 2, 2 );
    // The second parameter gives more information about the error in case this test fails
    expect( result ).toBe( 0, 'Unexpected subtract result' );
    expect( loggerSpy.log ).toHaveBeenCalledTimes( 1 );
  } );

} );