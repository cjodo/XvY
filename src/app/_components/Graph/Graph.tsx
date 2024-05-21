import { BarChart } from "./BarChart";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { ClerkUserData, CommitData } from "~/types";

import { hasGithubConnected } from "../../_utils/hasGithubConnected";
import { getRepos } from "~/app/_services/getGithubUserData";

import { buildCommitData } from "~/app/_utils/buildChartData";
import { getApiKey } from "~/app/_utils/user/getApiKey";

interface GraphProps {
	withAuth: boolean;
	passedUsername?: string;
}

export const Graph = async ({ withAuth }: GraphProps) => {
	const user: ClerkUserData | null = await currentUser();

	if (!user)
		return (
			<p className="w-full text-center">
				Please
				<SignInButton>
					<button className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
						Sign In
					</button>
				</SignInButton>
			</p>
		);
	if (!hasGithubConnected(user)) {
		return (
			<div>
				<p className="w-full text-center">Please Connect Your Github Account</p>
			</div>
		);
	}

	const username = user?.username;

	const token = await getApiKey(username);

	const res = await getRepos(username, withAuth, token?.key);
	const repos = res.data.items;

	let commits: CommitData[] = [];

	try {
		// makes sure rate limit is not hit
		commits = await buildCommitData(repos, withAuth, token?.key);
	} catch (err) {
		console.log("Rate limit hit");
		console.log(repos);
	}

	return (
		<div className="my-auto flex w-full justify-center">
			<div className="flex flex-col text-center">
				<h2 className="mb-4 text-white">
					<strong>{username}</strong>: Commits Last 90 Days{" "}
				</h2>
				<BarChart data={commits} />
			</div>
		</div>
	);
};
