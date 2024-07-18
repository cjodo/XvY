"use client";

import { LanguageStatsWithColor } from "~/types";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear } from "@visx/scale";

import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";

import { languageColors } from "./util";

interface Percentage {
	lang: string;
	percentage: number;
}
const calculatePercentages = (languages: LanguageStatsWithColor) => {
	const result: Percentage[] = [];

	let totalBytes = 0;

	Object.keys(languages).forEach((lang) => {
		totalBytes += languages[lang]?.bytes;
	});

	Object.keys(languages).forEach((lang) => {
		const percentage = (languages[lang]?.bytes / totalBytes) * 100;
		if (percentage > 0) {
			result.push({
				lang: lang,
				percentage: Math.round(percentage),
			});
		}
	});

	return result;
};

interface LanguageBarProps {
	languages: LanguageStatsWithColor;
}
export const LanguageBar = ({ languages }: LanguageBarProps) => {
	//hardcoded for now
	const width = 200;
	const height = 100;

	const percentages: Percentage[] = calculatePercentages(languages);

	console.log(percentages, "percentages");

	const keys = Object.keys(languages);

	const xMax = width - 20;
	const yMax = height - 10;

	const xScale = scaleLinear<number>({
		range: [0, xMax],
		domain: [0, 100],
	});

	const { containerRef, TooltipInPortal } = useTooltipInPortal({
		scroll: true,
	});

	const {
		tooltipOpen,
		tooltipLeft,
		tooltipTop,
		tooltipData,
		hideTooltip,
		showTooltip,
	} = useTooltip<Percentage>();

	const tooltipStyles = {
		...defaultStyles,
		minWidth: 60,
		backgroundColor: "rgba(0,0,0,0.7)",
		color: "white",
	};

	let tooltipTimeout: number;

	const handleMouseLeave = () => {
		tooltipTimeout = window.setTimeout(() => {
			hideTooltip();
		}, 300);
	};

	let accumulatedPercentage = 0;
	//horizontal percentage barstack with only one bar
	return (
		<div>
			<svg ref={containerRef} width={200} height={100}>
				<Group left={20}>
					{percentages.map((d, i) => {
						const barWidth = xScale(d.percentage);
						const barX = xScale(accumulatedPercentage);
						accumulatedPercentage += d.percentage;
						return (
							<Bar
								key={i}
								x={barX}
								y={yMax - 20}
								width={barWidth}
								height={20}
								fill={languageColors[d.lang]}
								onMouseLeave={handleMouseLeave}
								onMouseMove={(event) => {
									if (tooltipTimeout) clearTimeout(tooltipTimeout);
									const eventSvgCoords = localPoint(event);
									const left = eventSvgCoords?.x;
									showTooltip({
										tooltipData: d,
										tooltipTop: eventSvgCoords?.y,
										tooltipLeft: left,
									});
								}}
							/>
						);
					})}
				</Group>
			</svg>
			{tooltipOpen && tooltipData && (
				<TooltipInPortal
					top={tooltipTop}
					left={tooltipLeft}
					style={tooltipStyles}
				>
					<div>
						<strong>{tooltipData.lang}</strong>
					</div>
					<div>
						<strong>{tooltipData.percentage}%</strong>
					</div>
				</TooltipInPortal>
			)}
		</div>
	);
};
