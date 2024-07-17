import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import runtime from "~/lib/runtime";

export const POST = () => {
	return NextResponse.json({ status: 200 });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
	const url = new URL(req.url).searchParams;
	const code = url.get("code");

	let redirectURL = runtime;

	if (code) {
		const res = await fetch(
			`https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectURL}/api/auth/callback/github`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
				},
			},
		);

		const { access_token } = await res.json();
		if (access_token) {
			const octokit = new Octokit({
				auth: access_token,
			});

			const isAuthenticated = await octokit.rest.users.getAuthenticated();

			if (isAuthenticated.data.login) {
				let response = NextResponse.redirect(
					new URL("/dashboard", redirectURL),
					{
						status: 302,
					},
				);

				response.cookies.set("access_token", access_token);
				return response;
			} else {
				return NextResponse.json(
					{ error: "Failed to authenticate, please try again later" },
					{ status: 500 },
				);
			}
		}
	}
	return NextResponse.json({ status: 200 });
};
