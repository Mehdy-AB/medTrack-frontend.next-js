import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getSession, signOut } from 'next-auth/react'

// Create Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

// Request interceptor - Add auth token
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Get session (client-side)
        if (typeof window !== 'undefined') {
            const session = await getSession()
            if (session?.accessToken) {
                config.headers.Authorization = `Bearer ${session.accessToken}`
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Response interceptor - Handle 401 and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // If 401 and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                // Attempt to refresh the token
                const session = await getSession()

                if (!session) {
                    // No session, logout
                    await signOut({ callbackUrl: '/login' })
                    return Promise.reject(error)
                }

                // Try to refresh via NextAuth (will use refresh_token if configured)
                // For now, if 401, we assume session expired - logout user
                console.warn('Session expired, logging out...')
                await signOut({ callbackUrl: '/login' })
                return Promise.reject(error)

                // NOTE: Full refresh token flow would require:
                // 1. Store refresh_token in session
                // 2. Call backend refresh endpoint
                // 3. Update session with new tokens
                // 4. Retry original request
                // This is complex with NextAuth and often requires custom session handling

            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError)
                await signOut({ callbackUrl: '/login' })
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api

// Helper for server-side requests (API routes)
export const createServerApi = (accessToken?: string) => {
    const serverApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost',
        headers: {
            'Content-Type': 'application/json',
            ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        timeout: 30000,
    })
    return serverApi
}
