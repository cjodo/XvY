import { NextResponse } from "next/server";
import { RequestData } from "next/dist/server/web/types";

export const POST = () => {
	return NextResponse.json({ status: 200 });
};

export const GET = async (req: RequestData) => {
	try {
		const url = new URL(req.url).searchParams;
		const code = url.get("code");

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

			if (access_token) {
				console.log(access_token);
				let response = NextResponse;

				response
					.json({
						message: "Login Successful",
						success: true,
					})
					.cookies.set("access_token", access_token, {
						httpOnly: false,
					});

				return response.redirect(new URL("/user", "http://localhost:3000"));
			} else {
				return NextResponse.json({ status: 404 });
			}
		}
		return NextResponse.json({ status: 500 });
	} catch (err) {
		console.error(err);
	}
};
