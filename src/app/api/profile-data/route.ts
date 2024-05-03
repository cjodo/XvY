import { NextApiRequest } from "next"


export function GET (req: NextApiRequest, res: Response ) {
		return Response.json({message: "unused"})
}

