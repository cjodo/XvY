import { ClerkUserData } from '~/types'

export const getGithubUserData = async (user: ClerkUserData | null) => {
	const userName = user?.username

	const res = await fetch(`https://api.github.com/search/users?q=${userName}`)
	const data = res.json()
	return data
}
