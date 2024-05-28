import { getRepos } from "~/app/_services/getGithubUserData";
import { BarChart } from "./BarChart";

import { buildCommitData } from "~/app/_utils/buildChartData";

import { ChartData } from "~/types";

interface GraphProps {
	token: string;
	user: string;
}
export const Graph = async ({ token, user }: GraphProps) => {
	if (!token) return <p className="w-full text-center">No Token Found</p>;

	const res = await getRepos(token, user);
	const repos = res.data.items;

	let commits: ChartData[] = [];

	try {
		// makes sure rate limit is not hit
		commits = await buildCommitData(repos, token);
	} catch (err) {
		console.error(err);
	}

	return (
		<div className="my-auto flex w-full justify-center">
			<div className="flex flex-col text-center">
				<h2 className="mb-4 text-white">
					<strong>{user}</strong>: Commits Last 90 Days{" "}
				</h2>
				<BarChart data={commits} />
			</div>
		</div>
	);
};
