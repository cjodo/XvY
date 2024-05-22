import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

const myFetch = (url: string) => {
	fetch(url, {
		next: { revalidate: 3600 },
	});
};

const _octokit = new Octokit({
	request: myFetch,
});

export type GitRepoResponse = GetResponseDataTypeFromEndpointMethod<
	typeof _octokit.rest.search.repos
>;
export const getRepos = async (
	token: string | null,
	userName: string,
): Promise<OctokitResponse<GitRepoResponse>> => {
	// Disgust
	const octokit = new Octokit({
		request: myFetch,
		auth: token,
	});

	const repos = await octokit.rest.search.repos({
		q: `user:${userName}`,
	});

	return repos;
};

export type GitCommitResponse = GetResponseDataTypeFromEndpointMethod<
	typeof _octokit.rest.repos.listCommits
>;
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
