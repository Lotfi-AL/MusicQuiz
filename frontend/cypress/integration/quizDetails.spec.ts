describe("Detailed quiz", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.contains("Test Quiz 0").click();
    })

    it("Displays Quiz details", () => {
        cy.get("[data-cy=quizDetails]").should("contain", "Test Quiz 0").and("contain", "classical").and("contain", "testuser3");
    });

    it("Displays the quiz songs", () => {
        cy.get("[data-cy=quizSongs]").should("contain", "Kills You Slowly").and("contain", "The Chainsmokers").and("contain", "Nothing").and("contain", "Mark Ronson").and("contain", "No").and("contain", "DJ")
    });

});

export { };
