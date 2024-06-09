import { GitRepoResponse, ChartData, PieSlice } from "~/types";
import { OctokitResponse } from "@octokit/types";
import {
	getContributorsPerRepo,
	getPullsPerRepo,
} from "../_services/getGithubUserData";

export const buildBarDataParallel = async (
	data: OctokitResponse<GitRepoResponse>[],
	token: string,
) => {
	let commits: ChartData[] = [];

	console.time("parallel");

	const repos = Array.from(data);

	if (repos && repos.length > 0) {
		const pullsThread = repos.map((repo) =>
			getPullsPerRepo(repo.name, repo.owner.login, token),
		);
		const contibutorsThread = repos.map((repo) =>
			getContributorsPerRepo(repo.name, repo.owner.login, token),
		);
		const pullsResult = await Promise.all(pullsThread);
		const contributorsResult = await Promise.all(contibutorsThread);

		commits = repos.map((repo, i) => {
			const pulls = pullsResult[i];
			const contributors = contributorsResult[i];
			const numCommits = contributors[0]?.contributions || 0;

			return {
				name: repo.name,
				commit: numCommits,
				repo_url: repo.html_url,
				issues: repo.open_issues,
				watchers_count: repo.watchers_count,
				stargazers_count: repo.stargazers_count,
				pull_requests: pulls?.length,
			};
		});
	}

	console.timeEnd("parallel");

	return commits;
};

export const buildBarData = async (
	data: OctokitResponse<GitRepoResponse>[],
	token: string,
) => {
	let commits: ChartData[] = [];

	const repos = Array.from(data);

	console.time("sequential");

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
			]);

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

	console.timeEnd("sequential");

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
