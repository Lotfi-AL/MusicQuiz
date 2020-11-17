declare namespace Cypress {
    export interface Chainable {
        login_testuser(): void;
        login(username: string, password: string): void;
        getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;
    }
}
