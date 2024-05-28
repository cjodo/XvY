
declare namespace Cypress {
  interface Chainable {
    loginToGithub(username: string, password: string): Chainable<any>;
  }
}
