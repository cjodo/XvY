import Link from "next/link";
import { LoginButton } from "../Login/LoginButton";

export function Header() {
  return (
    <header className="flex w-full bg-gray-800 p-6 text-xl shadow-md">
      <nav className="flex w-full justify-between text-violet-100">
        <div className="align-center flex gap-5">
          <Link className="py-2" href={"/"}>
            Home
          </Link>
        </div>
        <LoginButton />
      </nav>
    </header>
  );
}
