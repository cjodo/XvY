'use client'

import React, { useState } from 'react';

import { useUser } from "@clerk/nextjs"
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft, TickLabelProps } from '@visx/axis'

import { CommitData } from '~/types';

interface LineChartProps {
	data: CommitData[],
}

export const BarChart = ({ data }: LineChartProps) => {

	
	console.log(data)
	const { isLoaded } = useUser()


	const margin = {
		top: 10,
		right: 20,
		bottom: 130,
		left:60
	}

	const width = 800
	const height = 600

	const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: data.map(d => d.name),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map(d => d.amount))],
  });

	const tickLabelProps: TickLabelProps<any> = (tickValue, tickIndex) => 
		({
			fill: "#ffffff",
			fontSize: 12,
			fontFamily: "sans-serif",
			textAnchor: "start",
			angle: 45
		} as const)

	if(!isLoaded) return <p className="w-full text-center">...Loading</p>

	return (
			<svg width={width} height={height}>

				<Group>
					{data.map(d => (
							<Bar
								key={d.name}
								x={xScale(d.name)}
								y={yScale(d.amount)}
								height={height - margin.bottom - yScale(d.amount)}
								width={xScale.bandwidth()}
								fill="#CC5500"
							/>
					))}
				</Group>


				{/* X-axis */}
				<AxisBottom
					scale={xScale}
					top={height - margin.bottom}
					left={margin.left}
					tickLabelProps={tickLabelProps}
				/>

				{/* Y-axis */}
				<AxisLeft
					scale={yScale}
					top={margin.top}
					left={margin.left}
					label="Number of Commits"
				/>
			</svg>
	)
}

