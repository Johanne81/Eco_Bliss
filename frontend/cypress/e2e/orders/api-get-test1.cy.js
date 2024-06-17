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
