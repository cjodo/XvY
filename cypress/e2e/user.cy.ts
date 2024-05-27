describe("GHAuth", () => {
  beforeEach(function() {
    cy.loginToGithub(Cypress.env("gh_username"), Cypress.env("gh_password"));
  });
});

// describe("Navigation", () => {
//   // LOGIN
//   it("Navigate to a repo page", () => {
//     cy.visit("http://localhost:3000/user/REPO");
//
//     cy.get("h2").contains("REPO");
//   });
// });
