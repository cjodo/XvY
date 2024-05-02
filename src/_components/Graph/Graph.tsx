'use client'

import { useState, useEffect } from "react"
import { LineChart } from "./LineChart";

interface GraphProps {
	data: string;
}

export const Graph = ({ data }: GraphProps) => {


	return (
		<div className="flex w-full justify-center gap-5">
			<LineChart />
		</div>
	)
}
