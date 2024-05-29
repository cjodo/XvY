import { ChartData } from "~/types";
import { PieChart } from "../Graph/PieChart";

interface TopRepoProps {
  top: ChartData;
}
export const TopRepo = ({ top }: TopRepoProps) => {
  console.log("repo: ", top.name);
  return (
    <>
      <div>Top Repo: {top.name}</div>
      <PieChart data={top} width={200} height={200} />
    </>
  );
};
