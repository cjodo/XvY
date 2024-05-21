import { createAuthenticatedOctokit } from "./octokit/createAuthenticatedOctokit"
import { createOctokit } from "./octokit/createOctokit"

import { getApiKey } from "./user/getApiKey"
import { env } from "~/env"

export const getUserEvents = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/events`, { next: { revalidate: 3600 } })
	const events = await res.json()

	return events
}

export const getRepos = async (userName:string, withAuth:boolean) => {

	if (withAuth) {
		const token = await getApiKey(userName)
		const octokit =	createAuthenticatedOctokit(token?.key)

		const repos = await octokit.rest.search.repos({
			q: `user:${userName}`
		})

		return repos
	} else {

		const octokit = createOctokit()

		const repos = await octokit.rest.repos.listForUser({
			username: userName
		})

		return repos.data
	} 
}

export const getCommitsPerRepo = async (
	repoName: string, 
	userName: string, 
	withAuth: boolean) => {

	if(withAuth){

		const token = await getApiKey(userName.toLowerCase())
		const octokit = createAuthenticatedOctokit(token?.key)
		const commits = await octokit.rest.repos.listCommits({
			owner: userName,
			repo: repoName,
			per_page: 100,
		})

		return commits.data
	} else {
		const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}/commits?author=${userName}&per_page=100`, 
			{ next: { revalidate: 60 },
				headers: {
					'Accept' : 'application/vnd.github.v3+json',
				}
		})
		const commits = await res.json()

		return commits
	}
}


export const getGithubUserData = async (
	userName: string, 
	withAuth:boolean, 
	token?: string) => {
	let headers = null

	if (withAuth) {
		headers = {"Authorization":  `Bearer ${token}` }
		const res = await fetch(`https://api.github.com/search/users?q=${userName}`, 
			{ 
				next: {revalidate: 30}, 
				headers: {
					'Accept' : 'application/vnd.github.v3+json',
					"Authorization":  `Bearer ${token}`,
		} })
		const data = await res.json()
		return data
	} else {
		headers = {"Authorization":  `Bearer ${token}` }
		const res = await fetch(`https://api.github.com/search/users?q=${userName}`, 
			{ 
				next: {revalidate: 30}, 
				headers: {
					'Accept' : 'application/vnd.github.v3+json',
					"Authorization":  `Bearer ${token}`,
		} })
		const data = await res.json()
		return data
	} 
}
