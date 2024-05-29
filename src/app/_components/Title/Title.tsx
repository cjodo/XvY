interface TitleProps {
	children: string | JSX.Element;
}

export const Title = ({ children }: TitleProps) => {
	return (
		<div className="block w-full text-center text-xl text-white">
			{children}
		</div>
	);
};
