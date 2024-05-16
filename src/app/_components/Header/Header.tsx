import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut} from '@clerk/nextjs'

import { ToggleButton } from "../AddAuthModal/ToggleButton";


export function Header() {
  return (
    <header className="flex w-full dark:bg-gray-800 p-6 text-xl shadow-md">
      <nav className="flex w-full justify-between text-violet-100">

        <div className="flex align-center gap-5">
          <Link className="py-2" href={"/"}>Home</Link>
          <Link className="py-2" href={"/examples"}>Examples</Link>

          <SignedIn> 
            <ToggleButton />
          </SignedIn>
        </div>
        
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
