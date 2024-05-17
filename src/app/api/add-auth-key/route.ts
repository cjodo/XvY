import { NextRequest, NextResponse } from "next/server"
import { db } from "~/server/db"
import { gh_auth_keys } from "~/server/db/schema"


export const GET = async (req:NextRequest) => {

		return NextResponse.json(
				{
						message: "Hello"
				}
		)
}

export const POST = async (req: NextRequest, res: NextResponse) => {

	const { key, username, exp } = await req.json()
	
	console.log("From route req: ", {key, username, exp})

	const insert = await db.insert(gh_auth_keys).values({key: key, owner: username, expires: exp, valid: null})

	console.log(insert)

	if(insert.rowCount > 0) {
		return NextResponse.json({
			message: "Success"
		})
	}

	return NextResponse.json({
		message: "Insert Failed"
	})
}
