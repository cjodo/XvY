import { cookies } from "next/headers";
import { Octokit } from "octokit";

import { Graph } from "../_components/Graph/Graph";

export default async function Page() {
  const cookieStore = cookies();
  const userToken = cookieStore.get("access_token");

  if (!userToken) {
    return <p>No Token Found</p>;
  }

  const octokit = new Octokit({
    auth: userToken?.value,
  });

  let login;

  try {
    login = await octokit.rest.users.getAuthenticated();
    console.log(login);
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="align-center min-h-[calc(100vh-76px-100px)] justify-center p-5">
      <Graph
        key={login}
        token={userToken?.value}
        user={login.data.login}
      ></Graph>
    </main>
  );
}