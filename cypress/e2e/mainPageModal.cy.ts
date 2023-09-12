context('The Home Page Modal Window', () => {
  it('open modal', () => {
    cy.visit('/home');
    cy.get('[data-testid="modal-div"]').should('not.exist');
    cy.get(':nth-child(3) > [data-testid="card"]').click();
    cy.get('[data-testid="modal-div"]').should('exist');
  });

  it('close modal', () => {
    cy.visit('/home');
    cy.get('[data-testid="modal-div"]').should('not.exist');
    cy.get(':nth-child(5) > [data-testid="card"]').click();
    cy.get('[data-testid="modal-div"]').should('exist');
    cy.get('[data-testid="close-btn"]').click();
    cy.get('[data-testid="modal-div"]').should('not.exist');
  });
});
