import 'whatwg-fetch';

describe("Create Quiz", () => {

    it("Can add songs, delete songs, choose title and genre and create quiz", () => {
        cy.login_testuser()

        //creates a new quiz with title fresh, genre pop and with Bad Romance by Lady Gaga
        cy.getBySel("create-quiz-btn").click();

        cy.getBySel("create-quiz-title").should("contain", "Create new quiz");

        cy.getBySel("quiz-title").type("Fresh");

        cy.getBySel("quiz-genres").click().getBySel("pop").click()

        //adds Secrets then removes it 
        cy.get("div[aria-label=Title]").click()
        cy.get("div[aria-label=Title]").click()

        const song1 = "human";
        const artist1 = "Christina Perri";

        const song2 = "Younger Now";
        const artist2 = "Miley Cyrus"

        cy.getBySel("paginated-list").contains(song1).click();

        cy.getBySel("paginated-list").contains(song2).click();

        cy.getBySel("quiz-songs").contains(song1);

        cy.getBySel("delete-" + song1).click();
        // cy.get("button[data-test=delete-#SELFIE]").click();

        cy.getBySel("quiz-songs").should("not.contain", song1);

        cy.getBySel("create-quiz").click();

        //checks that we are on mainpage again.
        cy.getBySel("mainpage-title").contains("Music Quiz");
        //checks that the paginated list contains the new quiz we created
        cy.getBySel("paginated-list").should("contain", "Fresh");

        cy.contains("Fresh").click()

        //Checks that the quiz details are correct
        cy.get("[data-test=quiz-details]").should("contain", "Fresh").and("contain", "pop").and("contain", "testuser1");

        cy.get("[data-test=quiz-songs]").should("contain", song2).and("contain", artist2);

    })


    // })

    // it("displays the quiz list View", () => {
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 0");
    // })

    // it("change page and change back", () => {
    //     cy.get('button[aria-label="Next page"]').click()
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 0").and("not.contain", "Test Quiz 18")

    //     cy.get('button[aria-label="Previous page"]').click()
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 18").and("not.contain", "Test Quiz 0");
    // })

    // it("search for title", () => {
    //     cy.getBySel("quiz-search").type("0")
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 10");
    // })

    // it("search for title with pagination", () => {
    //     cy.getBySel("quiz-search").type("1")
    //     cy.get('button[aria-label="Next page"]').click()
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 19")
    //     cy.get('button[aria-label="Previous page"]').click()
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 1")
    // })

    // it("filters on genres", () => {
    //     cy.get("input[name=classical]").click()
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 6");
    //     cy.get("input[name=pop]").click()
    //     cy.getBySel("paginated-list").should("contain", "Test Quiz 13")
    // })
});

export { };
