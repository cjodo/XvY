"use client";

import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import { Colors } from "~/styles/colors";
import { localPoint } from "@visx/event";
import { Text } from "@visx/text";

import { useTooltip, TooltipWithBounds } from "@visx/tooltip";

import { ChartData, PieSlice } from "~/types";
import { buildPieData } from "~/app/_utils/buildChartData";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };
const colors = Object.values(Colors.chart);

interface PieProps {
  data: ChartData;
  width: number;
  height: number;
  margin?: typeof defaultMargin;
}
export const PieChart = ({ data, width, height, margin }: PieProps) => {
  let slices = buildPieData(data);

  const { tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } =
    useTooltip<PieSlice>();

  const colorScale = scaleOrdinal({
    domain: slices.map((d) => d.label),
    range: colors,
  });

  return (
    <div style={{ position: "relative" }} className="mx-2 px-2">
      <svg width={width} height={height}>
        <rect // Background
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#eeeeee33" // Background
          rx={10}
        />
        <Group top={height / 2} left={width / 2}>
          <Pie
            data={slices}
            pieValue={(d) => d.amount}
            outerRadius={width / 2.2}
            innerRadius={50}
            padAngle={0.02}
          >
            {(pie) =>
              pie.arcs.map((arc) => (
                <g
                  key={arc.data.label}
                  onMouseMove={(event: MouseEvent) => {
                    const coords = localPoint(event) || { x: 0, y: 0 };
                    showTooltip({
                      tooltipData: arc.data,
                      tooltipLeft: coords.x,
                      tooltipTop: coords.y,
                    });
                  }}
                  onMouseLeave={() => hideTooltip()}
                >
                  <path
                    d={pie.path(arc) || undefined}
                    fill={colorScale(arc.data.label)}
                  />
                </g>
              ))
            }
          </Pie>
        </Group>
        <Text
          verticalAnchor="start"
          dx={width / 8}
          y={5}
          fill="#eeeeee"
          style={{ fontSize: 16, fontWeight: "bold" }}
        >
          {data.name}
        </Text>
      </svg>
      {tooltipData && (
        <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
          {tooltipData.label}: {tooltipData.amount}
        </TooltipWithBounds>
      )}
    </div>
  );
};
