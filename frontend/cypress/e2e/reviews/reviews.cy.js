const apiUrl = Cypress.env("apiUrl");
const username = Cypress.env("username");
const password = Cypress.env("password");

describe("User Reviews", () => {
  it("post a review without being logged in", () => {
    cy.request({
      method: "POST",
      url: apiUrl + "/reviews",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should not allow XSS script injection", () => {
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
          Authorization: "Bearer " + token,
        },
        body: {
          title: "test",
          comment: "<script>alert('XSS')</script>",
          rating: 4,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);

        // Vérifier que le script n'est pas éxécuté
        cy.visit("/reviews");
        cy.contains("<script>alert('XSS')</script>").should("not.exist");
      });
    });
  });
});
