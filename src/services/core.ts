import api from '@/lib/axios'
import {
    mockOffer,
    mockApplication,
    mockAffectation,
    mockPaginatedResponse,
    mockAxiosResponse,
    delay
} from '@/mocks/mockData'
import type {
    Offer,
    OfferWithDetails,
    CreateOfferRequest,
    Application,
    ApplicationWithDetails,
    CreateApplicationRequest,
    UpdateApplicationStatusRequest,
    Affectation,
    AffectationWithDetails,
    PaginatedResponse,
} from '@/types/api.types'

const CORE_BASE = '/core'

export const coreApi = {
    // Offers
    listOffers: async (params?: {
        status?: string;
        service_id?: string;
        establishment_id?: string;
        page?: number;
        limit?: number
    }) => {
        return api.get('/api/mock/offers', { baseURL: '' });
    },

    getOffer: async (id: string) => {
        const res = await api.get('/api/mock/offers', { baseURL: '' });
        const offer = res.data.data.find((o: any) => o.id === id) || mockOffer;
        return mockAxiosResponse(offer);
    },

    createOffer: async (data: CreateOfferRequest) => {
        return api.post('/api/mock/offers', data, { baseURL: '' });
    },

    updateOffer: async (id: string, data: Partial<CreateOfferRequest>) => {
        return api.put(`/api/mock/offers/${id}`, data, { baseURL: '' });
    },

    deleteOffer: async (id: string) => {
        return api.delete(`/api/mock/offers/${id}`, { baseURL: '' });
    },

    publishOffer: async (id: string) => {
        return api.put(`/api/mock/offers/${id}`, { status: 'published' }, { baseURL: '' });
    },

    closeOffer: async (id: string) => {
        return api.put(`/api/mock/offers/${id}`, { status: 'closed' }, { baseURL: '' });
    },

    // Applications
    listApplications: async (params?: {
        offer_id?: string;
        student_id?: string;
        status?: string;
        page?: number;
        limit?: number
    }) => {
        return api.get('/api/mock/applications', { baseURL: '' });
    },

    getApplication: async (id: string) => {
        const res = await api.get('/api/mock/applications', { baseURL: '' });
        const application = res.data.data.find((a: any) => a.id === id) || mockApplication;
        return mockAxiosResponse(application);
    },

    createApplication: async (data: CreateApplicationRequest) => {
        return api.post('/api/mock/applications', data, { baseURL: '' });
    },

    updateApplicationStatus: async (id: string, data: UpdateApplicationStatusRequest) => {
        return api.put(`/api/mock/applications/${id}`, data, { baseURL: '' });
    },

    cancelApplication: async (id: string) => {
        return api.put(`/api/mock/applications/${id}`, { status: 'cancelled' }, { baseURL: '' });
    },

    // My Applications (for students)
    getMyApplications: async () => {
        const res = await api.get('/api/mock/applications', { baseURL: '' });
        return mockAxiosResponse(res.data.data || []);
    },

    // Affectations
    listAffectations: async (params?: {
        offer_id?: string;
        student_id?: string;
        page?: number;
        limit?: number
    }) => {
        return api.get('/api/mock/affectations', { baseURL: '' });
    },

    getAffectation: async (id: string) => {
        const res = await api.get('/api/mock/affectations', { baseURL: '' });
        const affectation = res.data.data.find((a: any) => a.id === id) || mockAffectation;
        return mockAxiosResponse(affectation);
    },

    // My Affectations (for students)
    getMyAffectations: async () => {
        const res = await api.get('/api/mock/affectations', { baseURL: '' });
        return mockAxiosResponse(res.data.data || []);
    },
}

export default coreApi
