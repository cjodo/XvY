import { cookies } from "next/headers";

export default function Dashboard({ params }: { params: { repo: string } }) {
  const cookieStore = cookies();
  const repoName = params.repo;

  const token = cookieStore.get("access_token");

  if (!token) {
    <h2>No Token Found Please Log In</h2>;
  }

  return (
    <>
      <h2 className="w-full text-center text-xl">{repoName}</h2>
    </>
  );
}
