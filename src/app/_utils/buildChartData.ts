import { GitCommitResponse, GitRepoResponse, ChartData } from "~/types";
import { OctokitResponse } from "@octokit/types";
import { getCommitsPerRepo } from "../_services/getGithubUserData";

export const buildCommitData = async (
	data: OctokitResponse<GitRepoResponse>[],
	token: string,
) => {
	let commits: ChartData[] = [];

	const repos = Array.from(data);

	if (repos) {
		for (let i = 0; i < repos.length; i++) {
			const repo: GitRepoResponse = repos[i];
			const repoData = await getCommitsPerRepo(
				repo.name,
				repo.owner.login,
				token,
			);

			const numCommits = repoData.data.length;

			commits.push({
				name: repo.name,
				commit: numCommits,
				repo_url: repo.html_url,
				issues: repo.open_issues,
				watchers_count: repo.watchers_count,
				stargazers_count: repo.stargazers_count,
			});
		}
	} else {
		console.error("no data");
	}

	return commits;
};
