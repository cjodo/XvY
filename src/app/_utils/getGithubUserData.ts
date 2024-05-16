export const getUserEvents = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/events`, { next: { revalidate: 3600 } })
	const events = await res.json()

	return events
}
export const getRepos = async (userName:string, withAuth:boolean, token: string) => {
	let headers = null
	if (withAuth) {
		headers = {"Authorization": `Bearer ${token}`}
	}

	const res = await fetch(`https://api.github.com/users/${userName}/repos?per_page=100&visibility=all`, {next: { revalidate: 3600 }, headers: {
		"Authorization": `Bearer ${token}`
	}})

	const commits = await res.json()
	console.log(commits)


	return commits
}

export const getCommitsPerRepo = async (
	repoName: string, 
	userName: string, 
	withAuth: boolean, 
	token: string) => {
		const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}/commits?author=${userName}&per_page=100&visibility=all`, 
			{ next: { revalidate: 60 },
				headers: {
				'Accept' : 'application/vnd.github.v3+json',
				"Authorization": `Bearer ${token}`,
				}
		})
	const commits = await res.json()
	console.log(commits)

	return commits
}


export const getGithubUserData = async (userName: string, withAuth:boolean, token: string) => {
	let headers = null

	if (withAuth) {
		headers = {"Authorization":  `Bearer ${token}` }
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
