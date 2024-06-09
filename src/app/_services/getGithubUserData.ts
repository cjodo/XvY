import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";
import runtime from "~/lib/runtime";

import { GitRepoResponse } from "~/types";

const myFetch = (url: string) => {
  fetch(url, {
    cache: "force-cache",
    headers: {
      "Cache-Control": "public max-age=3600",
    },
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

export const getContributorsPerRepo = async (
  repo: string,
  owner: string,
  token: string,
) => {
  const res = await fetch(
    `${runtime}/api/getContributorsPerRepo?repoName=${repo}&owner=${owner}`,
    {
      headers: {
        Cookie: `access_token=${token}`,
      },
      next: { revalidate: 3600 },
    },
  );

  const contributors = await res.json();

  return contributors;
};

export const getPullsPerRepo = async (
  repo: string,
  owner: string,
  token: string,
) => {
  const res = await fetch(
    `${runtime}/api/getPullsPerRepo?repoName=${repo}&owner=${owner}`,
    {
      headers: {
        Cookie: `access_token=${token}`,
      },
      next: { revalidate: 3600 },
    },
  );

  const pulls = await res.json();

  return pulls;
};
