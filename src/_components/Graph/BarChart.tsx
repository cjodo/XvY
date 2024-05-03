'use client'

import React from 'react';

import { useUser } from "@clerk/nextjs"
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';

import { GitEvent } from '~/types';
import { buildCommitData } from '~/utils/buildChartData';

// We'll use some mock data from `@visx/mock-data` for this.

interface LineChartProps {
	data: GitEvent[]
}

export const BarChart = ({ data }: LineChartProps) => {
	
	// const data = letterFrequency;
	const commits = buildCommitData(data);
	
	// console.log(data)
	console.log(commits)
	// Define the graph dimensions and margins
	// const width = 500;
	// const height = 500;
	// const margin = { top: 20, bottom: 20, left: 20, right: 20 };
	//
	// // Then we'll create some bounds
	// const xMax = width - margin.left - margin.right;
	// const yMax = height - margin.top - margin.bottom;
	//
	// // We'll make some helpers to get at the data we want
	// const x = d => d.letter;
	// const y = d => +d.frequency * 100;
	//
	// // And then scale the graph by our data
	// const xScale = scaleBand({
	// 	range: [0, xMax],
	// 	round: true,
	// 	domain: data.map(x),
	// 	padding: 0.4,
	// });
	// const yScale = scaleLinear({
	// 	range: [yMax, 0],
	// 	round: true,
	// 	domain: [0, Math.max(...data.map(y))],
	// });
	//
	// // Compose together the scale and accessor functions to get point functions
	// const compose = (scale, accessor) => data => scale(accessor(data));
	// const xPoint = compose(xScale, x);
	// const yPoint = compose(yScale, y);

	const {isSignedIn, isLoaded } = useUser()


	if(!isLoaded) return <p className="w-full text-center">...Loading</p>

	return (
		<div></div>
	)
}

