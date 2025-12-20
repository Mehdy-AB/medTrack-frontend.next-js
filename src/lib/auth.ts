import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authApi } from "@/services/auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.log('Missing credentials');
                    return null;
                }

                try {
                    console.log('Attempting login for:', credentials.email);

                    // Direct database check (server-side)
                    const { readDb } = await import('@/lib/json-db');
                    const { mockAuthTokens, mockUser, mockEncadrantUser, mockEstablishmentUser, mockAdminUser } = await import('@/mocks/mockData');

                    const db = await readDb();
                    let user = null;

                    // Check Admins
                    const admin = db.admins.find((u: any) => u.email === credentials.email);
                    if (admin) {
                        user = {
                            id: admin.id,
                            email: admin.email,
                            first_name: admin.first_name,
                            last_name: admin.last_name,
                            role: admin.role || 'admin'
                        };
                    }

                    // Check Students
                    if (!user) {
                        const student = db.students.find((s: any) => s.email === credentials.email);
                        if (student) {
                            user = {
                                id: student.user_id || student.id,
                                email: student.email,
                                first_name: student.first_name,
                                last_name: student.last_name,
                                role: 'student'
                            };
                        }
                    }

                    // Check Encadrants
                    if (!user) {
                        const encadrant = db.encadrants.find((e: any) => e.email === credentials.email);
                        if (encadrant) {
                            user = {
                                id: encadrant.user_id || encadrant.id,
                                email: encadrant.email,
                                first_name: encadrant.first_name,
                                last_name: encadrant.last_name,
                                role: 'encadrant'
                            };
                        }
                    }

                    // Check Establishments
                    if (!user) {
                        const est = db.establishments.find((e: any) => e.email === credentials.email);
                        if (est) {
                            user = {
                                id: est.id,
                                email: est.email,
                                first_name: est.name,
                                last_name: 'Admin',
                                role: 'establishment'
                            };
                        }
                    }

                    // Fallback to mocks
                    if (!user) {
                        if (credentials.email.includes('admin')) user = mockAdminUser;
                        else if (credentials.email.includes('encadrant')) user = mockEncadrantUser;
                        else if (credentials.email.includes('etablissement')) user = mockEstablishmentUser;
                        else if (credentials.email.includes('student')) user = mockUser;
                    }

                    if (user) {
                        console.log('Login successful for user:', user);
                        return {
                            id: user.id,
                            email: user.email,
                            name: `${user.first_name} ${user.last_name}`,
                            role: user.role,
                            accessToken: mockAuthTokens.access_token,
                        }
                    }

                    console.log('No user found');
                    return null;
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
