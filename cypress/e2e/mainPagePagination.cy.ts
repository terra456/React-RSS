context('The Home Page Pagination', () => {
  it('use pagination', () => {
    cy.visit('/home');
    cy.get('[data-testid="card"]').should('have.length', 20);
    cy.get('[data-testid="pagination-count"').should('have.text', '826');
    cy.get('[data-testid="pagination-info"').should('have.text', 'Showing 1 to 20 of 826 results');
    cy.get('[aria-label="Pagination"] > :nth-child(5)').click();
    cy.get('[data-testid="pagination-info"').should('have.text', 'Showing 61 to 80 of 826 results');
    cy.get('[aria-label="Pagination"] > :nth-child(1)').click();
    cy.get('[data-testid="pagination-info"').should('have.text', 'Showing 41 to 60 of 826 results');
    cy.get('[aria-label="Pagination"] > :last-child').click();
    cy.get('[data-testid="pagination-info"').should('have.text', 'Showing 61 to 80 of 826 results');
  });
});
