import { NextRequest, NextResponse } from "next/server";
import { octokit } from "~/lib/octokit";

export const POST = () => {
	return NextResponse.json({ status: 200 });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
	const url = new URL(req.url).searchParams;
	const code = url.get("code");

	let redirectURL;

	let env = process.env.NODE_ENV;

	if (env === "development") {
		redirectURL = "http://localhost:3000";
	} else if (env === "production") {
		redirectURL = "https://xv-y.vercel.app";
	}

	console.log(env);

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
		octokit.auth({
			auth: access_token,
		});

		const isAuthenticated = await octokit.rest.users.getAuthenticated();
		console.log("Auth: ", isAuthenticated.data.login);

		let response = NextResponse.redirect(new URL("/dashboard", redirectURL), {
			status: 302,
		});

		if (access_token) {
			response.cookies.set("access_token", access_token);
			return response;
		}
	}
	return NextResponse.json({ status: 200 });
};
