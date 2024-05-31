import { Octokit } from "octokit";
import { ChartData, LanguageStats, LanguageStatsWithColor } from "~/types";
import { languageColors } from "../_components/Summary/Languages/util";

export const getRepoLanguages = async (
  owner: string,
  repo: string,
  token: string,
): Promise<LanguageStats> => {
  const octokit = new Octokit({
    auth: token,
  });

  const languages = await octokit.rest.repos.listLanguages({
    owner: owner,
    repo: repo,
  });

  if (languages.status !== 200) {
    throw new Error(`Failed to fetch languages for repo: ${owner}/${repo}`);
  }

  return languages.data;
};

export const aggregateRepoLanguages = async (
  repos: ChartData[],
  owner: string,
  token: string,
): Promise<LanguageStatsWithColor> => {
  const aggregatedLanguages: LanguageStatsWithColor = { total: { bytes: 0 } };
  let totalBytes = 0;

  for (const repo of repos) {
    try {
      const languages = await getRepoLanguages(owner, repo.name, token);
      for (const [language, bytes] of Object.entries(languages)) {
        if (aggregatedLanguages[language]) {
          aggregatedLanguages[language].bytes += bytes;
          totalBytes += bytes;
        } else {
          aggregatedLanguages[language] = {
            bytes,
            color: languageColors[language] as string,
          };
        }
      }
    } catch (error) {
      console.error(
        `Error fetching languages for ${owner}/${repo.name}:`,
        error,
      );
    }
  }

  aggregatedLanguages["total"].bytes = totalBytes;

  return aggregatedLanguages;
};
