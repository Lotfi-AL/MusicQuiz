describe("Song list", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get("[data-cy=songTab]").click();
        cy.get("div[aria-label=Title]").click();
    })

    it("displays the song list View", () => {
        cy.getBySel("paginated-list").should("contain", "24K");
    })

    it("Can change page and change back", () => {
        cy.get('button[aria-label="Next page"]').click()
        cy.getBySel("paginated-list").should("contain", "Alive").and("not.contain", "24K")

        cy.get('button[aria-label="Previous page"]').click()
        cy.getBySel("paginated-list").should("contain", "24K").and("not.contain", "Alive");
    })

    it("search for title works", () => {
        cy.getBySel("song-search").type("Kills")
        cy.getBySel("paginated-list").should("contain", "Kills You Slowly");
    })

    it("search for title works with pagination", () => {
        cy.getBySel("song-search").type("K")
    })
    it("sorting on Artist works ", () => {
        cy.get('div[aria-label=Artist]').click()
        cy.getBySel("paginated-list").should("contain", "Train")
    })

});

export { };
