import { NextRequest, NextResponse } from "next/server";
import { RequestData } from "next/dist/server/web/types";

export const POST = () => {
	return NextResponse.json({ status: 200 });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
	const url = new URL(req.url).searchParams;
	const code = url.get("code");

	const resHeaders = new Headers(req.headers);
	const originURL = resHeaders.get("referer");

	if (!originURL) {
		throw new Error("Cannot determine origin");
	}

	if (code) {
		const res = await fetch(
			`https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${code}&redirect_uri=http://localhost/api/auth/callback/github`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
				},
			},
		);

		const { access_token } = await res.json();
		let response = NextResponse.redirect(new URL("user", originURL), {
			status: 302,
		});

		if (access_token) {
			response.cookies.set("access_token", access_token);
		}
		return response;
	}
	return NextResponse.json({ status: 200 });
};
