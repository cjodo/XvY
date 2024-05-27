import { registerCommands } from "./auth-provider-commands/github"
registerCommands()

const username = CryptoKe
const username = Cypress.env("gh_username")

beforeEach(() => {
    cy.loginToGithub(username, Cypress.env('gh_password'))
    cy.log("Run before specs")
})