describe("Detailed quiz", () => {
    it("Displays genre information", () => {
        cy.visit("/");

        cy.contains("Role Playing Game").click();

        cy.get("#book-details")
            .should("contain", "Genres")
            .and("contain", "Fantasy");
    });

    it("Is not shown on page after click on X button", () => {
        cy.visit("/");

        cy.contains("Role Playing Game").click();

        cy.get("#book-details")
            .should("contain", "Genres")
            .should("contain", "Fantasy");

        cy.get("#close-book-details").click();

        cy.get("#book-details").should("not.exist");
    });

    it("Cannot display book list buttons on not authorized user", () => {
        cy.visit("/");

        cy.contains("Role Playing Game").click();

        cy.get("#favorite-button").should("not.exist");
    });
});

export { };
