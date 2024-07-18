"use client";

import { useRouter } from "next/navigation";

import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { localPoint } from "@visx/event";

import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import { AxisBottom, TickLabelProps } from "@visx/axis";

import { ChartData, GraphMargin } from "~/types";
import { Colors } from "~/styles/colors";

import { useResizeLoad } from "~/app/_hooks/useResizeLoad";

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

export const BarChart = ({ data }: BarStackProps) => {
  const router = useRouter();

  const innerWidth = useResizeLoad();

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

  const handleToolTipMouseLeave = () => {
    tooltipTimeout = window.setTimeout(() => {
      hideTooltip();
    }, 300);
  };

  const margin = {
    top: 10,
    right: 20,
    bottom: 130,
    left: 20,
  };
  const width = Math.min(1000, innerWidth - 60);
  const height = 600;

  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: data.map((d) => d.name),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map((d) => d.commit))],
  });

  const XtickLabelProps: TickLabelProps<any> = () =>
    ({
      fill: "#ffffff",
      fontSize: 12,
      fontFamily: "sans-serif",
      textAnchor: "start",
      angle: 45,
    }) as const;

  return (
    innerWidth >= 10 && (
      <div style={{ position: "relative" }}>
        <svg ref={containerRef} width={width + 40} height={height}>
          <rect // Background
            x={0}
            y={0}
            width={width + 40}
            height={height}
            fill="#eeeeee33" // Background
            rx={10}
          />
          <Group>
            {data.map((d: ChartData) => (
              <Bar
                key={d.name}
                x={xScale(d.name) + margin.left} // Puts the bar in the middle of the tick
                y={yScale(d.commit)}
                height={height - margin.bottom - yScale(d.commit)}
                width={xScale.bandwidth()}
                fill={Colors.chart.blue}
                rx={5}
                className="bar"
                onMouseLeave={handleToolTipMouseLeave}
                onClick={() => {
                  const repo = d.name;
                  router.push(`/dashboard/${repo}`);
                }}
                onMouseMove={(event) => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const eventSvgCoords = localPoint(event);
                  const left = xScale(d.name) - margin.left;
                  showTooltip({
                    tooltipData: d,
                    tooltipTop: eventSvgCoords?.y,
                    tooltipLeft: left,
                  });
                }}
              />
            ))}
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
    )
  );
};
