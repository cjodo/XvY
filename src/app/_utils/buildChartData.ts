import { GitRepoData, CommitData } from "~/types";
import { getCommitsPerRepo } from "./getGithubUserData";

export const buildCommitData = (data: GitRepoData[], withAuth: boolean, token:string) => {
	let commits:CommitData[] = []; 
	
	data.forEach(async (repo: GitRepoData) => {
		console.log(repo.name)
		const repoData = await getCommitsPerRepo(repo.name, repo.owner.login, withAuth, token)
		const amountOfCommits: number = repoData.length

		commits.push({
			name: repo.name, 
			amount: amountOfCommits, 
			repoURL: repo.html_url})
	})
	return commits
};
