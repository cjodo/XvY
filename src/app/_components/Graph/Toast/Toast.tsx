interface ToastParams {
	type: "warn" | "info" | "error";
	message: string;
}

export const Toast = ({ type, message }: ToastParams) => {
	console.log({ type, message });

	return <div></div>;
};
