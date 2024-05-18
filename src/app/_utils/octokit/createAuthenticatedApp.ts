import { App } from "octokit"

export const createAuthenticatedApp = (appId: string, privateKey: string) => {
	const app = new App({ appId, privateKey })

	return app
}

