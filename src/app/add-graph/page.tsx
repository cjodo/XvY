import { db } from "~/server/db";

export default async function HomePage() {
  const graphs = await db.query.posts.findMany()

  console.log(graphs)

  return (
    <main className="flex flex-wrap gap-4 p-5">
      <h2>This is the Graph Page!!</h2>
    </main>
  );
}
