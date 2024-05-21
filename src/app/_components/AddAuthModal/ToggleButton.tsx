"use client";

import { useState } from "react";

import { Modal } from "./Modal";

export const ToggleButton = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			<button
				onClick={handleClick}
				className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
			>
				Add API Key
			</button>

			<div>{open && <Modal setToggle={setOpen} />}</div>
		</>
	);
};
