import { Octokit } from "octokit"
import { ghToken } from "~/types"

export const createAuthenticatedOctokit = (token: ghToken) => {
	const octokit = new Octokit({
		auth: token
	})

	return octokit
}

