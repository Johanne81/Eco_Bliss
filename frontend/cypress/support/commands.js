// Commande pour simplifier l'utilisation des sélecteurs data-cy
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

// Commande pour l'authentification via l'interface utilisateur
Cypress.Commands.add("loginViaUI", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");
  cy.visit("");
  cy.getBySel("nav-link-login").click();
  cy.getBySel("login-input-username").type(username);
  cy.getBySel("login-input-password").type(password);
  cy.getBySel("login-submit").click();
  cy.contains("Mon panier").should("be.visible");
});

// Commande pour l'authentification via requête API
Cypress.Commands.add("loginViaAPI", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: {
      email: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env("authToken", response.body.token); // Stocke le token dans les variables d'environnement
  });
});
