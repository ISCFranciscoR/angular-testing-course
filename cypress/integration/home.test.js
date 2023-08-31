/// <reference types="Cypress"/>


describe('Home Page', function () {

  beforeEach(function () {
    
  });

  it('should display a list of courses', function () {
    /*
    // Create a fake response reading a file inside fixture folder
    // Give an alias to fake response
    cy.fixture('courses.json').as('coursesJSON');
    // Initialize fake backend server
    cy.server();
    // Create a fake endpoint reading the fake response previously created and
    // reading it with alias name prefixing it with @
    cy.route('/api/courses', '@coursesJSON').as('courses');
    */
    // New way to do previous three functions, who are deprecated
    cy.intercept('GET', '/api/courses', {
      fixture: 'courses'
    }).as('courses');

    cy.visit('/');
    cy.contains('All Courses');

    // Wait for http fake request response
    // cy.wait('@courses');

    cy.get('mat-card').should('have.length', 9);

  });

  it('should display advaced courses', function () {
    cy.get('.mdc-tab').should('have.length', 2);
    cy.get('.mdc-tab').last().click();
    cy.get('.mat-mdc-tab-body-active .mat-mdc-card-title').its('length').should('be.gt', 1);
    cy.get('.mat-mdc-tab-body-active .mat-mdc-card-title').first()
      .should('contain', 'Angular Security Course');
  });
});