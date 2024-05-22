import * as GithubProvider from "next-auth/providers/github";

export const authOptions = {
	providers: [
		GithubProvider.default({
			clientId: process.env.GH_CLIENT_ID as string,
			clientSecret: process.env.GH_CLIENT_SECRET as string,
			authorization: {
				params: {
					scope: "repo",
				},
			},
		}),
	],
};
