describe("API Tests", () => {
  it("should return 401 for accessing orders without authentication", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/orders`,
      failOnStatusCode: false, //Permet à la requête de réussir même si elle renvoie un code d'erreur
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});

describe("Authenticated API Tests", () => {
  // Avant chaque test, on s'authentifie pour obtenir le token
  before(() => {
    cy.loginViaAPI(); // Commande personnalisée pour s'authentifier
  });

  it("should return the list of products in the cart when authenticated", () => {});
});
