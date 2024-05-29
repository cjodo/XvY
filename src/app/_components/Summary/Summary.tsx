"use client";

import { useEffect, useState } from "react";
import { ChartData } from "~/types";

import { TopRepo } from "./TopRepo";

interface SummaryProps {
	data: ChartData[];
}
export const Summary = ({ data }: SummaryProps) => {
	const [topRepo, setTopRepo] = useState({});

	useEffect(() => {
		const topRepo = data.reduce((prev, curr) =>
			prev.commit > curr.commit ? prev : curr,
		);
		setTopRepo(topRepo);
	});

	return null;
};
