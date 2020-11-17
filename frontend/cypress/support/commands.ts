
// @ts-check
///<reference path="./index.d.ts" />

Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add("getPaginatedList", () => {
    return cy.get("[data-cy=paginatedList]")
})

Cypress.Commands.add("login", (username, password) => {
    const log = Cypress.log({
        name: "login",
        displayName: "LOGIN",
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
    });

    cy.getBySel("signin-username").type(username);
    cy.getBySel("signin-password").type(password);
    cy.getBySel("signin-submit").click();
    return undefined;
});
Cypress.Commands.add("reactComponent", { prevSubject: "element" }, ($el) => {
    if ($el.length !== 1) {
        throw new Error(`cy.component() requires element of length 1 but got ${$el.length}`);
    }
    // Query for key starting with __reactInternalInstance$ for React v16.x
    //
    const key = Object.keys($el.get(0)).find((key) => key.startsWith("__reactFiber$"));

    // @ts-ignore
    const domFiber = $el.prop(key);

    Cypress.log({
        name: "component",
        consoleProps() {
            return {
                component: domFiber,
            };
        },
    });
})



// Fixes noIsolatedModules
export { };
