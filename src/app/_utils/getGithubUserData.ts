export const getUserEvents = async (userName: string) => {

	const res = await fetch(`https://api.github.com/users/${userName}/events`, { next: { revalidate: 3600 } })
	const events = await res.json()

	return events
}

export const getRepos = async (userName:string | null, withAuth:boolean, token?: string | null) => {
	if (withAuth) {
		const res = await fetch(`https://api.github.com/search/repositories?q=user:${userName}`, {next: { revalidate: 60,}, 
			headers: {
				'Accept' : 'application/vnd.github.v3+json',
				"Authorization": `Bearer ${token}`
		}})

		const repos = await res.json()


		return repos
	} else {
		const res = await fetch(`https://api.github.com/search/repositories?q=user:${userName}&per_page=100`, {next: { revalidate: 60},
			headers: {
				'Accept' : 'application/vnd.github.v3+json',
			}
		})

		const repos = await res.json()


		return repos
	} 
}

export const getCommitsPerRepo = async (
	repoName: string, 
	userName: string, 
	withAuth: boolean, 
	token?: string | null) => {

	if(withAuth){
		const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}/commits?author=${userName}&per_page=100&visibility=all`, 
			{ next: { revalidate: 60 },
				headers: {
					'Accept' : 'application/vnd.github.v3+json',
					"Authorization": `Bearer ${token}`,
				}
		})

		const commits = await res.json()
		return commits

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
