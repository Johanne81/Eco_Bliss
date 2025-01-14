describe("API Tests method POST, Login", () => {
  const apiUrl = Cypress.env("apiUrl");
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  it("should return a 401 error for an unknown user", () => {
    // Se connecter avec des identifiants incorrects
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: "utilisateur_inconnu",
        password: "mot_de_passe_incorrect",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should return a 200 status for a known user", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

describe("API Tests method POST, Orders", () => {
  const apiUrl = Cypress.env("apiUrl");
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  // Ajouter un produit disponible dans le panier
  it("should add an available product to the cart", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      cy.request({
        method: "PUT", // ANOMALIE, un POST était attendu d'après Marie
        url: `${apiUrl}/orders/add`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          product: 6, // ID du produit
          quantity: 1,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  // Ajouter un produit en rupture de stock dans le panier
  it("should't add an out-of-stock product to the cart", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      cy.request({
        method: "PUT", // ANOMALIE, un POST était attendu d'après Marie
        url: `${apiUrl}/orders/add`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          product: 3, // ID du produit "Sentiments printanniers" en rupture
          quantity: 1,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect([400, 409]).to.include(response.status); // ANOMALIE, la réponse est 200, permet l'ajout d'un produit en rupture de stock
      });
    });
  });
});

describe("API Tests method POST, Reviews", () => {
  const apiUrl = Cypress.env("apiUrl");
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  // Ajouter un avis
  it("add a review from a logged-in user", () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/login`,
      body: {
        username: username,
        password: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;

      cy.request({
        method: "POST",
        url: `${apiUrl}/reviews`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title: "Dans la forêt",
          comment:
            "Savon très efficace, mais attention, il peut vraiment brûler la peau! 😂 ",
          rating: "3",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
