import { Graph } from "~/_components/Graph/Graph";
import { db } from "~/server/db";

export default async function HomePage() {
  const graphs = await db.query.posts.findMany()

  console.log(graphs)

  return (
    <main className="p-5 min-h-[calc(100vh-76px-100px)] justify-center align-center"> 
      <Graph />
    </main>
  );
}
