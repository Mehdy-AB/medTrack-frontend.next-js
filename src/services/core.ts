import api from '@/lib/axios'
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
    listOffers: (params?: {
        status?: string;
        service_id?: string;
        establishment_id?: string;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<OfferWithDetails>>(`${CORE_BASE}/offers/`, { params }),

    getOffer: (id: string) =>
        api.get<OfferWithDetails>(`${CORE_BASE}/offers/${id}/`),

    createOffer: (data: CreateOfferRequest) =>
        api.post<Offer>(`${CORE_BASE}/offers/`, data),

    updateOffer: (id: string, data: Partial<CreateOfferRequest>) =>
        api.patch<Offer>(`${CORE_BASE}/offers/${id}/`, data),

    deleteOffer: (id: string) =>
        api.delete(`${CORE_BASE}/offers/${id}/`),

    publishOffer: (id: string) =>
        api.post(`${CORE_BASE}/offers/${id}/publish/`),

    closeOffer: (id: string) =>
        api.post(`${CORE_BASE}/offers/${id}/close/`),

    // Applications
    listApplications: (params?: {
        offer_id?: string;
        student_id?: string;
        status?: string;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<ApplicationWithDetails>>(`${CORE_BASE}/applications/`, { params }),

    getApplication: (id: string) =>
        api.get<ApplicationWithDetails>(`${CORE_BASE}/applications/${id}/`),

    createApplication: (data: CreateApplicationRequest) =>
        api.post<Application>(`${CORE_BASE}/applications/`, data),

    updateApplicationStatus: (id: string, data: UpdateApplicationStatusRequest) =>
        api.patch<Application>(`${CORE_BASE}/applications/${id}/`, data),

    cancelApplication: (id: string) =>
        api.post(`${CORE_BASE}/applications/${id}/cancel/`),

    // My Applications (for students)
    getMyApplications: () =>
        api.get<ApplicationWithDetails[]>(`${CORE_BASE}/applications/my/`),

    // Affectations
    listAffectations: (params?: {
        offer_id?: string;
        student_id?: string;
        page?: number;
        limit?: number
    }) =>
        api.get<PaginatedResponse<AffectationWithDetails>>(`${CORE_BASE}/affectations/`, { params }),

    getAffectation: (id: string) =>
        api.get<AffectationWithDetails>(`${CORE_BASE}/affectations/${id}/`),

    // My Affectations (for students)
    getMyAffectations: () =>
        api.get<AffectationWithDetails[]>(`${CORE_BASE}/affectations/my/`),
}

export default coreApi
