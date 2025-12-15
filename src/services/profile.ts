import api from '@/lib/axios'
import type {
    Establishment,
    CreateEstablishmentRequest,
    Service,
    CreateServiceRequest,
    StudentProfile,
    StudentWithUser,
    CreateStudentProfileRequest,
    UpdateStudentProfileRequest,
    EncadrantProfile,
    EncadrantWithDetails,
    CreateEncadrantProfileRequest,
    PaginatedResponse,
} from '@/types/api.types'

const PROFILE_BASE = '/profile/api'

export const profileApi = {
    // Establishments
    listEstablishments: (params?: { city?: string; page?: number; limit?: number }) =>
        api.get<PaginatedResponse<Establishment>>(`${PROFILE_BASE}/establishments/`, { params }),

    getEstablishment: (id: string) =>
        api.get<Establishment>(`${PROFILE_BASE}/establishments/${id}/`),

    createEstablishment: (data: CreateEstablishmentRequest) =>
        api.post<Establishment>(`${PROFILE_BASE}/establishments/`, data),

    updateEstablishment: (id: string, data: Partial<CreateEstablishmentRequest>) =>
        api.patch<Establishment>(`${PROFILE_BASE}/establishments/${id}/`, data),

    deleteEstablishment: (id: string) =>
        api.delete(`${PROFILE_BASE}/establishments/${id}/`),

    // Services
    listServices: (params?: { establishment_id?: string; page?: number; limit?: number }) =>
        api.get<PaginatedResponse<Service>>(`${PROFILE_BASE}/services/`, { params }),

    getService: (id: string) =>
        api.get<Service>(`${PROFILE_BASE}/services/${id}/`),

    createService: (data: CreateServiceRequest) =>
        api.post<Service>(`${PROFILE_BASE}/services/`, data),

    updateService: (id: string, data: Partial<CreateServiceRequest>) =>
        api.patch<Service>(`${PROFILE_BASE}/services/${id}/`, data),

    deleteService: (id: string) =>
        api.delete(`${PROFILE_BASE}/services/${id}/`),

    // Students
    listStudents: (params?: { page?: number; limit?: number }) =>
        api.get<PaginatedResponse<StudentWithUser>>(`${PROFILE_BASE}/students/`, { params }),

    getStudent: (id: string) =>
        api.get<StudentWithUser>(`${PROFILE_BASE}/students/${id}/`),

    getStudentByUserId: (userId: string) =>
        api.get<StudentWithUser>(`${PROFILE_BASE}/students/by_user/${userId}/`),

    createStudent: (data: CreateStudentProfileRequest & { email: string; password: string }) =>
        api.post<StudentProfile>(`${PROFILE_BASE}/students/`, data),

    updateStudent: (id: string, data: UpdateStudentProfileRequest) =>
        api.patch<StudentProfile>(`${PROFILE_BASE}/students/${id}/`, data),

    deleteStudent: (id: string) =>
        api.delete(`${PROFILE_BASE}/students/${id}/`),

    // Encadrants
    listEncadrants: (params?: { establishment_id?: string; page?: number; limit?: number }) =>
        api.get<PaginatedResponse<EncadrantWithDetails>>(`${PROFILE_BASE}/encadrants/`, { params }),

    getEncadrant: (id: string) =>
        api.get<EncadrantWithDetails>(`${PROFILE_BASE}/encadrants/${id}/`),

    getEncadrantByUserId: (userId: string) =>
        api.get<EncadrantWithDetails>(`${PROFILE_BASE}/encadrants/by_user/${userId}/`),

    createEncadrant: (data: CreateEncadrantProfileRequest & { email: string; password: string }) =>
        api.post<EncadrantProfile>(`${PROFILE_BASE}/encadrants/`, data),

    updateEncadrant: (id: string, data: Partial<CreateEncadrantProfileRequest>) =>
        api.patch<EncadrantProfile>(`${PROFILE_BASE}/encadrants/${id}/`, data),

    deleteEncadrant: (id: string) =>
        api.delete(`${PROFILE_BASE}/encadrants/${id}/`),
}

export default profileApi
