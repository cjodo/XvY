import { cookies } from "next/headers";
import { Octokit } from "octokit";
import { buildBarData } from "../_utils/buildChartData";
import { ChartData } from "~/types";
import runtime from "~/lib/runtime";

import Link from "next/link";
import { Graph } from "../_components/Graph/Graph";

export const maxDuration = 60;

export default async function User() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token").value;

  if (!token) {
    return <h2>No Token Found</h2>;
  }

  const octokit = new Octokit({
    auth: token,
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
        Api key no longer valid, please{" "}
        <Link href="/api/auth/signin">Create A New One</Link>
      </p>
    );
  }

  const user = login.data.login;

  const headers = new Headers();

  headers.set("access_token", token);
  const res = await fetch(`${runtime}/api/getUserData`, {
    method: "GET",
    headers: {
      Cookie: `access_token=${token}`,
    },
    credentials: "same-origin",
  });
  const repoData = await res.json();
  const repos = repoData.data.items;

  let commits: ChartData[] = [];

  try {
    commits = await buildBarData(repos, token);
  } catch (err) {
    console.error(err);
  }

  return (
    <main className="align-center min-h-[calc(100vh-76px-100px)] justify-center p-5">
      <Graph data={commits} user={user}></Graph>
    </main>
  );
}
