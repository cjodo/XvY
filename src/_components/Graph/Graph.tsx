import { BarChart } from "./BarChart";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";

import { GitRepoData } from "~/types";

import { ClerkUserData, GithubUserData, CommitData} from "~/types";

import { hasGithubConnected } from "~/utils/hasGithubConnected";

export const getGithubUserData = async (user: ClerkUserData | null) => {
	const userName = user?.username

	const res = await fetch(`https://api.github.com/search/users?q=${userName}`, { next: {revalidate: 30} })
	const data = await res.json()
	return data
}
const getRepos = async (userName:string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/repos`, {next: { revalidate: 3600 }})
	const commits = await res.json()

	return commits
}

const getCommitsPerRepo = async (repoName: string, userName: string) => {
	const res = await fetch(`https://api.github.com/repos/${userName}/${repoName}/commits?author=${userName}`, { next: { revalidate: 3600 } })
	const commits = await res.json()

	return commits
}

export const buildCommitData = (data: GitRepoData[]) => {
	let commits:CommitData[] = []; 

	data.forEach(async (repo: GitRepoData) => {
		const repoData = await getCommitsPerRepo(repo.name, repo.owner.login)
		const amountOfCommits: number = repoData.length

	commits.push({
		name: repo.name, 
		amount: amountOfCommits, 
		repoURL: repo.html_url})
	})
	return commits
};

export const Graph = async () => {
	const user: ClerkUserData | null = await currentUser();
	const userData: GithubUserData = await getGithubUserData(user)

	if(!user) return (
		<p className="w-full text-center">Please 
			<SignInButton>
				<button className="bg-blue-500 hover:bg-blue-700 ml-2 text-white py-2 px-4 rounded">Sign In</button>
			</SignInButton>
		</p>
	)
	if(!hasGithubConnected(user)) return <p className="w-full text-center">Please Connect Your Github Account</p>

	const userName = userData.items[0].login

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
