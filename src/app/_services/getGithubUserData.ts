import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";

import { GitRepoResponse, GitCommitResponse } from "~/types";

const myFetch = (url: string) => {
	fetch(url, {
		next: { revalidate: 3600 },
	});
};

export const getRepos = async (
	token: string | null,
	userName: string,
): Promise<OctokitResponse<GitRepoResponse>> => {
	const octokit = new Octokit({
		request: myFetch,
		auth: token,
	});

	const repos = await octokit.rest.search.repos({
		q: `user:${userName}`,
	});

	return repos;
};

export const getCommitsPerRepo = async (
	repoName: string,
	userName: string,
	token: string,
): Promise<OctokitResponse<GitCommitResponse>> => {
	const octokit = new Octokit({
		request: myFetch,
		auth: token,
	});

	const commits = await octokit.rest.repos.listCommits({
		owner: userName,
		repo: repoName,
		per_page: 100,
	});

	return commits;
};
