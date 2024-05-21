import { Octokit } from "octokit"

export const createAuthenticatedApp = (appId: string, privateKey: string) => {
	const app = new Octokit({ 
		appId, privateKey 
	})

	return app
}

