Cypress.Commands.add("loginToGithub", (username: string, password: string) => {
  const log = Cypress.log({
    displayName: "GITHUB LOGIN",
    message: [`Authenticating ${username}`],
    autoEnd: false,
  });

  log.snapshot("before");

  loginViaGithub(username, password);

  log.snapshot("after");
  log.end();
});

const loginViaGithub = (username: string, password: string) => {
  cy.visit("http://localhost:3000");
  cy.get("button").click();
  cy.origin("https://github.com", { args: {username, password}}, ({ username, password }) => {
    cy.get("input#login_field").type(username);
    cy.get("input#password").type(password, { log: false });
    cy.get("input[type=submit]").click();
  });
};

console.log(Cypress.env().gh_username);

describe("finds", () => {
  it("element", () => {
    cy.loginToGithub(Cypress.env('env').gh_username, Cypress.env('env').gh_password)
  });
});
