context('The Home Page with Search', () => {
  it('successfully loads home page with search string and cards', () => {
    cy.visit('/home');
    cy.get('input[data-testid="search-input"]').should('have.value', '');
    cy.get('[data-testid="card"]').should('have.length', 20);
    cy.get('[data-testid="pagination-count"').should('have.text', '826');
  });

  it('search results', () => {
    cy.visit('/home');
    cy.get('input[data-testid="search-input"]').type('ric');
    cy.get('[data-testid="search-btn"]').click();
    cy.get('input[data-testid="search-input"]').should('have.value', 'ric');
    cy.get('[data-testid="card"]').should('have.length', 20);
    cy.get('[data-testid="pagination-count"').should('have.text', '116');
  });

  it('clear search results', () => {
    cy.visit('/home');
    cy.get('input[data-testid="search-input"]').type('ric');
    cy.get('[data-testid="search-btn"]').click();
    cy.get('input[data-testid="search-input"]').should('have.value', 'ric');
    cy.get('[data-testid="card"]').should('have.length', 20);
    cy.get('[data-testid="pagination-count"').should('have.text', '116');
    cy.get('[data-testid="reset-search-btn"]').click();
    cy.get('input[data-testid="search-input"]').should('have.value', '');
    cy.get('[data-testid="pagination-count"').should('have.text', '826');
  });
});
