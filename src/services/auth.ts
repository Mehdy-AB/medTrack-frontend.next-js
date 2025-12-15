import api from '@/lib/axios'
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RefreshTokenRequest,
    AuthTokens,
    User,
    UpdateProfileRequest,
    ChangePasswordRequest,
    Session,
    PaginatedResponse,
} from '@/types/api.types'

const AUTH_BASE = '/auth/api/v1'

export const authApi = {
    // Authentication
    login: (data: LoginRequest) =>
        api.post<LoginResponse>(`${AUTH_BASE}/login`, data),

    register: (data: RegisterRequest) =>
        api.post<{ user: User }>(`${AUTH_BASE}/register`, data),

    logout: () =>
        api.post(`${AUTH_BASE}/logout`),

    refreshToken: (data: RefreshTokenRequest) =>
        api.post<AuthTokens>(`${AUTH_BASE}/refresh`, data),

    // User Management
    getCurrentUser: () =>
        api.get<User>(`${AUTH_BASE}/users/me`),

    updateProfile: (data: UpdateProfileRequest) =>
        api.patch<User>(`${AUTH_BASE}/users/me`, data),

    changePassword: (data: ChangePasswordRequest) =>
        api.post(`${AUTH_BASE}/users/me/change-password`, data),

    // Admin only
    listUsers: (params?: { role?: string; page?: number; limit?: number }) =>
        api.get<PaginatedResponse<User>>(`${AUTH_BASE}/users`, { params }),

    getUserById: (userId: string) =>
        api.get<User>(`${AUTH_BASE}/users/${userId}`),

    createUser: (data: RegisterRequest) =>
        api.post<{ id: string }>(`${AUTH_BASE}/users`, data),

    deactivateUser: (userId: string) =>
        api.patch(`${AUTH_BASE}/users/${userId}`, { is_active: false }),

    // Sessions
    listSessions: () =>
        api.get<Session[]>(`${AUTH_BASE}/sessions`),

    revokeSession: (sessionId: string) =>
        api.delete(`${AUTH_BASE}/sessions/${sessionId}`),

    revokeAllSessions: () =>
        api.delete(`${AUTH_BASE}/sessions`),
}

export default authApi
