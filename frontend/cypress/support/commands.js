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
