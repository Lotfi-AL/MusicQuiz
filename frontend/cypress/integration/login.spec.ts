const username = "testuser";
const password = "testpassword";

describe("Login test", () => {
    it("Visits login page", () => {
        cy.visit("http://localhost:3000/signIn");

        cy.get("#username").type(username).should("have.value", username);

        cy.get("#password").type(password).should("have.value", password);
    });
});
