import { cookies } from "next/headers";
import { Octokit } from "octokit";

import Link from "next/link";

import { Graph } from "../_components/Graph/Graph";

export default async function User() {
  const cookieStore = cookies();
  const userToken = cookieStore.get("access_token");

  console.log(userToken);

  if (!userToken) {
    return <h2>No Token Found</h2>;
  }

  const octokit = new Octokit({
    auth: userToken?.value,
  });

  let login;

  try {
    login = await octokit.rest.users.getAuthenticated();
  } catch (err) {
    console.error(err);
  }

  if (!login) {
    return (
      <p>
        Please <Link href="/api/auth/signin">Login</Link>
      </p>
    );
  }

  return (
    <main className="align-center min-h-[calc(100vh-76px-100px)] justify-center p-5">
      <Graph
        key={login.data.login}
        token={userToken?.value}
        user={login.data.login}
      ></Graph>
    </main>
  );
}
