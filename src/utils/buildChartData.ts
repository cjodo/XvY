import { GitEvent } from "~/types"


const tallyCommitsPerRepo = (data: GitEvent[]): { repo: string; commits: number }[] => {
  const commitsPerRepo: { [repo: string]: number } = {};

  data.forEach(event => {
    if (event.type === "PushEvent") {
      const repoName = event.repo.name;
      commitsPerRepo[repoName] = (commitsPerRepo[repoName] || 0) + 1;
    }
  });

  return Object.entries(commitsPerRepo).map(([repo, commits]) => ({ repo, commits }));
};


export const buildCommitData = (data: GitEvent[]) => {
	return tallyCommitsPerRepo(data);
}
