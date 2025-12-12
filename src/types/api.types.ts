// =============================================================================
// AUTH-SERVICE TYPES
// =============================================================================

export type AuthRole = 'admin' | 'student' | 'encadrant';

// Request Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    role: AuthRole;
}

export interface RefreshTokenRequest {
    refresh_token: string;
}

export interface UpdateProfileRequest {
    first_name?: string;
    last_name?: string;
    phone?: string;
}

export interface ChangePasswordRequest {
    current_password: string;
    new_password: string;
}

// Response Types
export interface User {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    role: AuthRole;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AuthTokens {
    access_token: string;
    refresh_token: string;
    expires_in: number;
}

export interface LoginResponse {
    user: User;
    tokens: AuthTokens;
}

export interface Session {
    id: string;
    user_id: string;
    issued_at: string;
    expires_at: string;
    client_info: {
        user_agent?: string;
        ip?: string;
        device?: string;
    } | null;
    revoked: boolean;
}

export interface Permission {
    id: string;
    code: string;
    description: string | null;
}

export interface AuditLog {
    id: string;
    user_id: string | null;
    action: string;
    entity: string | null;
    entity_id: string | null;
    details: Record<string, unknown> | null;
    created_at: string;
}

// =============================================================================
// PROFILE-SERVICE TYPES
// =============================================================================

// Establishment
export interface Establishment {
    id: string;
    name: string;
    type: string | null;
    address: string | null;
    city: string | null;
    phone: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
}

export interface CreateEstablishmentRequest {
    name: string;
    type?: string;
    address?: string;
    city?: string;
    phone?: string;
    metadata?: Record<string, unknown>;
}

// Service (department within establishment)
export interface Service {
    id: string;
    establishment_id: string;
    name: string;
    description: string | null;
    capacity: number;
    metadata: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
}

export interface ServiceWithEstablishment extends Service {
    establishment: Establishment;
}

export interface CreateServiceRequest {
    establishment_id: string;
    name: string;
    description?: string;
    capacity?: number;
    metadata?: Record<string, unknown>;
}

// Student Profile
export interface StudentProfile {
    id: string;
    user_id: string;
    student_number: string | null;
    date_of_birth: string | null;
    university: string | null;
    program: string | null;
    year_level: number | null;
    extra: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
}

export interface StudentWithUser extends StudentProfile {
    user: {
        id: string;
        email: string;
        first_name: string | null;
        last_name: string | null;
        phone: string | null;
    };
}

export interface CreateStudentProfileRequest {
    user_id: string;
    student_number?: string;
    date_of_birth?: string;
    university?: string;
    program?: string;
    year_level?: number;
    extra?: Record<string, unknown>;
}

export interface UpdateStudentProfileRequest {
    student_number?: string;
    date_of_birth?: string;
    university?: string;
    program?: string;
    year_level?: number;
    extra?: Record<string, unknown>;
}

// Encadrant Profile
export interface EncadrantProfile {
    id: string;
    user_id: string;
    establishment_id: string | null;
    service_id: string | null;
    position: string | null;
    specialty: string | null;
    contact: {
        phone?: string;
        office?: string;
        alternate_email?: string;
    } | null;
    created_at: string;
    updated_at: string;
}

export interface EncadrantWithDetails extends EncadrantProfile {
    user: {
        id: string;
        email: string;
        first_name: string | null;
        last_name: string | null;
    };
    establishment: Establishment | null;
    service: Service | null;
}

export interface CreateEncadrantProfileRequest {
    user_id: string;
    establishment_id?: string;
    service_id?: string;
    position?: string;
    specialty?: string;
    contact?: Record<string, string>;
}

// =============================================================================
// CORE-SERVICE TYPES
// =============================================================================

export type OfferStatus = 'draft' | 'published' | 'closed';
export type ApplicationStatus = 'submitted' | 'accepted' | 'rejected' | 'cancelled';

// Offer (Stage Announcement)
export interface Offer {
    id: string;
    title: string;
    description: string | null;
    service_id: string;
    establishment_id: string | null;
    created_by: string | null;
    period_start: string | null;
    period_end: string | null;
    available_slots: number;
    status: OfferStatus;
    metadata: {
        prerequisites?: string[];
        schedule?: string;
        contact_info?: string;
    } | null;
    created_at: string;
    updated_at: string;
}

export interface OfferWithDetails extends Offer {
    service: {
        id: string;
        name: string;
    };
    establishment: {
        id: string;
        name: string;
        city: string | null;
    } | null;
    created_by_encadrant: {
        id: string;
        first_name: string | null;
        last_name: string | null;
    } | null;
    application_count: number;
    remaining_slots: number;
}

export interface CreateOfferRequest {
    title: string;
    description?: string;
    service_id: string;
    establishment_id?: string;
    period_start?: string;
    period_end?: string;
    available_slots?: number;
    status?: OfferStatus;
    metadata?: Record<string, unknown>;
}

// Application (Candidature)
export interface Application {
    id: string;
    offer_id: string;
    student_id: string;
    submitted_at: string;
    status: ApplicationStatus;
    decision_at: string | null;
    decision_by: string | null;
    notes: string | null;
    metadata: {
        motivation?: string;
        documents?: string[];
        priority?: number;
    } | null;
}

export interface ApplicationWithDetails extends Application {
    offer: {
        id: string;
        title: string;
        period_start: string | null;
        period_end: string | null;
    };
    student: {
        id: string;
        user_id: string;
        student_number: string | null;
        first_name: string | null;
        last_name: string | null;
        university: string | null;
        program: string | null;
        year_level: number | null;
    };
    decision_by_encadrant: {
        first_name: string | null;
        last_name: string | null;
    } | null;
}

export interface CreateApplicationRequest {
    offer_id: string;
    motivation?: string;
    document_ids?: string[];
}

export interface UpdateApplicationStatusRequest {
    status: 'accepted' | 'rejected' | 'cancelled';
    notes?: string;
}

// Affectation (Assignment)
export interface Affectation {
    id: string;
    application_id: string;
    student_id: string;
    offer_id: string;
    assigned_at: string;
    metadata: Record<string, unknown> | null;
}

export interface AffectationWithDetails extends Affectation {
    application: Application;
    offer: OfferWithDetails;
    student: {
        id: string;
        first_name: string | null;
        last_name: string | null;
        student_number: string | null;
    };
}

// =============================================================================
// EVAL-ATTENDANCE-SERVICE TYPES
// =============================================================================

// Attendance
export interface AttendanceRecord {
    id: string;
    student_id: string;
    offer_id: string;
    date: string;
    is_present: boolean;
    justified: boolean;
    justification_reason: string | null;
    marked_by: string | null;
    marked_at: string;
}

export interface AttendanceRecordWithDetails extends AttendanceRecord {
    student: {
        first_name: string | null;
        last_name: string | null;
        student_number: string | null;
    };
}

export interface MarkAttendanceRequest {
    student_id: string;
    offer_id: string;
    date: string;
    is_present: boolean;
    justified?: boolean;
    justification_reason?: string;
}

export interface BulkMarkAttendanceRequest {
    offer_id: string;
    date: string;
    records: Array<{
        student_id: string;
        is_present: boolean;
        justified?: boolean;
        justification_reason?: string;
    }>;
}

// Attendance Summary
export interface AttendanceSummary {
    id: string;
    student_id: string;
    offer_id: string;
    total_days: number;
    present_days: number;
    presence_rate: number;
    validated: boolean;
    validated_at: string | null;
}

export interface AttendanceSummaryWithDetails extends AttendanceSummary {
    student: {
        first_name: string | null;
        last_name: string | null;
        student_number: string | null;
    };
    offer: {
        title: string;
        period_start: string | null;
        period_end: string | null;
    };
}

// Evaluation
export interface Evaluation {
    id: string;
    student_id: string;
    offer_id: string;
    evaluator_id: string;
    grade: number | null;
    comments: string | null;
    submitted_at: string;
    validated: boolean;
    validated_at: string | null;
    metadata: Record<string, unknown> | null;
}

export interface EvaluationSection {
    id: string;
    evaluation_id: string;
    criterion: string;
    score: number | null;
    comments: string | null;
}

export interface EvaluationWithDetails extends Evaluation {
    student: {
        first_name: string | null;
        last_name: string | null;
        student_number: string | null;
    };
    offer: {
        title: string;
        service_name: string;
        establishment_name: string | null;
    };
    evaluator: {
        first_name: string | null;
        last_name: string | null;
    };
    sections: EvaluationSection[];
}

export interface CreateEvaluationRequest {
    student_id: string;
    offer_id: string;
    grade?: number;
    comments?: string;
    sections?: Array<{
        criterion: string;
        score?: number;
        comments?: string;
    }>;
}

export interface UpdateEvaluationRequest {
    grade?: number;
    comments?: string;
    sections?: Array<{
        id?: string;
        criterion: string;
        score?: number;
        comments?: string;
    }>;
}

export interface ValidateEvaluationRequest {
    validated: boolean;
}

// =============================================================================
// COMM-SERVICE TYPES
// =============================================================================

export type NotificationType = 'email' | 'push' | 'system';
export type NotificationStatus = 'pending' | 'sent' | 'failed';

// Message
export interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    subject: string | null;
    body: string | null;
    created_at: string;
    read_at: string | null;
    metadata: Record<string, unknown> | null;
}

export interface MessageWithUsers extends Message {
    sender: {
        id: string;
        first_name: string | null;
        last_name: string | null;
    };
    receiver: {
        id: string;
        first_name: string | null;
        last_name: string | null;
    };
}

export interface SendMessageRequest {
    receiver_id: string;
    subject?: string;
    body: string;
    metadata?: Record<string, unknown>;
}

// Notification
export interface Notification {
    id: string;
    user_id: string;
    type: NotificationType;
    title: string | null;
    content: string | null;
    related_object_type: string | null;
    related_object_id: string | null;
    created_at: string;
    sent_at: string | null;
    status: NotificationStatus;
    attempts: number;
    last_error: string | null;
    metadata: Record<string, unknown> | null;
}

export interface CreateNotificationRequest {
    user_id: string;
    type: NotificationType;
    title: string;
    content: string;
    related_object_type?: string;
    related_object_id?: string;
    metadata?: Record<string, unknown>;
}

// Document
export interface Document {
    id: string;
    owner_user_id: string | null;
    student_id: string | null;
    offer_id: string | null;
    storage_path: string;
    filename: string | null;
    content_type: string | null;
    size_bytes: number | null;
    uploaded_by: string | null;
    uploaded_at: string;
    metadata: Record<string, unknown> | null;
}

export interface UploadDocumentRequest {
    file: File;
    student_id?: string;
    offer_id?: string;
    metadata?: Record<string, unknown>;
}

export interface DocumentUploadResponse {
    document: Document;
    presigned_url?: string;
}

// =============================================================================
// COMMON TYPES & UTILITIES
// =============================================================================

export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export interface ApiError {
    error: string;
    message: string;
    status_code: number;
    details?: Record<string, unknown>;
}

export interface SuccessResponse {
    success: boolean;
    message?: string;
}
