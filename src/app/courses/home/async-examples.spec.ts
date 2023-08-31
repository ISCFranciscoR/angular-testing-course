import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs/internal/observable/of";
import { delay } from "rxjs/internal/operators/delay";


describe( 'Async Testing Examples', () => {
  // This approach is not recomended when we have a more complex
  // scenario with multiples async functions called
  it( 'Asynchronous test example with Jasmine done()', ( done: DoneFn ) => {
    let test = false;
    setTimeout( () => {
      test = true;
      expect( test ).toBeTruthy();
      done();
    }, 1000 );
  } );

  // fakeAsync
  it( 'Asynchronous test texample -setTimeout', fakeAsync( () => {

    let test = false;

    setTimeout( () => {
      console.log( 'Running assertions' );
      test = true;
    }, 1000 );
    //Alternative 1
    // Move X quantity of time 'on the future' for executing async functions 'before'
    // tick( 1000 );
    /*
    tick( 500 );
    tick( 499 );
    tick( 1 );
    */

    // Alternative 2: Execute all timers that are pending
    flush();

    expect( test ).toBeTruthy();
  } ) );

  // When we are testing promises is a good thing that we know about event loop and call stack on JS
  // task queue, micro task queue, macro task queue and their order of execution
  // flushMicrotasks - process all pending MICRO tasks (promises)
  // flush - process all pending tasks MICRO and MACRO
  it( 'Asynchtonous test example - plain promise', fakeAsync( () => {
    let test = false;

    Promise.resolve().then( () => {
      test = true;
    } );
    flushMicrotasks();
    expect( test ).toBeTruthy();

  } ) );


  it( 'Asynchronous test example - Promises + setTimeout', fakeAsync( () => {
    let counter = 0;
    Promise.resolve().then( () => {
      counter += 10;
      setTimeout( () => {
        counter += 1;
      }, 1000 );
    } );
    expect( counter ).toBe( 0 );
    flushMicrotasks();
    expect( counter ).toBe( 10 );
    //flush();
    //expect( counter ).toBe( 11 );
    tick( 500 );
    expect( counter ).toBe( 10 );
    tick( 500 );
    expect( counter ).toBe( 11 );

  } ) );

  //Observables
  it( 'Asynchronous test example - Observables', fakeAsync( () => {
    let test = false;
    console.log( 'Creating observable' );
    const test$ = of( test ).pipe( delay( 1000 ) );

    test$.subscribe( () => {
      test = true;
    } );
    // It works similar like with Promises and setTimeout
    tick( 1000 );

    console.log( 'Running test assertions' );
    expect( test ).toBe( true );
  } ) );

} );