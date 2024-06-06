import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest, res: NextResponse) => {
	const response = new NextResponse();
	response.json({ status: 200 });
	return response;
};
