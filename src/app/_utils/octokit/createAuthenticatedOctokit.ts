import { Octokit } from "octokit"

export const createAuthenticatedOctokit = (token: ghToken) => {
	const octokit = new Octokit({
		auth: token
	})

	return octokit
}

