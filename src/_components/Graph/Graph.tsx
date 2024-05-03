import { hasGithubConnected } from "~/utils/hasGithubConnected";
import { getGithubUserData } from "~/utils/getGithubUserData";

import { LineChart } from "./LineChart";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { ClerkUserData, GithubUserData } from "~/types";

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

	console.log(UserData.items[0].login)

	return (
		<div className="flex w-full my-auto justify-center">
			<div className="flex flex-col text-center">
			<h2 className="mb-4 text-white">{UserData.items[0].login}: Github Data</h2>
				<LineChart />
			</div>

		</div>
	)
}
