'use client'

import { LineChart } from "./LineChart";

interface GraphProps {
	data: string;
}

// eventually we'll be passing in the data to be rendered from github, not sure how to go about that yet
export const Graph = () => {
	return (
		<div className="flex w-full my-auto justify-center">
			<LineChart />
		</div>
	)
}
