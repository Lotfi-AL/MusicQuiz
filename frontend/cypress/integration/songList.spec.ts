describe("Song list", () => {
    let songList = null;
    beforeEach(() => {
        cy.visit("/")
        cy.get("[data-cy=songTab]").click();
        cy.get("div[aria-label=Title]").click();
        songList = cy.get("[data-cy=paginatedList]")
    })


    it("displays the song list View", () => {
        songList.should("contain", "24K")
    })

    it("Can change page and change back", () => {
        cy.get('button[aria-label="Next page"]').click()
        cy.get("[data-cy=paginatedList]").should("contain", "Alive").and("not.contain", "24K")

        cy.get('button[aria-label="Previous page"]').click()
        cy.get("[data-cy=paginatedList]").should("contain", "24K").and("not.contain", "Alive");
    })

    it("search for title works", () => {
        cy.get("input[name=search]").type("Kills")
        cy.get("[data-cy=paginatedList]").should("contain", "Kills You Slowly");
    })

    it("search for title works with pagination", () => {
        cy.get("input[name=search]").type("K")
        // backAndForward("24K", "Bodak Yellow");
    })
    it("sorting on Artist works ", () => {
        cy.get('div[aria-label=Artist]').click()
        cy.get("[data-cy=paginatedList]").should("contain", "Train")
    })

    it("filter on duration works", () => {
        cy.get('span[data-index=1][role=slider]')

    })


});

export { };
