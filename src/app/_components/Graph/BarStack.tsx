"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { localPoint } from "@visx/event";

import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { AxisBottom, TickLabelProps } from "@visx/axis";

import { ChartData, GraphMargin } from "~/types";

interface BarStackProps {
	data: ChartData[];
	width: number;
	height: number;
	margin: GraphMargin;
}

const tooltipStyles = {
	...defaultStyles,
	minWidth: 60,
	backgroundColor: "rgba(0,0,0,0.7)",
	color: "white",
};

const blue = "#3498db";
const orange = "#e67e22";
const green = "#27ae60";

const background = "#eeeeee33";

const keys = ["commit", "issues", "pr"];
const colors = [blue, orange, green];

const colorScale = scaleOrdinal<string, string>({
	domain: keys,
	range: colors,
});

export const BarStack = ({ data }: BarStackProps) => {
	const [innerWidth, setInnerwidth] = useState(0);

	const router = useRouter();

	useEffect(() => {
		// window is not defined until component mounts
		setInnerwidth((prev) => (prev = window.innerWidth));
	}, [window.innerWidth]);

	const {
		tooltipOpen,
		tooltipLeft,
		tooltipTop,
		tooltipData,
		hideTooltip,
		showTooltip,
	} = useTooltip<ChartData>();

	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		scroll: true,
	});

	let tooltipTimeout: number;

	const margin = {
		top: 10,
		right: 20,
		bottom: 130,
		left: 20,
	};
	const width = Math.min(800, innerWidth - 40);
	const height = 600;

	const xMax = width;
	const yMax = height - margin.top;

	const xScale = scaleBand<string>({
		domain: data.map((d) => d.name),
		padding: 0.2,
	});

	const yScale = scaleLinear({
		domain: [
			0,
			Math.max(
				...data.map(
					(d) => d.commit + (d.issues ?? 0) + (d.stargazers_count ?? 0),
				),
			),
		],
		nice: true,
	});

	xScale.rangeRound([0, xMax]);
	yScale.range([yMax, 0]);

	const XtickLabelProps: TickLabelProps<any> = () =>
		({
			fill: "#ffffff",
			fontSize: 12,
			fontFamily: "sans-serif",
			textAnchor: "start",
			angle: 45,
		}) as const;

	return width < 10 ? null : (
		<div style={{ position: "relative" }}>
			<svg ref={containerRef} width={width + 40} height={height}>
				<rect // Background
					x={0}
					y={0}
					width={width + 40}
					height={height}
					fill={background}
					rx={15}
				/>
				<Group top={margin.top}>
					<BarStack<string, string>
						data={data}
						keys={keys}
						x={(d) => d.name}
						xScale={xScale}
						yScale={yScale}
						color={colorScale}
					>
						{(barStacks) =>
							barStacks.map((barStack) =>
								barStack.bars.map((bar) => (
									<rect
										key={`bar-stack-${barStack.index}-${bar.index}`}
										x={bar.x}
										y={bar.y}
										height={bar.height}
										width={bar.width}
										fill={bar.color}
										onClick={() => {
											console.log("Click");
										}}
										onMouseLeave={() => {
											tooltipTimeout = window.setTimeout(() => {
												hideTooltip();
											}, 300);
										}}
										onMouseMove={(event) => {
											if (tooltipTimeout) clearTimeout(tooltipTimeout);
											// TooltipInPortal expects coordinates to be relative to containerRef
											// localPoint returns coordinates relative to the nearest SVG, which
											// is what containerRef is set to in this example.
											const eventSvgCoords = localPoint(event);
											const left = bar.x + bar.width / 2;
											showTooltip({
												tooltipData: bar,
												tooltipTop: eventSvgCoords?.y,
												tooltipLeft: left,
											});
										}}
									/>
								)),
							)
						}
					</BarStack>
				</Group>
				{/* X-axis */}
				<AxisBottom
					numTicks={xScale.bandwidth()}
					scale={xScale}
					top={height - margin.bottom}
					left={margin.left}
					stroke="#ffffff"
					tickLabelProps={XtickLabelProps}
					tickStroke="#ffffff"
				/>
			</svg>
			{tooltipOpen && tooltipData && (
				<TooltipInPortal
					top={tooltipTop}
					left={tooltipLeft}
					style={tooltipStyles}
				>
					<div>
						<strong>{tooltipData.name}</strong>
					</div>
					<div>Commits: {tooltipData.commit}</div>
					<div>Issues: {tooltipData.issues}</div>
				</TooltipInPortal>
			)}
		</div>
	);
};
