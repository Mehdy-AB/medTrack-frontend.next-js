import api from '@/lib/axios'
import {
    mockUser,
    mockAuthTokens,
    mockEncadrantUser,
    mockAdminUser,
    mockEstablishmentUser,
    mockPaginatedResponse,
    mockAxiosResponse,
    delay
} from '@/mocks/mockData'
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
    login: async (data: LoginRequest) => {
        return api.post('/api/mock/auth/login', data, { baseURL: '' });
    },

    register: async (data: RegisterRequest) => {
        await delay();
        return mockAxiosResponse({ user: mockUser });
    },

    logout: async () => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    refreshToken: async (data: RefreshTokenRequest) => {
        await delay();
        return mockAxiosResponse(mockAuthTokens);
    },

    // User Management
    getCurrentUser: async () => {
        await delay();
        return mockAxiosResponse(mockUser);
    },

    updateProfile: async (data: UpdateProfileRequest) => {
        await delay();
        return mockAxiosResponse({ ...mockUser, ...data });
    },

    changePassword: async (data: ChangePasswordRequest) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    // Admin only
    listUsers: async (params?: { role?: string; page?: number; limit?: number }) => {
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockUser, mockEncadrantUser]));
    },

    getUserById: async (userId: string) => {
        await delay();
        return mockAxiosResponse(mockUser);
    },

    createUser: async (data: RegisterRequest) => {
        await delay();
        return mockAxiosResponse({ id: 'new-user-id' });
    },

    deactivateUser: async (userId: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    // Sessions
    listSessions: async () => {
        await delay();
        return mockAxiosResponse([]);
    },

    revokeSession: async (sessionId: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    revokeAllSessions: async () => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },
}

export default authApi
