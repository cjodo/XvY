import { useUser } from "@clerk/nextjs";
import React, { FormEvent, useState } from "react";
import styles from "./modal.module.css";
import { postGhKey } from "~/app/_services/postGhKey";
import { useRouter } from "next/router";

interface ModalParams {
	setOpen: (toggle: boolean) => void;
}

export const Modal = ({ setOpen }: ModalParams) => {
	const [key, setKey] = useState("");
	const [exp, setExp] = useState("");
	const [unlimited, setUnlimited] = useState(false);
	const [invalidMessage, setInvalidMessage] = useState("");

	const router = useRouter();

	const { user, isSignedIn } = useUser();

	const close = () => {
		setOpen(false);
	};

	const handleKeyChange = (e: any) => {
		setKey(e.target.value);
	};

	const handleExpChange = (e: any) => {
		setExp(e.target.value);
	};

	const handleUnlimitedChange = (e: any) => {
		setUnlimited(e.target.checked);
		console.log(unlimited);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log({ exp, unlimited, key, invalidMessage });

		if (!isSignedIn) {
			return;
		}

		if (key.length === 0) {
			console.log("Invalid");
			setInvalidMessage("Must enter a token");
			const input: HTMLInputElement = e.target.elements["key"];
			input.classList.add("invalid:border-red-500");
			return;
		}

		if (unlimited) {
			setExp("Inf");
		}

		const username = user.username;

		if (exp) {
			postGhKey(key, username, exp);
			router.reload();
			close();
		} else {
			setInvalidMessage("Must have an expiration date or check No Expiration");
		}
	};

	return (
		<>
			<div onClick={close} className={styles.overlay}></div>

			<div className={styles.modal}>
				<div className="modalContent text-gray-800">
					<button
						onClick={close}
						className="absolute right-10 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
					>
						Close
					</button>
					<h2 className="mb-5">Add Github Auth Key</h2>
					<p className="mb-4 text-lg">
						generate a new token{" "}
						<a
							href="https://github.com/settings/tokens"
							className="text-blue-600"
						>
							Here
						</a>
					</p>
					<p className="mb-4 text-xl">
						Click on <strong> Generate new token, </strong> Then choose{" "}
						<strong>classic</strong>. The token must have repo scopes, it's up
						to you for expiration
					</p>
					<form onSubmit={handleSubmit}>
						<div>
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Api Token:
							</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input
									onChange={handleKeyChange}
									type="text"
									name="key"
									id="key"
									className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 "
									placeholder=""
								/>
							</div>
							<div className="mt-4 flex">
								<div>
									<label htmlFor="exp" className="block">
										Expiration:
									</label>
									<input
										onChange={handleExpChange}
										type="date"
										name="exp"
										id="exp"
									/>
								</div>
								<div className="ml-2 mt-6 flex items-center">
									<input
										id="default-radio-1"
										type="radio"
										value=""
										name="default-radio"
										onChange={handleUnlimitedChange}
										className="mr-2 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
									/>
									<label
										htmlFor="default-radio-1"
										className="font-medium dark:text-blue-900"
									>
										No Expiration
									</label>
								</div>
							</div>
						</div>

						<div className="mt-4 text-red-600">{invalidMessage}</div>

						<button
							type="submit"
							className="relative bottom-0 mt-5 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
