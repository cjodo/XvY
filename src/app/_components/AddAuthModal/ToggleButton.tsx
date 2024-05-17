'use client'

import { useState } from "react"

import { Modal } from "./Modal"

export const ToggleButton = () => {
	const [toggle, setToggle] = useState(false);

	const handleClick = () => {
		setToggle(!toggle)
	}

	return (
		<>

		<button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
			Add API Key
		</button>

			<div>{
				toggle && 
					<Modal 
					setToggle={setToggle}
			/>}</div>
		</>
	)
}

