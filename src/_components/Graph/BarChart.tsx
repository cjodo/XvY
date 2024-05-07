'use client'

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom, AxisLeft, TickLabelProps } from '@visx/axis'
import { useTooltip, useTooltipInPortal, defaultStyles } from '@visx/tooltip'
import { localPoint } from '@visx/event'


import { CommitData } from '~/types';

interface LineChartProps {
	data: CommitData[],
}

type TooltipData = {
	name: string,
	amount: number
}

const tooltipStyles = {
	...defaultStyles,
	minWidth: 60,
	backgroundColor: 'rgba(0,0,0,0.9)',
	color: 'white',
}

export const BarChart = ({ data }: LineChartProps) => {

	const { isLoaded } = useUser()
	const router = useRouter();

	const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip<TooltipData>()

	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		scroll: true
	})


	let tooltipTimeout: number

	const margin = {
		top: 10,
		right: 20,
		bottom: 130,
		left:20,
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

	const XtickLabelProps: TickLabelProps<any> = () => 
		({
			fill: "#ffffff",
			fontSize: 12,
			fontFamily: "sans-serif",
			textAnchor: "start",
			angle: 45
			} as const)
	
	if(!isLoaded){
		router.refresh()
		return <p className="w-full text-center">...Loading</p>
	} 

	return (
		<div style={{ position: 'relative' }}>
			<svg ref={containerRef} width={width} height={height}>

				<Group>
					{data.map((d: CommitData) => (
						<Bar
							key={d.name}
							x={(xScale(d.name) - margin.left ) - xScale.bandwidth() / 2} // Puts the bar in the middle of the tick
							y={yScale(d.amount)}
							height={height - margin.bottom - yScale(d.amount)}
							width={xScale.bandwidth()}
							fill="#cc5500"
							className='bar'

							onMouseLeave={() => {
								tooltipTimeout = window.setTimeout(() => {
									hideTooltip()
								}, 300)
							}}

							onMouseMove={(event) => {
								if(tooltipTimeout) clearTimeout(tooltipTimeout);
								const eventSvgCoords = localPoint(event);
								const left = xScale(d.name) - margin.left
								showTooltip({
									tooltipData: d,
									tooltipTop: eventSvgCoords?.y,
									tooltipLeft: left
								})
							}}

						/>
					))}
				</Group>


				{/* X-axis */}
				<AxisBottom
					scale={xScale}
					top={height - margin.bottom}
					left={margin.left}
					stroke='#ffffff'
					tickLabelProps={XtickLabelProps}
					tickStroke='#ffffff'
				/>

				{/* Y-axis */}
				<AxisLeft
					scale={yScale}
					top={margin.top}
					stroke='#ffffff'
					left={margin.left}
					label="Number of Commits"
					tickLabelProps={{fill:"#ffffff"}}
					tickStroke='#ffffff'
				/>
			</svg>
			{tooltipOpen && tooltipData && (
				<TooltipInPortal top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
					<div>
						<strong>Repo: {tooltipData.name}</strong>
					</div>
					<div>Commits: {tooltipData.amount}</div>
				</TooltipInPortal>
			)}
		</div>
	)
}

