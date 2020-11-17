
import 'whatwg-fetch';

describe("User Sign-up and Login", function () {
    let userInfo: { username: string, password: string } = { username: "", password: "" };
    before(() => {
        userInfo = {
            username: "testuser-cypress4" + Math.random(),
            password: "testuser-cypress"
        };
    })
    it("should allow a visitor to sign-up, login, and logout", function () {
        // Sign-up User
        cy.visit("/");
        cy.getBySel("signin").click();
        cy.getBySel("signup").click()
        cy.getBySel("signup-title").should("be.visible").and("contain", "Register");
        cy.getBySel("signup-username").type(userInfo.username);
        cy.getBySel("signup-password").type(userInfo.password);
        cy.getBySel("signup-submit").click();

        //sign in user
        cy.getBySel("signin").click();
        cy.getBySel("signin-title").should("be.visible").and("contain", "Sign In");
        cy.login(userInfo.username, userInfo.password);

        //sign out user
        cy.getBySel("mainpage-title").should("be.visible").and("contain", "Music Quiz")
        cy.getBySel("signin").should("not.be.visible");
        cy.getBySel("signout").click();
        cy.getBySel("signin").should("be.visible");


    });
});