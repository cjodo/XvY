import { NextApiRequest } from "next"
import { NextResponse } from "next/server" 

export function GET (req: NextApiRequest, res: Response ) {
	const profile =  req.body

	return Response.json(profile)
}

