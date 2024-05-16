export const getUserEvents = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/events`, { next: { revalidate: 3600 } })
	const events = await res.json()

	return events
}
export const getRepos = async (userName:string, withAuth:boolean, token: string) => {
	let headers = null
	if (withAuth) {
		headers = {"Authentication": "Bearer ", token}
	}
	const res = await fetch(`https://api.github.com/users/${userName}/repos`, {next: { revalidate: 3600 }, headers: {...headers}})
	const commits = await res.json()

	return commits
}
export const getCommitsPerRepo = async (
	repoName: string, 
	userName: string, 
	useAuth: boolean, 
	token: string) => {
	let headers = null
	if (useAuth) {
		headers = {"Authentication":  "Bearer ", token}
	}
	const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}/commits?author=${userName}&per_page=100`, 
		{ next: { revalidate: 3600 },
			headers: {
				...headers
			}
	})
	const commits = await res.json()

	return commits
}
export const getGithubUserData = async (userName: string, withAuth:boolean, token: string) => {
	let headers = null

	if (withAuth) {
		headers = {"Authentication":  "Bearer ", token}
	}
	const res = await fetch(`https://api.github.com/search/users?q=${userName}`, 
		{ 
			next: {revalidate: 30}, 
			headers: {
				...headers
			} })
	const data = await res.json()
	return data
}
