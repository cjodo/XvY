import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 3600;

export default async function HomePage() {
  const cookieStore = cookies();

  return (
    <main className="align-center min-h-[calc(100vh-76px-100px)] justify-center p-5"></main>
  );
}
