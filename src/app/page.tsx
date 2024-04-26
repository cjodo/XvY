import { db } from "~/server/db";

export default async function HomePage() {
  const graphs = await db.query.posts.findMany()

  console.log(graphs)

  return (
    <main className="flex flex-wrap gap-4 p-5">
      <h1 className="text-xl text-slate-50 w-1/4">Home Page!!</h1>
    </main>
  );
}
