import Link from "next/link";

export function Header() {
  return (
    <header className="flex w-full p-6 text-xl shadow-md dark:bg-gray-800">
      <nav className="flex w-full justify-between text-violet-100">
        <div className="align-center flex gap-5">
          <Link className="py-2" href={"/"}>
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
}
