import { LanguageStatsWithColor } from "~/types";
import { Group } from "@visx/group";
import { BarStack } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { Languages } from "./Languages";

interface Percentage {
	lang: string;
	percentage: number;
}
const calculatePercentages = (languages: LanguageStatsWithColor) => {
	const totalBytes = languages["total"].bytes;
	const result: Percentage[] = [];
	if (!totalBytes) {
		return result;
	}

	Object.keys(languages).forEach((key) => {
		if (key !== "total") {
			const percentage = (languages[key]?.bytes / totalBytes) * 100;
			result.push({
				lang: key,
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

	const keys = Object.keys(languages).filter((key) => key !== "total");
	const totalBytes = languages["total"]?.bytes;
	const xMax = width - 20;
	const yMax = height - 10;

	if (!totalBytes) return <div>BAD</div>;

	return (
		<div>
			<svg width={200} height={100}>
				<Group>{}</Group>
			</svg>
		</div>
	);
};
