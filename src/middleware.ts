import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
	// Skip auth check for public routes
	if (request.nextUrl.pathname.startsWith("/sign-in") || 
		request.nextUrl.pathname.startsWith("/sign-up")) {
		return NextResponse.next();
	}

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};