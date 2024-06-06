import { BarChart } from "./BarChart";
import { Title } from "../Title/Title";
import { cookies } from "next/headers";

import { Summary } from "../Summary/Summary";
import { ChartData } from "~/types";

interface GraphProps {
	data: ChartData[];
	user: string;
}
export const Graph = async ({ data, user }: GraphProps) => {
	const cookieStore = cookies();
	const token = cookieStore.get("access_token")?.value;

	if (!token) return <p className="w-full text-center">No Token Found</p>;

	return (
		<div className="my-auto w-full justify-center">
			<Title>
				<div>
					<strong>{user}</strong> Dashboard
				</div>
			</Title>
			<div className="flex flex justify-center text-center">
				<Summary data={data} user={user} />
				<BarChart data={data} />
			</div>
		</div>
	);
};
