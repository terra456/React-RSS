context('Form validation', () => {
  it('send empty form', () => {
    cy.visit('/add-card');
    cy.get('input[data-testid="name"]').type('Name');
    cy.get('[data-testid="submit-form"]').should('be.enabled');
    cy.get('[data-testid="submit-form"]').click();
    cy.get('[data-testid="submit-form"]').should('be.disabled');
  });

  it('errors are display when inputs are invalid', () => {
    cy.visit('/add-card');
    cy.get('[data-testid="desc"]').type('Some');
    cy.get('[data-testid="submit-form"]').click();
    cy.get('.text-red-500').should('include.text', 'name is required');
    cy.get('.text-red-500').should('include.text', 'date cant be empty');
    cy.get('.text-red-500').should('include.text', 'description mast be 10 and more');
    cy.get('.text-red-500').should('include.text', 'you must select one or more value');
    cy.get('.text-red-500').should('include.text', 'you must select any status');
    cy.get('.text-red-500').should('include.text', 'you must select a gender');
    cy.get('.text-red-500').should('include.text', 'You must agree the terms');
  });

  it('send not an image', () => {
    it('fill all data and send card', () => {
      cy.visit('/add-card');
      cy.get('input[data-testid="name"]').type('Name');
      cy.get('input[data-testid="date"]').type('2020-05-24');
      cy.get('[data-testid="desc"]').type('Some Description');
      cy.get('select').select('Humanoid');
      cy.get(':nth-child(5) > input[data-testid="checkboxValue"]').click();
      cy.get(':nth-child(14) > input[data-testid="checkboxValue"]').click();
      cy.get(':nth-child(3) > [data-testid="gender"]').click();
      cy.get(':nth-child(1) > input[data-testid="status"]').click();
      cy.get('input[data-testid="file-upload"]').selectFile('cypress/e2e/downloads/1.tar.gz', {
        force: true,
      });
      cy.get('input[data-testid="agree"]').click();
      cy.get('[data-testid="submit-form"]').click();
      cy.get('[data-testid="card"]').should('not.exist');
      cy.get('.text-red-500').should('include.text', 'you must add an image');
      cy.get('input[data-testid="file-upload"]').selectFile('cypress/e2e/downloads/5.jpg', {
        force: true,
      });
      cy.get('[data-testid="submit-form"]').click();
      cy.get('[data-testid="card"]').should('exist');
    });
  });
});
