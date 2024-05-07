import { BarChart } from "./BarChart";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { ClerkUserData, GithubUserData, CommitData} from "~/types";

import { hasGithubConnected } from "~/utils/hasGithubConnected";
import { getGithubUserData, getRepos } from "~/utils/getGithubUserData";
import { buildCommitData } from "~/utils/buildChartData";

export const Graph = async () => {
	const user: ClerkUserData | null = await currentUser();

	if(!user) return (
		<p className="w-full text-center">Please 
			<SignInButton>
				<button className="bg-blue-500 hover:bg-blue-700 ml-2 text-white py-2 px-4 rounded">Sign In</button>
			</SignInButton>
		</p>
	)
	if(!hasGithubConnected(user)) return <p className="w-full text-center">Please Connect Your Github Account</p>

	const UserData: GithubUserData = await getGithubUserData(user)
	const userName = await UserData.items[0].login

	const repos = await getRepos(userName)

	let commits:CommitData[] = [];

	if(!repos.message) { // makes sure rate limit is not hit
		commits = buildCommitData(repos)
	} else {
		console.log(repos)
		console.log("Rate limit hit")
	}

	return (
		<div className="flex w-full my-auto justify-center">
			<div className="flex flex-col text-center">
				<h2 className="mb-4 text-white"><strong>{userName}</strong>: Commits Last 90 Days </h2>
				<BarChart data={commits} />
			</div>

		</div>
	)
}
