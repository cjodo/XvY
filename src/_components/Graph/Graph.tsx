import { BarChart } from "./BarChart";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { ClerkUserData, GithubUserData, CommitData} from "~/types";

import { hasGithubConnected } from "~/utils/hasGithubConnected";
import { getGithubUserData, getUserEvents, getRepos } from "~/utils/getGithubUserData";
import { buildCommitData } from "~/utils/buildChartData";

// eventually we'll be passing in the data to be rendered from github, not sure how to go about that yet
export const Graph = async () => {

	const user: ClerkUserData | null= await currentUser();

	if(!user) return (
	<p className="w-full text-center">Please 
			<SignInButton>
				<button className="bg-blue-500 hover:bg-blue-700 ml-2 text-white py-2 px-4 rounded">Sign In</button>
			</SignInButton>
		</p>
	)
	if(!hasGithubConnected(user)) return <p className="w-full text-center">Please Connect Your Github Account</p>

	const UserData: GithubUserData = await getGithubUserData(user)
	const userName = UserData.items[0].login

	const eventData = await getUserEvents(userName)
	const repos = await getRepos(userName)

	let commits:CommitData[] = []

	// TODO Handle rate limiting. add the gh auth key to db and use that ( optional )
	if(!repos.message) {
		commits = buildCommitData(repos)
	} else {
		console.log(repos)
		console.log("Rate limit hit")
	}

	return (
		<div className="flex w-full my-auto justify-center">
			<div className="flex flex-col text-center">
			<h2 className="mb-4 text-white">{userName}: Github Commits per repo</h2>
				<BarChart data={commits} />
			</div>

		</div>
	)
}
