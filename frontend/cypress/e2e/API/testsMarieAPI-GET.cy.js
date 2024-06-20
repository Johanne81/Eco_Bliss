describe("API Tests method GET", () => {
  const apiUrl = Cypress.env("apiUrl");
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  it("should return 401 for accessing orders without authentication", () => {
    cy.request({
      method: "GET",
      url: `${apiUrl}/orders`,
      headers: {
        Authorization: "", // En-tête Authorization vide pour spécifier que l'utilisateur n'est pas connecté
      },
      failOnStatusCode: false, // Permet à la requête de réussir même si elle renvoie un code d'erreur
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should retrieve the list of products in the cart", () => {
    // Se connecte
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      const token = response.body.token;

      // Récupère le panier en cours chez l'utilisateur courant
      cy.request({
        method: "GET",
        url: `${apiUrl}/orders`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        // Vérifie que la réponse contient une liste de produits
        const orders = response.body.orderLines;
        expect(orders).to.be.an("array");
        expect(orders).to.have.length.greaterThan(0);

        // Vérifie les propriétés de chaque produit dans la liste
        orders.forEach((order) => {
          expect(order).to.have.property("id");
          expect(order).to.have.property("product");
          expect(order.product).to.have.property("id");
          expect(order.product).to.have.property("name");
          expect(order.product).to.have.property("description");
          expect(order.product).to.have.property("price");
          expect(order.product).to.have.property("picture");
          expect(order).to.have.property("quantity");
        });

        // Vérifie les propriétés d'un produit en particulier
        const expectedProduct = {
          id: 7,
          name: "Extrait de nature",
          description:
            "Ce savon est doux pour votre peau et convient à tous les types de peau. ",
          price: 5,
          picture:
            "https://cdn.pixabay.com/photo/2017/09/07/19/40/soap-2726378_960_720.jpg",
        };
        expect(response.body.orderLines[0].product).to.include(expectedProduct);
      });
    });
  });

  it("should return a specific product", () => {
    // Se connecte
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      const token = response.body.token;

      // Récupère le détail d'un produit
      cy.request({
        method: "GET",
        url: `${apiUrl}/products/5`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        // Vérifie que la réponse contient les propriétés du produit
        expect(response.body).to.have.property("id", 5);
        expect(response.body).to.have.property("name", "Poussière de lune");
        expect(response.body).to.have.property("availableStock", 23);
        expect(response.body).to.have.property("skin", "Peau grasse");
        expect(response.body).to.have.property("aromas", "Musc");
        expect(response.body).to.have.property(
          "ingredients",
          "Huiles végétales"
        );
        expect(response.body).to.have.property(
          "description",
          "Essayez notre savon aujourd'hui pour une expérience de bain rafraîchissante et revitalisante."
        );
        expect(response.body).to.have.property("price", 9.99);
        expect(response.body).to.have.property(
          "picture",
          "https://cdn.pixabay.com/photo/2016/07/11/15/45/soap-1509963_960_720.jpg"
        );
        expect(response.body).to.have.property("varieties", 6);
      });
    });
  });
});
