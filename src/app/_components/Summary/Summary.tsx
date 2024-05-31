import { cookies } from "next/headers";

import { ChartData } from "~/types";
import { Title } from "../Title/Title";
import { PieChart } from "../Graph/PieChart";
import { Languages } from "./Languages/Languages";

interface SummaryProps {
	data: ChartData[];
	user: string;
}

export const Summary = async ({ data, user }: SummaryProps) => {
	const topRepo = data.reduce((prev, curr) =>
		prev.commit > curr.commit ? prev : curr,
	);

	const cookieStore = cookies();
	const token = cookieStore.get("access_token")?.value as string;

	console.log(token);

	return (
		<div className="flex-col">
			<Title>
				<div className="mx-4 mb-2 rounded bg-[#eeeeee33]">
					<strong>Summary: </strong>
				</div>
			</Title>
			<PieChart data={topRepo} width={200} height={200} />
			<Languages user={user} data={data} token={token} />
		</div>
	);
};
