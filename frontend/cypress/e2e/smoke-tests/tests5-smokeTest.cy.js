describe('Smoke test', () => {
  
    it('Presence of connection fields and buttons', () => {
      cy.visit('');
      cy.getBySel("nav-link-register").should('be.visible');
      cy.getBySel("nav-link-login").should('be.visible').click();
      cy.getBySel("login-input-username").should('be.visible');
      cy.getBySel("login-input-password").should('be.visible');
      cy.getBySel("login-submit").should('be.visible');
    });
  
    it('Presence of add to cart buttons and product availability field', () => {
      // Tests déjà couvert dans le fichier "tests3-products.cy.js", 
      // Dans it("displays detailed information for each product"
    });
  });