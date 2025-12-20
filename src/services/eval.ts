import api from '@/lib/axios'
import {
    mockAttendanceRecord,
    mockAttendanceList,
    mockAttendanceSummary,
    mockEvaluation,
    mockEvaluationList,
    mockPaginatedResponse,
    mockAxiosResponse,
    delay
} from '@/mocks/mockData'
import type {
    AttendanceRecord,
    AttendanceRecordWithDetails,
    MarkAttendanceRequest,
    BulkMarkAttendanceRequest,
    AttendanceSummary,
    AttendanceSummaryWithDetails,
    Evaluation,
    EvaluationWithDetails,
    CreateEvaluationRequest,
    UpdateEvaluationRequest,
    ValidateEvaluationRequest,
    PaginatedResponse,
} from '@/types/api.types'

const EVAL_BASE = '/eval'

export const evalApi = {
    // Attendance
    listAttendance: async (params?: {
        offer_id?: string;
        student_id?: string;
        date?: string;
        page?: number;
        limit?: number
    }) => {
        return api.get('/api/mock/attendance', { baseURL: '' });
    },

    getAttendance: async (id: string) => {
        const res = await api.get('/api/mock/attendance', { baseURL: '' });
        const record = res.data.data.find((a: any) => a.id === id) || mockAttendanceRecord;
        return mockAxiosResponse(record);
    },

    markAttendance: async (data: MarkAttendanceRequest) => {
        return api.post('/api/mock/attendance', data, { baseURL: '' });
    },

    bulkMarkAttendance: async (data: BulkMarkAttendanceRequest) => {
        // For bulk, we could create multiple records or handle specially
        // For now, just return success
        return mockAxiosResponse([]);
    },

    updateAttendance: async (id: string, data: Partial<MarkAttendanceRequest>) => {
        return api.put(`/api/mock/attendance/${id}`, data, { baseURL: '' });
    },

    // Attendance Summaries
    listAttendanceSummaries: async (params?: {
        offer_id?: string;
        student_id?: string;
        validated?: boolean;
        page?: number;
        limit?: number
    }) => {
        // Summaries could be computed from attendance records
        // For now, return mock structure
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockAttendanceSummary]));
    },

    getAttendanceSummary: async (id: string) => {
        await delay();
        return mockAxiosResponse(mockAttendanceSummary);
    },

    validateAttendance: async (id: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    // Evaluations
    listEvaluations: async (params?: {
        offer_id?: string;
        student_id?: string;
        evaluator_id?: string;
        validated?: boolean;
        page?: number;
        limit?: number
    }) => {
        return api.get('/api/mock/evaluations', { baseURL: '' });
    },

    getEvaluation: async (id: string) => {
        const res = await api.get('/api/mock/evaluations', { baseURL: '' });
        const evaluation = res.data.data.find((e: any) => e.id === id) || mockEvaluation;
        return mockAxiosResponse(evaluation);
    },

    createEvaluation: async (data: CreateEvaluationRequest) => {
        return api.post('/api/mock/evaluations', data, { baseURL: '' });
    },

    updateEvaluation: async (id: string, data: UpdateEvaluationRequest) => {
        return api.put(`/api/mock/evaluations/${id}`, data, { baseURL: '' });
    },

    validateEvaluation: async (id: string, data: ValidateEvaluationRequest) => {
        return api.put(`/api/mock/evaluations/${id}`, { ...data, validated: true }, { baseURL: '' });
    },

    deleteEvaluation: async (id: string) => {
        return api.delete(`/api/mock/evaluations/${id}`, { baseURL: '' });
    },

    // My Evaluations (for students)
    getMyEvaluations: async () => {
        const res = await api.get('/api/mock/evaluations', { baseURL: '' });
        return mockAxiosResponse(res.data.data || []);
    },
}

export default evalApi
