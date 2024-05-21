import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";
import { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";

import { getApiKey } from "../_utils/user/getApiKey";

const myFetch = (url: string) => {
	fetch(url, {
		next: { revalidate: 3600 },
	});
};

const _octokit = new Octokit({
	request: myFetch,
});

export const getUserEvents = async (userName: string) => {
	const res = await fetch(`https://api.github.com/users/${userName}/events`, {
		next: { revalidate: 3600 },
	});
	const events = await res.json();

	return events;
};

export type GitRepoResponse = GetResponseDataTypeFromEndpointMethod<
	typeof _octokit.rest.search.repos
>;
export const getRepos = async (
	userName: string,
	withAuth: boolean,
): Promise<OctokitResponse<GitRepoResponse>> => {
	// Disgust
	if (withAuth) {
		const auth = await getApiKey(userName);
		const octokit = new Octokit({
			request: myFetch,
			auth: auth?.key,
		});

		const repos = await octokit.rest.search.repos({
			q: `user:${userName}`,
		});
		return repos;
	} else {
		const repos = await _octokit.rest.search.repos({
			q: `user:${userName}`,
		});
		return repos;
	}
};

export type GitCommitResponse = GetResponseDataTypeFromEndpointMethod<
	typeof _octokit.rest.repos.listCommits
>;
export const getCommitsPerRepo = async (
	repoName: string,
	userName: string,
	withAuth: boolean,
): Promise<OctokitResponse<GitCommitResponse>> => {
	if (withAuth) {
		const token = await getApiKey(userName.toLowerCase());
		const octokit = new Octokit({
			request: myFetch,
			auth: token?.key,
		});

		const commits = await octokit.rest.repos.listCommits({
			owner: userName,
			repo: repoName,
			per_page: 100,
		});

		return commits;
	} else {
		const commits = _octokit.rest.repos.listCommits({
			owner: userName,
			repo: repoName,
			per_page: 100,
		});

		return commits;
	}
};

export const getGithubUserData = async (
	userName: string,
	withAuth: boolean,
	token?: string,
) => {
	let headers = null;

	if (withAuth) {
		headers = { Authorization: `Bearer ${token}` };
		const res = await fetch(
			`https://api.github.com/search/users?q=${userName}`,
			{
				next: { revalidate: 30 },
				headers: {
					Accept: "application/vnd.github.v3+json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const data = await res.json();
		return data;
	} else {
		headers = { Authorization: `Bearer ${token}` };
		const res = await fetch(
			`https://api.github.com/search/users?q=${userName}`,
			{
				next: { revalidate: 30 },
				headers: {
					Accept: "application/vnd.github.v3+json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const data = await res.json();
		return data;
	}
};
