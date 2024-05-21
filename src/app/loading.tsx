import { SkeletonBarChart } from "./_components/Graph/LoadingGraph";

export default function Loading() {
  return (
    <main className="align-center min-h-[calc(100vh-76px-100px)] justify-center p-5">
      <div className="align-center w-full text-center">
        <SkeletonBarChart
          width={600}
          height={400}
          barHeight={300}
          numBars={20}
          borderRadius={5}
          barSpacing={10}
        />
      </div>
    </main>
  );
}
