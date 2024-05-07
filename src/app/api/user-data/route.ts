import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

export default async function GET (res: NextApiResponse ) {
	const user = await currentUser();

	if(!user) {
		res.status(401).json({message: "Unauthorized"})
	}
	return new NextResponse(JSON.stringify({data: user}, {status: 200}))
}

