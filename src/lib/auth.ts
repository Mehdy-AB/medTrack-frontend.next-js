import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                try {
                    // Call Backend Auth Service via Gateway
                    const res = await fetch("http://localhost/auth/api/v1/login", {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    })

                    const data = await res.json()

                    if (res.ok && data.access_token) {
                        // Map backend response to NextAuth user
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: `${data.user.first_name} ${data.user.last_name}`,
                            role: data.user.role,
                            accessToken: data.access_token,
                        }
                    }
                    return null
                } catch (e) {
                    console.error("Auth failed:", e)
                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.accessToken = user.accessToken
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.role = token.role
                session.user.accessToken = token.accessToken
                session.accessToken = token.accessToken
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || "default_secret_for_dev_only",
}
