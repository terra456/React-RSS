context('Fill form to add card', () => {
  it('successfully loads all form elements', () => {
    cy.visit('/add-card');
    cy.get('input[data-testid="name"]').should('not.have.value');
    cy.get('input[data-testid="date"]').should('not.have.value');
    cy.get('[data-testid="desc"]').should('not.have.value');
    cy.get('select > *').should('have.length', '10');
    cy.get('input[data-testid="checkboxValue"]').should('have.length', '40');
    cy.get('input[data-testid="gender"]').should('have.length', '4');
    cy.get('input[data-testid="status"]').should('have.length', '3');
    cy.get('input[data-testid="file-upload"]').should('not.have.value');
    cy.get('input[data-testid="agree"]').should('not.be.checked');
    cy.get('[data-testid="submit-form"]').should('exist');
  });

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
    cy.get('input[data-testid="file-upload"]').selectFile('cypress/downloads/1.jpg', {
      force: true,
    });
    cy.get('input[data-testid="agree"]').click();
    cy.get('[data-testid="submit-form"]').click();
    cy.get('[data-testid="card"]').should('exist');
  });
  it('add several cards', () => {
    cy.visit('/add-card');
    cy.get('input[data-testid="name"]').type('Text');
    cy.get('input[data-testid="date"]').type('2021-01-02');
    cy.get('[data-testid="desc"]').type('Description of card');
    cy.get('select').select('Robot');
    cy.get(':nth-child(3) > input[data-testid="checkboxValue"]').click();
    cy.get(':nth-child(12) > input[data-testid="checkboxValue"]').click();
    cy.get(':nth-child(1) > [data-testid="gender"]').click();
    cy.get(':nth-child(2) > input[data-testid="status"]').click();
    cy.get('input[data-testid="file-upload"]').selectFile('cypress/downloads/2.jpg', {
      force: true,
    });
    cy.get('input[data-testid="agree"]').click();
    cy.get('[data-testid="submit-form"]').click();

    cy.get('input[data-testid="name"]').type('Value');
    cy.get('input[data-testid="date"]').type('2021-12-05');
    cy.get('[data-testid="desc"]').type('Important text');
    cy.get('select').select('Cronenberg');
    cy.get(':nth-child(10) > input[data-testid="checkboxValue"]').click();
    cy.get(':nth-child(20) > input[data-testid="checkboxValue"]').click();
    cy.get(':nth-child(32) > input[data-testid="checkboxValue"]').click();
    cy.get(':nth-child(2) > [data-testid="gender"]').click();
    cy.get(':nth-child(2) > input[data-testid="status"]').click();
    cy.get('input[data-testid="file-upload"]').selectFile('cypress/downloads/3.jpg', {
      force: true,
    });
    cy.get('input[data-testid="agree"]').click();
    cy.get('[data-testid="submit-form"]').click();

    cy.get('input[data-testid="name"]').type('Woo');
    cy.get('input[data-testid="date"]').type('2021-10-11');
    cy.get('[data-testid="desc"]').type('Some new text');
    cy.get('select').select('Alien');
    cy.get(':nth-child(8) > input[data-testid="checkboxValue"]').click();
    cy.get(':nth-child(1) > [data-testid="gender"]').click();
    cy.get(':nth-child(2) > input[data-testid="status"]').click();
    cy.get('input[data-testid="file-upload"]').selectFile('cypress/downloads/4.jpg', {
      force: true,
    });
    cy.get('input[data-testid="agree"]').click();
    cy.get('[data-testid="submit-form"]').click();

    cy.get('[data-testid="card"]').should('have.length', 3);
  });
});
