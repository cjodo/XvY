import { octokit } from "./lib/octokit";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";

export type GitRepoResponse = GetResponseTypeFromEndpointMethod<
	typeof _octokit.rest.search.repos
>;

export type GitCommitResponse = GetResponseTypeFromEndpointMethod<
	typeof _octokit.rest.repos.listCommits
>;

export interface ChartData {
	name: string;
	commit: number;
	repo_url: string;
	issues?: number;
	stargazers_count?: number;
	watchers_count?: number;
	pull_requests?: number;
}

export interface GraphMargin {
	top: number;
	right: number;
	bottom: number;
	left: number;
}
export interface PieSlice {
	label: string;
	amount: number;
}

export interface LanguageStats {
	[language: string]: number;
}

export interface LanguageStatsWithColor {
	[language: string]: {
		bytes: number;
		color?: string;
	};
}
