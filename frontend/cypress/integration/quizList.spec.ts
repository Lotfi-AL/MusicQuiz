describe("Quiz List", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get("[data-cy=quizTab]").click();
        cy.get("div[aria-label=Name]").click();
    })

    it("displays the quiz list View", () => {
        cy.getBySel("paginated-list").should("contain", "Test Quiz 0");
    })

});

export { };
