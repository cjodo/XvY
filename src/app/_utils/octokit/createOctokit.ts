import { Octokit } from "octokit"

export const createOctokit = () => {
	const octokit = new Octokit({})
	return octokit
}
