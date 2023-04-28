context('Basic tests', () => {
  it('visit the home page', () => {
    cy.visit('/');

    cy.get('a[href="/home"]').should('have.text', 'home');
    cy.get('input[data-testid="search-input"]').should('have.value', '');
  });

  it('visit page about us', () => {
    cy.visit('/home');
    cy.get('a[href="/about-us"]').click();
    cy.get('a[href="/about-us"]').should('have.attr', 'aria-current');
    cy.get('h1').should('have.text', 'About Us');
  });
});
