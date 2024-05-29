import { getRepos } from "~/app/_services/getGithubUserData";
import { BarChart } from "./BarChart";
import { Title } from "../Title/Title";

import { Summary } from "../Summary/Summary";

import { buildBarData } from "~/app/_utils/buildChartData";

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
		commits = await buildBarData(repos, token);
		console.log(commits);
	} catch (err) {
		console.error(err);
	}

	return (
		<div className="my-auto w-full justify-center">
			<Title>
				<div>
					<strong>{user}</strong> Dashboard
				</div>
			</Title>
			<div className="flex flex justify-center text-center">
				<Summary data={commits} />
				<BarChart data={commits} />
			</div>
		</div>
	);
};
