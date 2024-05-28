declare namespace Cypress {
    interface Chainable {
        test(value:string): Chainable<Element>
    }
}