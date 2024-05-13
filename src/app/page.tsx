import { Graph } from "./_components/Graph/Graph";

export const revalidate = 3600;

export default async function HomePage() {

  return (
    <main className="p-5 min-h-[calc(100vh-76px-100px)] justify-center align-center"> 
      <Graph />
    </main>
  );
}
