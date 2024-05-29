import { Group } from "@visx/group";
import { RectClipPath } from "@visx/clip-path";
import { Bar } from "@visx/shape";
import { Colors } from "~/styles/colors";

import "./Loading.css";

interface SkeletonBarChartProps {
	width: number;
	height: number;
	numBars: number;
	barHeight: number;
	barSpacing: number;
	borderRadius: number;
}

export const SkeletonBarChart = ({
	width,
	height,
	numBars,
	barSpacing,
	borderRadius,
}: SkeletonBarChartProps) => {
	const barWidth = (width - (numBars - 1) * barSpacing) / numBars;

	const randomBarHeight = () => {
		return Math.floor(Math.random() * height);
	};

	return (
		<div className="my-auto flex w-full justify-center">
			<div className="flex flex-col text-center">
				<h2 className="mb-4 text-white">
					<strong>Loading....</strong>
				</h2>
				<svg width={width} height={height} className="barchart">
					<Group clipPath="url(#clip)">
						{Array.from({ length: numBars }).map((_, index) => (
							<Bar
								key={index}
								className="skeleton-bar"
								x={index * (barWidth + barSpacing)} // Puts the bar in the middle of the tick
								y={0}
								width={barWidth}
								height={randomBarHeight()}
								rx={borderRadius}
								fill={Colors.chart.blue}
							/>
						))}
					</Group>
					<RectClipPath id="clip" width={width} height={height} />
				</svg>
			</div>
		</div>
	);
};
