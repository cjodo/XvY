import { Octokit } from "octokit";
import { OctokitResponse, Endpoints } from "@octokit/types";

import { GitRepoResponse } from "~/types";

const myFetch = (url: string) => {
  fetch(url, {
    cache: "force-cache",
    next: { revalidate: 360 },
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
) => {
  const octokit = new Octokit({
    request: myFetch,
    auth: token,
  });

  const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
    owner: userName,
    repo: repoName,
  });

  return commits;
};

export const getPullsPerRepo = async (
  repo: string,
  owner: string,
  token: string,
) => {
  const octokit = new Octokit({
    request: myFetch,
    auth: token,
  });

  const pulls = await octokit.rest.pulls.list({
    state: "all",
    owner: owner,
    repo: repo,
  });

  return pulls.data;
};
