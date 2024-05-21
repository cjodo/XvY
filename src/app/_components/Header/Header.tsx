import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { ToggleButton } from "../AddAuthModal/ToggleButton";

export function Header() {
  return (
    <header className="flex w-full p-6 text-xl shadow-md dark:bg-gray-800">
      <nav className="flex w-full justify-between text-violet-100">
        <div className="align-center flex gap-5">
          <Link className="py-2" href={"/"}>
            Home
          </Link>

          <SignedIn>
            <ToggleButton />
          </SignedIn>
        </div>

        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
