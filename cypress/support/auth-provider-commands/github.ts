const loginViaGithub = (username: string, password: string) => {
	cy.origin("/", { args: { username, password } }, ({ username, password }) => {
		cy.get("button[type=submit]").click();
		cy.get("input#login_field").type(username);
		cy.get("input#password").type(password, { log: false });
		cy.contains("Sign In").click();
	});
	cy.url().should("equal", "http://localhost:3000/user");
};

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
