import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

export const GET = async (req: NextRequest, res: NextResponse) => {
	const token = req.cookies.get("access_token");
	const { searchParams } = new URL(req.url);

	const repoName = searchParams.get("repoName");
	const owner = searchParams.get("owner");
	console.log({ repoName, owner, token });
	if (!repoName || !owner || !token) {
		return NextResponse.json(
			{ error: "missing required params" },
			{ status: 400 },
		);
	}
	const octokit = new Octokit({
		auth: token.value,
	});

	try {
		const contributors = await octokit.rest.repos.listContributors({
			repo: repoName,
			owner: owner,
		});

		return NextResponse.json(contributors.data, { status: 200 });
	} catch (e) {
		return NextResponse.json({
			error: `Failed to fetch contibutor data for: ${repoName}`,
		});
	}
};
