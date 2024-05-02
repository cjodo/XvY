import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"

export const LineChart = () => {
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(true)

	const {isSignedIn, isLoaded, user } = useUser()
	
	const hasGithubConnected = () => {
		return user?.externalAccounts.find((acc) => acc.provider === 'github') 
	}

	if(!isLoaded) return <p>...Loading</p>
	if(!isSignedIn) return <p>Please Sign In</p>

	if(!hasGithubConnected()) return <p>Please Connect Your Github Account</p>
	

	return (
		<div>{user?.username}</div>
	)
}

