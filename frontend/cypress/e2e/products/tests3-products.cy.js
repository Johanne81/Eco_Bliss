describe("Products display on home page", () => {
    beforeEach(() => {
        cy.visit("");
        cy.getBySel("nav-link-products").click();
        cy.url().should('include', '/products');
        cy.get('.list-products').should('be.visible');
      });

    it("check page load", () => {
        //Test déjà couvert dans beforeEach
    });

    it("displays all products and their information", () => {
        cy.getBySel("product").should('have.length', 8).each((product) => {

        // Toutes les commandes Cypress à l'intérieur de within ne s'appliquent qu'aux sous-éléments de product.
        cy.wrap(product).within(() => {
        cy.getBySel("product-picture").should('be.visible');
        cy.getBySel("product-name").should('be.visible');
        cy.getBySel("product-ingredients").should('be.visible');
        cy.getBySel("product-price").should('be.visible');
        cy.getBySel("product-link").should('be.visible').and('contain', 'Consulter');
        });
        });
    });

    it("displays detailed information for each product", () => {
        cy.getBySel("product").should('have.length', 8).each((_, index) => {
            
            cy.getBySel("product").eq(index).find('[data-cy="product-link"]').click();

            // Vérifie les détails du produit après le clic
            cy.getBySel("detail-product-img").should('be.visible');
            cy.getBySel("detail-product-description").should('be.visible');
            cy.getBySel("detail-product-skin").should('be.visible');
            cy.getBySel("detail-product-aromas").should('be.visible');
            cy.getBySel("detail-product-ingredients").should('be.visible');
            cy.getBySel("detail-product-price").should('be.visible');
            cy.getBySel("detail-product-stock").should('be.visible');
            cy.getBySel("detail-product-quantity").should('be.visible');
            cy.getBySel("detail-product-add").should('be.visible').and('contain', 'Ajouter au panier');
                       
            // Retourne sur la page des produits pour le prochain test
            cy.getBySel("nav-link-products").click();

            // Attendre que la liste des produits soit de nouveau visible   
            cy.get('.list-products').should('be.visible');
            cy.getBySel("product").should('have.length', 8)   
        });
    });
});
    

        


        
    
