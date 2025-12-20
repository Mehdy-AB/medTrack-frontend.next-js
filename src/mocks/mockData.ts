import {
    User,
    OfferWithDetails,
    ApplicationWithDetails,
    Establishment,
    Service,
    StudentWithUser,
    EncadrantWithDetails,
    DashboardStats,
    AuthTokens,
    PaginatedResponse,
    AffectationWithDetails,
    AttendanceRecordWithDetails,
    EvaluationWithDetails,
    MessageWithUsers,
    Notification,
    Document,
    AttendanceSummaryWithDetails
} from '@/types/api.types';

// Users
export const mockUser: User = {
    id: 'user-1',
    email: 'student@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '123456789',
    role: 'student',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const mockEncadrantUser: User = {
    id: 'user-2',
    email: 'encadrant@example.com',
    first_name: 'Dr. Jane',
    last_name: 'Smith',
    phone: '987654321',
    role: 'encadrant',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const mockAdminUser: User = {
    id: 'user-3',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    phone: '000000000',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const mockEstablishmentUser: User = {
    id: 'user-4',
    email: 'etablissement@example.com',
    first_name: 'Establishment',
    last_name: 'Admin',
    phone: '111222333',
    role: 'establishment',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const mockAuthTokens: AuthTokens = {
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
};

// Establishments & Services
export const mockEstablishment: Establishment = {
    id: 'est-1',
    code: 'CHU-ALG',
    name: 'CHU Alger',
    type: 'Hospital',
    address: 'Place du 1er Mai',
    city: 'Algiers',
    wilaya: 'Algiers',
    email: 'contact@chualger.dz',
    phone: '021234567',
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export const mockService: Service = {
    id: 'svc-1',
    establishment_id: 'est-1',
    name: 'Cardiology',
    description: 'Heart diseases department',
    capacity: 10,
    metadata: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

// Profiles
export const mockStudentProfile: StudentWithUser = {
    id: 'stu-1',
    user_id: 'user-1',
    student_number: 'ST12345',
    date_of_birth: '2000-01-01',
    university: 'Algiers University 1',
    program: 'Medicine',
    year_level: 5,
    first_name: 'John',
    last_name: 'Doe',
    email: 'student@example.com',
    phone: '123456789',
    extra: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_data: {
        id: 'user-1',
        email: 'student@example.com',
        first_name: 'John',
        last_name: 'Doe',
        phone: '123456789',
    },
};

export const mockEncadrantProfile: EncadrantWithDetails = {
    id: 'enc-1',
    user_id: 'user-2',
    establishment_id: 'est-1',
    service_id: 'svc-1',
    position: 'Chief Resident',
    speciality: 'Cardiology',
    cin: '123456789012345',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'encadrant@example.com',
    phone: '987654321',
    contact: { phone: '987654321' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user: {
        id: 'user-2',
        email: 'encadrant@example.com',
        first_name: 'Jane',
        last_name: 'Smith',
    },
    establishment: mockEstablishment,
    service: mockService,
};

// Offers
export const mockOffer: OfferWithDetails = {
    id: 'off-1',
    title: 'Cardiology Internship',
    description: 'Learn about heart diseases and treatments',
    service_id: 'svc-1',
    establishment_id: 'est-1',
    created_by: 'user-2',
    period_start: '2025-01-01',
    period_end: '2025-03-31',
    available_slots: 5,
    status: 'published',
    metadata: {
        schedule: '9am - 5pm',
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    service: {
        id: 'svc-1',
        name: 'Cardiology',
    },
    establishment: {
        id: 'est-1',
        name: 'CHU Alger',
        city: 'Algiers',
    },
    created_by_encadrant: {
        id: 'enc-1',
        first_name: 'Jane',
        last_name: 'Smith',
    },
    application_count: 2,
    remaining_slots: 3,
};

// Applications
export const mockApplication: ApplicationWithDetails = {
    id: 'app-1',
    offer_id: 'off-1',
    student_id: 'stu-1',
    submitted_at: new Date().toISOString(),
    status: 'accepted',
    decision_at: new Date().toISOString(),
    decision_by: 'enc-1',
    notes: 'Accepted for internship',
    metadata: { motivation: 'I love cardiology' },
    offer: {
        id: 'off-1',
        title: 'Cardiology Internship',
        period_start: '2025-01-01',
        period_end: '2025-03-31',
    },
    student: {
        id: 'stu-1',
        user_id: 'user-1',
        student_number: 'ST12345',
        first_name: 'John',
        last_name: 'Doe',
        university: 'Algiers University 1',
        program: 'Medicine',
        year_level: 5,
    },
    decision_by_encadrant: {
        first_name: 'Jane',
        last_name: 'Smith'
    },
};

// Affectation
export const mockAffectation: AffectationWithDetails = {
    id: 'aff-1',
    application_id: 'app-1',
    student_id: 'stu-1',
    offer_id: 'off-1',
    assigned_at: new Date().toISOString(),
    metadata: null,
    application: mockApplication,
    offer: mockOffer,
    student: {
        id: 'stu-1',
        first_name: 'John',
        last_name: 'Doe',
        student_number: 'ST12345',
    },
};

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
    total_students: 150,
    total_encadrants: 25,
    total_establishments: 10,
    total_services: 50,
    establishment_types: {
        'Hospital': 8,
        'Clinic': 2,
    },
};

// Messages
export const mockMessage: MessageWithUsers = {
    id: 'msg-1',
    sender_id: 'user-2',
    receiver_id: 'user-1',
    subject: 'Welcome',
    body: 'Welcome to the internship!',
    created_at: new Date().toISOString(),
    read_at: null,
    metadata: null,
    sender: {
        id: 'user-2',
        first_name: 'Jane',
        last_name: 'Smith',
    },
    receiver: {
        id: 'user-1',
        first_name: 'John',
        last_name: 'Doe',
    },
};

// Notifications
export const mockNotification: Notification = {
    id: 'notif-1',
    user_id: 'user-1',
    type: 'system',
    title: 'New Grade',
    content: 'You received a new grade.',
    related_object_type: 'evaluation',
    related_object_id: 'eval-1',
    created_at: new Date().toISOString(),
    sent_at: new Date().toISOString(),
    status: 'sent',
    attempts: 1,
    last_error: null,
    metadata: null,
};

// Documents
export const mockDocument: Document = {
    id: 'doc-1',
    owner_user_id: 'user-1',
    student_id: 'stu-1',
    offer_id: 'off-1',
    storage_path: '/path/to/doc',
    filename: 'report.pdf',
    content_type: 'application/pdf',
    size_bytes: 1024,
    uploaded_by: 'user-1',
    uploaded_at: new Date().toISOString(),
    metadata: null,
};

// Attendance
export const mockAttendanceRecord: AttendanceRecordWithDetails = {
    id: 'att-1',
    student_id: 'stu-1',
    offer_id: 'off-1',
    date: '2025-01-02',
    is_present: true,
    justified: false,
    justification_reason: null,
    marked_by: 'enc-1',
    marked_at: new Date().toISOString(),
    student: {
        first_name: 'John',
        last_name: 'Doe',
        student_number: 'ST12345',
    },
};

export const mockAttendanceList: AttendanceRecordWithDetails[] = [
    mockAttendanceRecord,
    {
        ...mockAttendanceRecord,
        id: 'att-2',
        date: '2025-01-03',
        is_present: true,
    },
    {
        ...mockAttendanceRecord,
        id: 'att-3',
        date: '2025-01-04',
        is_present: false,
        justified: true,
        justification_reason: 'Sick leave',
    },
    {
        ...mockAttendanceRecord,
        id: 'att-4',
        date: '2025-01-05',
        is_present: true,
    },
    {
        ...mockAttendanceRecord,
        id: 'att-5',
        date: '2025-01-06',
        is_present: false,
        justified: false,
    },
];

export const mockAttendanceSummary: AttendanceSummaryWithDetails = {
    id: 'att-sum-1',
    student_id: 'stu-1',
    offer_id: 'off-1',
    total_days: 10,
    present_days: 9,
    presence_rate: 90,
    validated: true,
    validated_at: new Date().toISOString(),
    student: {
        first_name: 'John',
        last_name: 'Doe',
        student_number: 'ST12345',
    },
    offer: {
        title: 'Cardiology Internship',
        period_start: '2025-01-01',
        period_end: '2025-03-31',
    },
};

// Evaluations
export const mockEvaluation: EvaluationWithDetails = {
    id: 'eval-1',
    student_id: 'stu-1',
    offer_id: 'off-1',
    evaluator_id: 'enc-1',
    grade: 18,
    comments: 'Excellent work',
    submitted_at: new Date().toISOString(),
    validated: true,
    validated_at: new Date().toISOString(),
    metadata: null,
    student: {
        first_name: 'John',
        last_name: 'Doe',
        student_number: 'ST12345',
    },
    offer: {
        title: 'Cardiology Internship',
        service_name: 'Cardiology',
        establishment_name: 'CHU Alger',
    },
    evaluator: {
        first_name: 'Jane',
        last_name: 'Smith',
    },
    sections: [
        {
            id: 'sec-1',
            evaluation_id: 'eval-1',
            criterion: 'Medical Knowledge',
            score: 5,
            comments: 'Good',
        }
    ],
};

export const mockEvaluationList: EvaluationWithDetails[] = [
    mockEvaluation,
    {
        ...mockEvaluation,
        id: 'eval-2',
        grade: 16,
        comments: 'Good progress',
        submitted_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    }
];

// Helper for pagination
export function mockPaginatedResponse<T>(data: T[]): PaginatedResponse<T> {
    return {
        data,
        results: data,
        total: data.length,
        page: 1,
        per_page: 10,
        total_pages: 1,
    };
}

// Simulating API Delay
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for mock Axios Response
export function mockAxiosResponse<T>(data: T): { data: T, status: number, statusText: string, headers: any, config: any } {
    return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {}
    };
}


// Mutable Stores for CRUD Demo
export let mockStudentStore: StudentWithUser[] = [mockStudentProfile];
export let mockAdminStore: User[] = [mockAdminUser];
export let mockEstablishmentStore: Establishment[] = [mockEstablishment];
export let mockEncadrantStore: EncadrantWithDetails[] = [mockEncadrantProfile];
