import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function proxy( request: NextRequest ) {
	const token = request.cookies.get("token")?.value;
	const { pathname } = request.nextUrl;

	const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
	const isProtectedPage = pathname.startsWith("/recommended");

	// If user is not logged in and tries to access protected pages → redirect to login
	if (!token && isProtectedPage) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// If user is logged in and tries to access login/register → redirect to app
	if (token && isAuthPage) {
		return NextResponse.redirect(new URL("/recommended", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/register", "/recommended/:path*"],
};
