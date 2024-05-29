"use client";

import { ChartData } from "~/types";
import { Title } from "../Title/Title";
import { PieChart } from "../Graph/PieChart";

interface SummaryProps {
	data: ChartData[];
}
export const Summary = ({ data }: SummaryProps) => {
	const topRepo = data.reduce((prev, curr) =>
		prev.commit > curr.commit ? prev : curr,
	);

	return (
		<div className="flex-col">
			<Title>
				<div className="mx-4 mb-2 rounded bg-[#eeeeee33]">
					<strong>Summary: </strong>
				</div>
			</Title>
			<PieChart data={topRepo} width={200} height={200} />;
		</div>
	);
};
