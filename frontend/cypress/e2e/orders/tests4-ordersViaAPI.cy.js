describe("Cart Functionality via API", () => {
  const apiUrl = Cypress.env("apiUrl");
  let token;
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  before(() => {
    // Connexion
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      token = response.body.token;
    });
  });

  it("add a product to the cart and check the cart contain", () => {
    //Ajouter le produit au panier via API
    cy.request({
      method: "PUT",
      url: `${apiUrl}/orders/add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        product: 8,
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    // Vérifier que le produit est bien ajouté au panier
    cy.request({
      method: "GET",
      url: `${apiUrl}/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const addedProduct = response.body.orderLines.find(
        (line) => line.product.id === 8
      );
      expect(addedProduct).to.exist;
      expect(addedProduct.quantity).to.eq(1);
    });
  });
});
