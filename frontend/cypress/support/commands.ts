
// @ts-check
///<reference path="./index.d.ts" />

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("login", (username, password) => {
    cy.getBySel("signin-username").type(username);
    cy.getBySel("signin-password").type(password);
    cy.getBySel("signin-submit").click();
    return undefined;
});

Cypress.Commands.add("login_testuser", () => {
    cy.visit("/signIn");

    cy.getBySel("signin-username").type("testuser1");
    cy.getBySel("signin-password").type("testuser1");
    cy.getBySel("signin-submit").click();
    return undefined;
})





// Fixes noIsolatedModules
export { };
