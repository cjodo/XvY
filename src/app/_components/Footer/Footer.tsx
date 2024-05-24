export const Footer = () => {
	return (
		<>
			<footer className="m-4 rounded-lg bg-gray-800 shadow">
				<div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
					<span className="text-sm text-gray-400 text-gray-500 sm:text-center">
						© 2023{" "}
						<a href="#" className="hover:underline">
							GitXY™
						</a>
						.
					</span>
					<ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
						<li>
							<a
								href="https://github.com/CodingGeeneeus/XvY"
								className="me-4 hover:underline md:me-6"
							>
								Source
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</>
	);
};
