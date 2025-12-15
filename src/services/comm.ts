import api from '@/lib/axios'
import type {
    Message,
    MessageWithUsers,
    SendMessageRequest,
    Notification,
    CreateNotificationRequest,
    Document,
    DocumentUploadResponse,
    PaginatedResponse,
} from '@/types/api.types'

const COMM_BASE = '/comm/api'

export const commApi = {
    // Messages
    listMessages: (params?: {
        sender_id?: string;
        receiver_id?: string;
        unread?: boolean;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<MessageWithUsers>>(`${COMM_BASE}/messages/`, { params }),

    getMessage: (id: string) =>
        api.get<MessageWithUsers>(`${COMM_BASE}/messages/${id}/`),

    sendMessage: (data: SendMessageRequest) =>
        api.post<Message>(`${COMM_BASE}/messages/`, data),

    markAsRead: (id: string) =>
        api.post(`${COMM_BASE}/messages/${id}/read/`),

    deleteMessage: (id: string) =>
        api.delete(`${COMM_BASE}/messages/${id}/`),

    // Inbox/Sent shortcuts
    getInbox: (params?: { page?: number; limit?: number }) =>
        api.get<PaginatedResponse<MessageWithUsers>>(`${COMM_BASE}/messages/inbox/`, { params }),

    getSentMessages: (params?: { page?: number; limit?: number }) =>
        api.get<PaginatedResponse<MessageWithUsers>>(`${COMM_BASE}/messages/sent/`, { params }),

    // Notifications
    listNotifications: (params?: {
        type?: string;
        status?: string;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<Notification>>(`${COMM_BASE}/notifications/`, { params }),

    getNotification: (id: string) =>
        api.get<Notification>(`${COMM_BASE}/notifications/${id}/`),

    createNotification: (data: CreateNotificationRequest) =>
        api.post<Notification>(`${COMM_BASE}/notifications/`, data),

    markNotificationAsRead: (id: string) =>
        api.post(`${COMM_BASE}/notifications/${id}/read/`),

    markAllNotificationsAsRead: () =>
        api.post(`${COMM_BASE}/notifications/read-all/`),

    // Documents
    listDocuments: (params?: {
        student_id?: string;
        offer_id?: string;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<Document>>(`${COMM_BASE}/documents/`, { params }),

    getDocument: (id: string) =>
        api.get<Document>(`${COMM_BASE}/documents/${id}/`),

    uploadDocument: (file: File, metadata?: { student_id?: string; offer_id?: string }) => {
        const formData = new FormData()
        formData.append('file', file)
        if (metadata?.student_id) formData.append('student_id', metadata.student_id)
        if (metadata?.offer_id) formData.append('offer_id', metadata.offer_id)

        return api.post<DocumentUploadResponse>(`${COMM_BASE}/documents/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },

    getDocumentDownloadUrl: (id: string) =>
        api.get<{ url: string }>(`${COMM_BASE}/documents/${id}/download/`),

    deleteDocument: (id: string) =>
        api.delete(`${COMM_BASE}/documents/${id}/`),
}

export default commApi
