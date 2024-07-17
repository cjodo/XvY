import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { Octokit } from "octokit";
export const GET = async (req: NextRequest) => {
	const token = req.cookies.get("access_token")?.value;
	const octokit = new Octokit({
		auth: token,
	});

	const loginStatus = await octokit.rest.users.getAuthenticated();
	const user = loginStatus.data.login;

	const repoData = await octokit.rest.search.repos({
		q: `user:${user}`,
	});

	return NextResponse.json(repoData);
};
