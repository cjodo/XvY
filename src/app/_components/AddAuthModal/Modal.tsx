import React, { ReactEventHandler, useState } from "react"
import { useUser } from "@clerk/nextjs"
import "./modal.css"

interface ModalParams {
	toggle: boolean
	setToggle: (toggle: boolean) => void
}

export const Modal = ({toggle, setToggle}:ModalParams) => {
	const [key, setKey] = useState('')
	const { user, isSignedIn } = useUser()


	const close = () => { 
		console.log(toggle)
		setToggle(false)
	}

	const handleKeyChange = (e) => {
		setKey(e.target.value)
		console.log(key)
	}

	const submit = async (e:ReactEventHandler<HTMLFormElement>) => {
		e.preventDefault()

		if(!isSignedIn) {
			return
		}

		if(key.length === 0) {
			console.log("Invalid")
			const input: HTMLInputElement = e.target.elements["key"]
			input.classList.add("invalid:border-red-500")
			return
		}

		const username = user.username

		const res = await fetch(`/api/add-auth-key`, {
			method: "POST",
			body: JSON.stringify({key:key, username: username})
		})
		const json = await res.json()
		console.log(json)
	}

	return (
		<>
			<div onClick={close} className="overlay"></div>

			<div className="modal">
				<div className="text-gray-800 modalContent">
					<button onClick={close} 
						className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded absolute right-20" >
					Close
					</button>
					<h2 className="mb-5">Add Github Auth Key</h2>
					<p className="text-lg mb-4">
						generate a new token <a 
							href="https://github.com/settings/tokens"
							className="text-blue-600"
							>
							Here
						</a> 
					</p>
					<p className="text-xl mb-4">Click on <strong> Generate new token, </strong> Then choose <strong>classic</strong>.  The token must have repo scopes, it's up to you for expiration</p>
					<form onSubmit={submit}>

						<div>
							<label 
								className="block text-sm font-medium leading-6 text-gray-900">
							Api Token:
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input 
									onChange={handleKeyChange}
									type="text" 
									name="key" 
									id="key" 
									className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 " placeholder="" />
							</div>
						</div>

						<button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mt-5">Submit</button>
					</form>

				</div>
			</div>
			
		</>
	)
}
