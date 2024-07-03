import { faker } from "@faker-js/faker";

const fakeLastName = faker.person.lastName();
const fakeFirstName = faker.person.firstName();
const fakeEmail = faker.internet.email();
const fakePassword = faker.internet.password({ length: 20 });

const expectedMessage =
  "Merci de remplir correctement tous les champs (adresse email, mot de passe de 5 caractères minimum, confirmation identique)";

const username = Cypress.env("username");
const password = Cypress.env("password");

describe("Register new user", () => {
  it("new user with all fields ok", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("nav-link-cart")
      .should("be.visible")
      .should("contain", "Mon panier");
    cy.getBySel("nav-link-logout")
      .should("be.visible")
      .should("contain", "Déconnexion");
  });

  it("new user without lastname", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", expectedMessage);
  });

  it("new user without firstname", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", expectedMessage);
  });

  it("new user without correct email", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type("testFalseEmail");
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type(fakePassword);
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", expectedMessage);
  });

  it("new user with a bad password (4 characters) ", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type("test");
    cy.getBySel("register-input-password-confirm").type("test");
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", expectedMessage);
  });

  it("new user with a bad password confirmation", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(fakeEmail);
    cy.getBySel("register-input-password").type(fakePassword);
    cy.getBySel("register-input-password-confirm").type("badPassword");
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", expectedMessage);
  });

  it("existing user", () => {
    cy.visit("http://localhost:8080/#/register");
    cy.getBySel("register-input-lastname").type(fakeLastName);
    cy.getBySel("register-input-firstname").type(fakeFirstName);
    cy.getBySel("register-input-email").type(username);
    cy.getBySel("register-input-password").type(password);
    cy.getBySel("register-input-password-confirm").type(password);
    cy.getBySel("register-submit").click();
    cy.getBySel("register-errors")
      .should("be.visible")
      .should("contain", "Cette adresse mail est déjà utilisée"); // Faille de sécurité
  });
});
