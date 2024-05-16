'use client'

import { db } from "~/server/db"
import { ClerkUserData } from "~/types"
import { useCallback, useState } from "react"

import { Modal } from "./Modal"

interface ModalParams {
		user: ClerkUserData
}

export const ToggleButton = () => {
	const [toggle, setToggle] = useState(false);

	const handleClick = () => {
		setToggle(!toggle)
	}

	return (
		<>

		<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
			Add Auth Key
		</button>

			<div>{
				toggle && 
					<Modal 
					toggle={toggle}
					setToggle={setToggle}
			/>}</div>
		</>
	)
}

