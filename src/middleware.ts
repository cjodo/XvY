import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (res: NextResponse, req: NextRequest) => {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token");
  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } else {
    return;
  }
};

export const config = {
  matcher: ["/dashboard"],
};
