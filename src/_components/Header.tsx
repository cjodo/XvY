import Link from "next/link";
import { SignInButton, UserButton, SignedIn, SignedOut} from '@clerk/nextjs'


export function Header() {
  return (
    <header className="flex w-full bg-blue-900 p-6 text-xl shadow-md">
      <nav className="flex w-full justify-between text-violet-100">
        <div className="flex gap-5">
          <Link href={"/"}>Home</Link>
          <Link href={"/add-graph"}>Graphs</Link>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </nav>
    </header>
  );
}