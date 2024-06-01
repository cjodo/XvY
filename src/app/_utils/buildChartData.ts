import { GitRepoResponse, ChartData, PieSlice, Languages } from "~/types";
import { OctokitResponse } from "@octokit/types";
import {
	getContributorsPerRepo,
	getPullsPerRepo,
} from "../_services/getGithubUserData";

export const buildBarData = async (
	data: OctokitResponse<GitRepoResponse>[],
	token: string,
) => {
	let commits: ChartData[] = [];

	const repos = Array.from(data);

	if (repos) {
		for (let i = 0; i < repos.length; i++) {
			const repo: GitRepoResponse = repos[i];

			const repoName = repo.name;
			const owner = repo.owner.login;

			const pullsData = getPullsPerRepo(repoName, owner, token);
			const contributorsData = getContributorsPerRepo(repoName, owner, token);

			const [pulls, contributors] = await Promise.all([
				pullsData,
				contributorsData,
			]); // parallel

			const numCommits = contributors[0]?.contributions || 0; // will be an array of one value being the user contributions

			commits.push({
				name: repo.name,
				commit: numCommits,
				repo_url: repo.html_url,
				issues: repo.open_issues,
				watchers_count: repo.watchers_count,
				stargazers_count: repo.stargazers_count,
				pull_requests: pulls.length,
			});
		}
	} else {
		console.error("no data");
	}

	return commits;
};

export const buildPieData = (data: ChartData): PieSlice[] => {
	const slices: PieSlice[] = [];
	let keys = Object.keys(data);

	keys.map((key) => {
		if (key === "issues" || key === "pull_requests") {
			slices.push({
				label: key,
				amount: data[key] || 0,
			});
		}
	});

	return slices;
};
