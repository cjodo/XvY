import { env } from "~/env"
const jwt = require('jsonwebtoken')

export const generateJWT = () => {
	const now = new Date().getTime() / 1000
	const pem = env.PEM
	const alg = "RS256"

	const claims = {
		iat: now - 60,
		exp: now + 3600,
		alg: alg,
		iss: env.GH_CLIENT_ID
	}

	return jwt.sign(claims, pem, { algorithm: "RS256" } )
}

