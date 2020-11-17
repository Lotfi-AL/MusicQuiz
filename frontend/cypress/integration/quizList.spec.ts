describe("Quiz List", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get("[data-test=quiz-tab]").click();
    })

    it("displays the quiz list View", () => {
        cy.getBySel("paginated-list").should("contain", "Test Quiz 0");
    })

    it("change page and change back", () => {
        cy.get('button[aria-label="Next page"]').click()
        cy.getBySel("paginated-list").should("contain", "Test Quiz 0").and("not.contain", "Test Quiz 18")

        cy.get('button[aria-label="Previous page"]').click()
        cy.getBySel("paginated-list").should("contain", "Test Quiz 18").and("not.contain", "Test Quiz 0");
    })

    it("search for title", () => {
        cy.getBySel("quiz-search").type("0")
        cy.getBySel("paginated-list").should("contain", "Test Quiz 10");
    })

    it("search for title with pagination", () => {
        cy.getBySel("quiz-search").type("1")
        cy.get('button[aria-label="Next page"]').click()
        cy.getBySel("paginated-list").should("contain", "Test Quiz 19")
        cy.get('button[aria-label="Previous page"]').click()
        cy.getBySel("paginated-list").should("contain", "Test Quiz 1")
    })

    it("filters on genres", () => {
        cy.get("input[name=classical]").click()
        cy.getBySel("paginated-list").should("contain", "Test Quiz 6");
        cy.get("input[name=pop]").click()
        cy.getBySel("paginated-list").should("contain", "Test Quiz 15")
    })
});

export { };
