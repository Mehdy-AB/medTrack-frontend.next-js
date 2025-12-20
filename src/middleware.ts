import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Role-to-route mapping
const ROLE_ROUTES: Record<string, string[]> = {
    student: ["/espace-etudiant"],
    encadrant: ["/espace-encadrant"],
    admin: ["/espace-etudiant", "/espace-encadrant", "/espace-etablissement", "/tableau-de-bord"],
    establishment: ["/espace-etablissement"],
}

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const token = request.nextauth.token
        const pathname = request.nextUrl.pathname

        // If no token, let NextAuth handle redirect to login
        if (!token) {
            return NextResponse.next()
        }

        const userRole = token.role as string

        // Check if user is trying to access a role-specific route
        for (const [role, routes] of Object.entries(ROLE_ROUTES)) {
            for (const route of routes) {
                if (pathname.startsWith(route)) {
                    // Check if user's role has access to this route
                    const allowedRoutes = ROLE_ROUTES[userRole] || []
                    if (!allowedRoutes.includes(route)) {
                        // Redirect to appropriate dashboard based on role
                        const redirectPath = userRole === 'student' ? '/espace-etudiant'
                            : userRole === 'encadrant' ? '/espace-encadrant'
                                : userRole === 'admin' ? '/tableau-de-bord'
                                    : '/espace-etablissement'
                        return NextResponse.redirect(new URL(redirectPath, request.url))
                    }
                }
            }
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/espace-etudiant/:path*",
        "/espace-encadrant/:path*",
        "/espace-etablissement/:path*",
        "/tableau-de-bord/:path*",
    ],
}
