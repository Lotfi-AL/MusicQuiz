describe("Detailed quiz", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.contains("Test Quiz 0").click();
    })

    it("Displays Quiz details", () => {
        cy.getBySel("quiz-details").should("contain", "Test Quiz 0").and("contain", "rnb").and("contain", "testuser2");
    });

    it("Displays the quiz songs", () => {
        cy.getBySel("quiz-songs").should("contain", "Kills You Slowly").and("contain", "The Chainsmokers").and("contain", "Nothing").and("contain", "Mark Ronson").and("contain", "No").and("contain", "DJ")
    });

});

export { };
