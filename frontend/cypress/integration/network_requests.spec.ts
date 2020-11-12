/// <reference types="cypress"/>

context("Network Requests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:1337/api");
    });

    it("cy.server() - control behaviour of network requests and responses", () => {
        cy.server().should((server) => {
            expect(server.delay).to.eq(0);
            expect(server.method).to.eq("GET");
            expect(server.status).to.eq(200);
            expect(server.headers).to.be.null;
            expect(server.response).to.be.null;
            expect(server.onRequest).to.be.undefined;
            expect(server.onResponse).to.be.undefined;
            expect(server.onAbort).to.be.undefined;

            expect(server.enable).to.be.true;

            expect(server.force404).to.be.false;
        });

        cy.server({
            method: "GET",
            delay: 1000,
            status: 422,
            response: {},
        });
    });
});
