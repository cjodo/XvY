import { ClerkUserData } from "~/types"

export const hasGithubConnected = (user: ClerkUserData | null) => {
	return user?.externalAccounts.find((acc) => acc.provider === 'oauth_github') 
}
