import api from '@/lib/axios'
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

const EVAL_BASE = '/eval/api'

export const evalApi = {
    // Attendance
    listAttendance: (params?: {
        offer_id?: string;
        student_id?: string;
        date?: string;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<AttendanceRecordWithDetails>>(`${EVAL_BASE}/attendance/`, { params }),

    getAttendance: (id: string) =>
        api.get<AttendanceRecordWithDetails>(`${EVAL_BASE}/attendance/${id}/`),

    markAttendance: (data: MarkAttendanceRequest) =>
        api.post<AttendanceRecord>(`${EVAL_BASE}/attendance/`, data),

    bulkMarkAttendance: (data: BulkMarkAttendanceRequest) =>
        api.post<AttendanceRecord[]>(`${EVAL_BASE}/attendance/bulk/`, data),

    updateAttendance: (id: string, data: Partial<MarkAttendanceRequest>) =>
        api.patch<AttendanceRecord>(`${EVAL_BASE}/attendance/${id}/`, data),

    // Attendance Summaries
    listAttendanceSummaries: (params?: {
        offer_id?: string;
        student_id?: string;
        validated?: boolean;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<AttendanceSummaryWithDetails>>(`${EVAL_BASE}/attendance-summaries/`, { params }),

    getAttendanceSummary: (id: string) =>
        api.get<AttendanceSummaryWithDetails>(`${EVAL_BASE}/attendance-summaries/${id}/`),

    validateAttendance: (id: string) =>
        api.post(`${EVAL_BASE}/attendance-summaries/${id}/validate/`),

    // Evaluations
    listEvaluations: (params?: {
        offer_id?: string;
        student_id?: string;
        evaluator_id?: string;
        validated?: boolean;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<EvaluationWithDetails>>(`${EVAL_BASE}/evaluations/`, { params }),

    getEvaluation: (id: string) =>
        api.get<EvaluationWithDetails>(`${EVAL_BASE}/evaluations/${id}/`),

    createEvaluation: (data: CreateEvaluationRequest) =>
        api.post<Evaluation>(`${EVAL_BASE}/evaluations/`, data),

    updateEvaluation: (id: string, data: UpdateEvaluationRequest) =>
        api.patch<Evaluation>(`${EVAL_BASE}/evaluations/${id}/`, data),

    validateEvaluation: (id: string, data: ValidateEvaluationRequest) =>
        api.post(`${EVAL_BASE}/evaluations/${id}/validate/`, data),

    deleteEvaluation: (id: string) =>
        api.delete(`${EVAL_BASE}/evaluations/${id}/`),

    // My Evaluations (for students)
    getMyEvaluations: () =>
        api.get<EvaluationWithDetails[]>(`${EVAL_BASE}/evaluations/my/`),
}

export default evalApi
