import api from '@/lib/axios'
import {
    mockService,
    mockStudentProfile,
    mockEncadrantProfile,
    mockDashboardStats,
    mockPaginatedResponse,
    mockAxiosResponse,
    delay,
    mockEncadrantStore
} from '@/mocks/mockData'
import type {
    CreateEstablishmentRequest,
    CreateServiceRequest,
    StudentWithUser,
    CreateStudentProfileRequest,
    UpdateStudentProfileRequest,
    CreateEncadrantProfileRequest,
} from '@/types/api.types'

const PROFILE_BASE = '/profile/api'

export const profileApi = {
    // Establishments
    listEstablishments: async (params?: { city?: string; page?: number; limit?: number }) => {
        const res = await api.get('/api/mock/establishments', { baseURL: '' });
        return res;
    },

    getEstablishment: async (id: string) => {
        // Simple list scan for now as get-by-id endpoint for mock could be simpler
        const res = await api.get('/api/mock/establishments', { baseURL: '' });
        const est = res.data.data.find((e: any) => e.id === id);
        return mockAxiosResponse(est);
    },

    createEstablishment: async (data: CreateEstablishmentRequest) => {
        return api.post('/api/mock/establishments', data, { baseURL: '' });
    },

    updateEstablishment: async (id: string, data: Partial<CreateEstablishmentRequest>) => {
        return api.put(`/api/mock/establishments/${id}`, data, { baseURL: '' });
    },

    deleteEstablishment: async (id: string) => {
        return api.delete(`/api/mock/establishments/${id}`, { baseURL: '' });
    },

    // Services
    listServices: async (params?: { establishment_id?: string; page?: number; limit?: number }) => {
        return api.get('/api/mock/services', { baseURL: '' });
    },

    getService: async (id: string) => {
        const res = await api.get('/api/mock/services', { baseURL: '' });
        const service = res.data.data.find((s: any) => s.id === id) || mockService;
        return mockAxiosResponse(service);
    },

    createService: async (data: CreateServiceRequest) => {
        return api.post('/api/mock/services', data, { baseURL: '' });
    },

    updateService: async (id: string, data: Partial<CreateServiceRequest>) => {
        return api.put(`/api/mock/services/${id}`, data, { baseURL: '' });
    },

    deleteService: async (id: string) => {
        return api.delete(`/api/mock/services/${id}`, { baseURL: '' });
    },

    // Students
    listStudents: async (params?: { page?: number; limit?: number }) => {
        return api.get('/api/mock/students', { baseURL: '' });
    },

    getStudent: async (id: string) => {
        const res = await api.get('/api/mock/students', { baseURL: '' });
        const student = res.data.data.find((s: any) => s.id === id) || mockStudentProfile;
        return mockAxiosResponse(student);
    },

    getStudentByUserId: async (userId: string) => {
        const res = await api.get('/api/mock/students', { baseURL: '' });
        const student = res.data.data.find((s: any) => s.user_id === userId) || mockStudentProfile;
        return mockAxiosResponse(student);
    },

    createStudent: async (data: CreateStudentProfileRequest & { email: string; password: string }) => {
        return api.post('/api/mock/students', data, { baseURL: '' });
    },

    updateStudent: async (id: string, data: UpdateStudentProfileRequest) => {
        return api.put(`/api/mock/students/${id}`, data, { baseURL: '' });
    },

    // Update current user's profile (students/me endpoint)
    updateMyProfile: async (data: any) => {
        // This usually updates the logged-in student. We'd need to find them first.
        // For now, let's assume valid ID is available or just mock success to keep it simple
        // strictly speaking we should look up user from session?
        return mockAxiosResponse({ ...mockStudentProfile, ...data });
    },

    deleteStudent: async (id: string) => {
        return api.delete(`/api/mock/students/${id}`, { baseURL: '' });
    },

    // Encadrants
    listEncadrants: async (params?: { establishment_id?: string; page?: number; limit?: number }) => {
        return api.get('/api/mock/encadrants', { baseURL: '' });
    },

    getEncadrant: async (id: string) => {
        const res = await api.get('/api/mock/encadrants', { baseURL: '' });
        const enc = res.data.data.find((e: any) => e.id === id) || mockEncadrantProfile;
        return mockAxiosResponse(enc);
    },

    getEncadrantByUserId: async (userId: string) => {
        const res = await api.get('/api/mock/encadrants', { baseURL: '' });
        const enc = res.data.data.find((e: any) => e.user_id === userId) || mockEncadrantProfile;
        return mockAxiosResponse(enc);
    },

    createEncadrant: async (data: CreateEncadrantProfileRequest & { email: string; password: string }) => {
        return api.post('/api/mock/encadrants', data, { baseURL: '' });
    },

    updateEncadrant: async (id: string, data: Partial<CreateEncadrantProfileRequest>) => {
        return api.put(`/api/mock/encadrants/${id}`, data, { baseURL: '' });
    },

    deleteEncadrant: async (id: string) => {
        return api.delete(`/api/mock/encadrants/${id}`, { baseURL: '' });
    },

    // Dashboard
    getDashboardStats: async () => {
        // Fetch meaningful stats from DB (optional: implement /api/mock/dashboard/stats)
        // For now, let's fetch lists and count
        const [students, establishments] = await Promise.all([
            api.get('/api/mock/students', { baseURL: '' }),
            api.get('/api/mock/establishments', { baseURL: '' }),
        ]);

        return mockAxiosResponse({
            ...mockDashboardStats,
            total_students: students.data.total || 0,
            active_students: students.data.total || 0,
            total_establishments: establishments.data.total || 0,
        });
    },
}

export default profileApi
