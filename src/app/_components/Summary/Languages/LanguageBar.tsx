import { LanguageStatsWithColor } from "~/types";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear } from "@visx/scale";

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

	const yScale = scaleLinear<number>({
		range: [yMax, 0],
		domain: [0, 100],
	});

	let accumulatedPercentage = 0;
	//horizontal percentage barstack with only one bar
	return (
		<div>
			<svg width={200} height={100}>
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
							/>
						);
					})}
				</Group>
			</svg>
		</div>
	);
};
