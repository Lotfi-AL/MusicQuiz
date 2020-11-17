declare namespace Cypress {
    export interface Chainable {
        songListTitle(): Chainable<Element>;
        reactComponent(): Chainable<any>;
        login(username: string, password: string): void;
        getBySel(dataTestAttribute: string, args?: any): Chainable<Element>;
        getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<Element>;
    }
}
