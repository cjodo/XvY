import Link from "next/link";

export const LoginButton = () => {
	return (
		<Link
			href={"/api/auth/signin"}
			className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
		>
			Login
		</Link>
	);
};
