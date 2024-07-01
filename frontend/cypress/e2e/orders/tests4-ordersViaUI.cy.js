describe("Cart Functionalities", () => {
  const apiUrl = Cypress.env("apiUrl");
  let productName;
  let initialStock;

  it("should add a product to the cart if stock is greater than 1", () => {
    cy.loginViaUI();

    // Aller sur la page des produits
    cy.getBySel("nav-link-products").click();

    // Cliquer par exemple sur le 8ème produit
    cy.getBySel("product").eq(7).find('[data-cy="product-link"]').click();

    // Vérifier le stock via l'API
    cy.request({
      method: "GET",
      url: `${apiUrl}/products/10`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      const product = response.body;
      initialStock = product.availableStock;
      productName = product.name;
      cy.log(`Stock avant achat : ${initialStock}`);

      if (initialStock > 1) {
        //Ajouter le produit au panier
        cy.getBySel("detail-product-add").click();

        // Vérifier que le produit est bien ajouté au panier
        cy.getBySel("cart-line").should("contain", productName);

        // Vérifier si le stock a été mis à jour
        cy.request({
          method: "GET",
          url: `${apiUrl}/products/10`,
        }).then((updatedResponse) => {
          expect(updatedResponse.status).to.eq(200);
          const updatedProduct = updatedResponse.body;
          expect(updatedProduct.availableStock).to.eq(initialStock - 1);
          cy.log(`Stock après achat : ${updatedProduct.availableStock}`);
        });
      }
    });
  });

  it("shouldn't add a negative quantity", () => {
    cy.loginViaUI();

    // Aller sur la page du produit
    cy.visit("http://localhost:8080/#/products/10");

    // Entrer une quantité négative
    cy.getBySel("detail-product-quantity").clear().type("-1");
    cy.getBySel("detail-product-add").click();

    // Vérifier qu'un message d'erreur apparaît
    cy.getBySel("error-message")
      .should("be.visible")
      .and("contain", "Quantité invalide"); // ANOMALIE, un message d'erreur devrait informer l'utilisateur, or il n'y en a pas
  });

  it("shouldn't add a quantity greater than 20", () => {
    cy.loginViaUI();

    // Aller sur la page du produit, quantité en stock : 12
    cy.visit("http://localhost:8080/#/products/6");

    // Entrer une quantité supérieure à 20
    cy.getBySel("detail-product-quantity").clear().type("21");
    cy.getBySel("detail-product-add").click();

    // Aller sur la page du panier
    cy.getBySel("nav-link-cart").click();
    cy.getBySel("cart-line").should("be.visible");

    // Vérifier que le produit n'est pas ajouté au panier
    cy.contains("Dans la forêt").should("not.exist"); // ANOMALIE, le produit est ajouté *21 dans le panier
  });

  it("shouldn't add a quantity null", () => {
    cy.loginViaUI();

    // Aller sur la page du produit
    cy.visit("http://localhost:8080/#/products/9");

    // Entrer une quantité null
    cy.getBySel("detail-product-quantity").clear().type("0");
    cy.getBySel("detail-product-add").click();

    // Aller sur la page du panier
    cy.getBySel("nav-link-cart").click();
    cy.getBySel("cart-line").should("be.visible");

    // Vérifier que le produit n'est pas ajouté au panier
    cy.contains("Mousse de rêve").should("not.exist"); // ANOMALIE, le produit est ajouté dans le panier
  });
});
