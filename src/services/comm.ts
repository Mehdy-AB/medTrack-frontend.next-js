import api from '@/lib/axios'
import {
    mockMessage,
    mockNotification,
    mockDocument,
    mockPaginatedResponse,
    mockAxiosResponse,
    delay
} from '@/mocks/mockData'
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
    listMessages: async (params?: {
        sender_id?: string;
        receiver_id?: string;
        unread?: boolean;
        page?: number;
        limit?: number
    }) => {
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockMessage]));
    },

    getMessage: async (id: string) => {
        await delay();
        return mockAxiosResponse(mockMessage);
    },

    sendMessage: async (data: SendMessageRequest) => {
        await delay();
        // Return a basic Message object (without user details) as per type definition for this endpoint return
        const msg = {
            id: 'msg-new',
            sender_id: 'user-1', // assuming current user
            receiver_id: data.receiver_id,
            subject: data.subject || null,
            body: data.body,
            created_at: new Date().toISOString(),
            read_at: null,
            metadata: data.metadata || null
        };
        return mockAxiosResponse(msg);
    },

    markAsRead: async (id: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    deleteMessage: async (id: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    // Inbox/Sent shortcuts
    getInbox: async (params?: { page?: number; limit?: number }) => {
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockMessage]));
    },

    getSentMessages: async (params?: { page?: number; limit?: number }) => {
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockMessage]));
    },

    // Notifications
    listNotifications: async (params?: {
        type?: string;
        status?: string;
        page?: number;
        limit?: number
    }) => {
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockNotification]));
    },

    getNotification: async (id: string) => {
        await delay();
        return mockAxiosResponse(mockNotification);
    },

    createNotification: async (data: CreateNotificationRequest) => {
        await delay();
        return mockAxiosResponse({ ...mockNotification, ...data });
    },

    markNotificationAsRead: async (id: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    markAllNotificationsAsRead: async () => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },

    // Documents
    listDocuments: async (params?: {
        student_id?: string;
        offer_id?: string;
        page?: number;
        limit?: number
    }) => {
        await delay();
        return mockAxiosResponse(mockPaginatedResponse([mockDocument]));
    },

    getDocument: async (id: string) => {
        await delay();
        return mockAxiosResponse(mockDocument);
    },

    uploadDocument: async (file: File, metadata?: { student_id?: string; offer_id?: string }) => {
        await delay();
        return mockAxiosResponse({ document: mockDocument, presigned_url: 'http://mock-url' });
    },

    getDocumentDownloadUrl: async (id: string) => {
        await delay();
        return mockAxiosResponse({ url: 'http://google.com' });
    },

    deleteDocument: async (id: string) => {
        await delay();
        return mockAxiosResponse({ success: true } as any);
    },
}

export default commApi
