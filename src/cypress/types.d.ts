declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginToGithub(username: string, password: string): Chainable<any>;
  }
}
