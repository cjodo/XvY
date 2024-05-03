import { ClerkUserData } from '~/types'

export const getGithubUserData = async (user: ClerkUserData | null) => {
	const userName = user?.username

	const res = await fetch(`https://api.github.com/search/users?q=${userName}`)
	const data = res.json()
	return data
}

export const getUserEvents = async (userName: string) => {

	const res = await fetch(`https://api.github.com/users/${userName}/events`)
	const events = await res.json()

	return events
}

export const getRepos = async (userName:string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/repos`)
	const commits = await res.json()

	return commits
}
export const getCommitsPerRepo = async (repoName: string, userName: string) => {
	const res = await fetch(`	api.github.com/repos/${userName}/${repoName}/commits?author=${userName}`)

	const commits = await res.json()

	return commits
}
