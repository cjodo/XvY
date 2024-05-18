import { db } from "~/server/db";
import { gh_auth_keys } from "~/server/db/schema";
import { eq } from "drizzle-orm";


export const getApiKey = async (username: string) => {
	const token = await db.query.gh_auth_keys.findFirst({
		where: eq(gh_auth_keys.owner, username),
	})

	return token 
}


