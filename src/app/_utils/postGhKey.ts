export const postGhKey = async (key: string | null, username: string | null, exp: string | null ) => { 
	try {
		const res = await fetch(`/api/add-auth-key`, {
			method: "POST",
			body: JSON.stringify({
				key:key, 
				username: username,
				exp: exp,
			})
		})
		const json = await res.json()
		return json.message
	} catch (error) {
		console.error(error)
	}
}
