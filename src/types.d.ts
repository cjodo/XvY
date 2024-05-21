import { User } from "@clerk/nextjs/server";

export type ghToken = string | null | undefined;

export interface GithubUserData {
	items: {
		[login: string];
	};
}

export interface GitEvent {
	id: string;
	type: "PushEvent" | "IssuesEvent" | "WatchEvent";
	actor: string;
	repo: {
		name: string;
	};
}

export interface GitRepoData {
	message?: string;
	id: string;
	name: string;
	full_name: string;
	owner: {
		login: string;
	};
	html_url: string;
}

export interface CommitData {
	name: string;
	amount: number;
	repoURL: string;
}

export { User as ClerkUserData };
