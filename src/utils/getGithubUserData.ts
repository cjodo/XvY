
export const getUserEvents = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/events`, { next: { revalidate: 3600 } })
	const events = await res.json()

	return events
}

export const getRepos = async (userName:string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/repos`, {next: { revalidate: 3600 }})
	const commits = await res.json()

	return commits
}
export const getCommitsPerRepo = async (repoName: string, userName: string) => {
	const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}/commits?author=${userName}`, { next: { revalidate: 3600 } })
	const commits = await res.json()

	return commits
}
