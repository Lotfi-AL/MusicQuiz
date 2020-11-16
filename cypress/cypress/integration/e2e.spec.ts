describe("Should test creating quiz", () => {
    beforeEach(() => {
        const username = "testuser1";
        const password = "testuser1";
        cy.request({
            method: "POST",
            url: "http://backend:1337/api/signIn",
            body: {
                username,
                password,
            },
        }).then((response) => {
            console.log(response);
            localStorage.setItem("USER-TOKEN", response.body.token);
        });
        console.log(localStorage);
    });

    it("Should create a new quiz and post", () => {
        cy.visit("http://frontend:3000");
        cy.contains("Create Quiz").click();
        cy.wait(2000);
        cy.get("#quiztitle").type("All time best");
        cy.get("[data-cy=quizgenre]").click();
        cy.get('.MuiList-root > [tabindex="0"]').click();
        cy.get("[data-cy=SongSearch] > .MuiInputBase-root > .MuiInputBase-input").type("all");
        cy.get('[data-value="All Around The World (La La La)"]').click();
        cy.get("[data-cy=SongSearch] > .MuiInputBase-root > .MuiInputBase-input").clear().type("find");
        cy.get('[data-value="Find U Again (feat. Camila Cabello)"]').click();
        cy.get("[data-cy=SongSearch] > .MuiInputBase-root > .MuiInputBase-input").clear().type("da");
        cy.get('[data-value="Let Me Go (with Alesso, Florida Georgia Line & watt)"]').click();
        cy.get('[data-value="Boom Clap - From the Motion Picture Das Schicksal ist ein mieser Verr�ter"]').click();
        cy.get("[data-cy=quizsubmit] > .MuiButton-label").click();
        // cy.get('[data-cy=quizsubmit]').click()
        // cy.get("#quiztitle").type("All time Best");
        // cy.get('#demo-simple-select-filled').click();
        // cy.get('.MuiList-root > [tabindex="0"]').click();
        // cy.get('#SongSearch').type("all")
    });
});
