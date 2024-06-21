const apiUrl = Cypress.env("apiUrl");
const username = Cypress.env("username");
const password = Cypress.env("password");

describe("Login via UI", () => {
  it("should connect with an existing user", () => {
    cy.loginViaUI();
  });
});
