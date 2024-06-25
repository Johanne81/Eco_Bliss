describe("Cart Functionality", () => {
    const apiUrl = Cypress.env("apiUrl");
    let productName;
    let productStock;

    before(() => {
        cy.loginViaUI();
      });
    
    it("should add a product to the cart if stock is greater than 1", () => {
        cy.getBySel("nav-link-products").click();
        // Cliquer par exemple sur le 8ème produit
        cy.getBySel("product").eq(7).find('[data-cy="product-link"]').click();

        // Pour savoir si le stock est supérieur à 1 :
        // Récupérer le nom du produit pour l'utiliser avec l'API
         cy.getBySel("detail-product-name").should("be.visible").invoke("text").then((name) => {
         productName = name.trim();  

        // Obtenir le stock du produit via l'élément HTML
      cy.getBySel("detail-product-stock").should("be.visible").invoke("text").then((stockText) => {
        productStock = stockText.trim();  
        cy.log(`Nombre de produits en stock : ${productStock}`);
      });
        
       /* // Obtenir le stock du produit via l'API en utilisant le nom du produit
        cy.request({
            method: "GET",
            url: `${apiUrl}/products`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            
            // Trouver le produit dans la réponse de l'API
            const product = response.body.find(p => p.name === productName);
            expect(product).to.exist;

            // Le stock doit être supérieur à 1
            expect(product.availableStock).to.be.greaterThan(1);*/
           
            // Vérifier que le produit est bien ajouté au panier
            cy.getBySel("detail-product-add").click();
            cy.getBySel("cart-line").should('contain', productName);

            // Revenir à la page précédente
            cy.go('back');

           // Vérifier que le stock est diminué du nombre de produit dans le panier
            cy.getBySel("detail-product-stock").should("be.visible").invoke("text").then((updatedStockText) => {
                const updatedStock = updatedStockText.trim();
                cy.log(`Nombre de produits en stock après ajout : ${updatedStock}`);
            });
        });
       });

       it("enter a negative number and add to cart", () => {
            cy.visit(' /products'); 
            // Cliquer par exemple sur le 4ème produit
            cy.getBySel("product").should("be.visible");
           // cy.getBySel("product").eq(3).find('[data-cy="product-link"]').click();

             //Ajoutez au panier une quantité négative
            cy.getBySel("detail-product-quantity").click();
            cy.getBySel("detail-product-quantity").clear();
            cy.getBySel("detail-product-quantity").type("-1");
            cy.getBySel("detail-product-add").click();


    });
});

