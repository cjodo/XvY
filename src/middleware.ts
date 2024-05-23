import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const cookieStore = cookies();

  const token = cookieStore.get("access_token");
  console.log("middleware: ", token);
  console.log(req.url);

  if (!token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  } else {
    return NextResponse.redirect(new URL("/user", req.url));
  }
};

export const config = {
  matcher: "/", //root only
};
