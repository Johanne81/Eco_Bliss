describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
  })
  it('should find the product article', () => {
    // Visite la page
    cy.visit('http://localhost:8080');

    // Vérifie l'existence de l'article en utilisant le data-cy
    cy.get(':nth-child(1) > .add-to-cart > [data-cy="product-home-link"]').should('exist')
    cy.get(':nth-child(1) > .add-to-cart > [data-cy="product-home-link"]').click()
  });
})