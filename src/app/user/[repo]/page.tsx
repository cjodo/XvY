import { cookies } from "next/headers";

export default function Dashboard({ params }: { params: { repo: string } }) {
  const cookieStore = cookies();
  const repoName = params.repo;

  const token = cookieStore.get("access_token");

  if (!token) {
    return new Error("No token found");
  }

  return (
    <>
      <div className="w-full text-center text-xl">{repoName}</div>
    </>
  );
}
