"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import SearchInput from '../../Components/SearchInput';
import { FilterDropdown, FilterBar } from '../../Components/FilterDropdown';
import { Briefcase, CheckCircle, MapPin, Calendar, Users, Clock, RefreshCw, Send } from 'lucide-react';
import { coreApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { Offer } from '@/types/api.types';

interface OfferFilters {
  specialty: string;
  status: string;
}

export default function AnnoncesStagesPage() {
  // State
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal state
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [motivation, setMotivation] = useState('');

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<OfferFilters>({
    specialty: '',
    status: '',
  });

  // Fetch offers
  const fetchOffers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.perPage,
        // Removed status filter to show all offers including drafts
        ...(filters.specialty && { specialty: filters.specialty }),
      };

      const response = await coreApi.listOffers(params);
      console.log('=== OFFERS API DEBUG ===');
      console.log('Full response:', response);
      console.log('Response.data:', response.data);
      console.log('Is array?:', Array.isArray(response.data));
      const data = response.data;

      // Handle Django REST Framework pagination format
      if (data && typeof data === 'object' && 'results' in data) {
        const drfData = data as unknown as { results: any[]; count: number };
        console.log('Got DRF paginated response with', drfData.results?.length || 0, 'offers');
        setOffers(drfData.results || []);
        pagination.setTotal(drfData.count || 0);
      }
      // Handle direct array response
      else if (Array.isArray(data)) {
        console.log('Got array response with', data.length, 'offers');
        setOffers(data);
        pagination.setTotal(data.length);
      }
      // Handle custom paginated response {data: [], total: N}
      else if (data && typeof data === 'object' && 'data' in data) {
        console.log('Got custom paginated response with', data.data?.length || 0, 'offers');
        setOffers(data.data || []);
        pagination.setTotal(data.total || 0);
      }
      // Unexpected format
      else {
        console.warn('Unexpected response format:', data);
        setOffers([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError('Erreur lors du chargement des stages');
      setOffers([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, filters.specialty, filters.status]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  // Open application modal
  const openApplicationModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setMotivation('');
    setShowApplicationModal(true);
  };

  // Close modal
  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedOffer(null);
    setMotivation('');
  };

  // Submit application
  const submitApplication = async () => {
    if (!selectedOffer) return;

    // Validation
    if (motivation.trim().length < 50) {
      alert('Votre lettre de motivation doit contenir au moins 50 caractères.');
      return;
    }

    setApplyingId(selectedOffer.id);
    try {
      await coreApi.createApplication({
        offer_id: selectedOffer.id,
        motivation: motivation.trim(),
      });

      setSuccessMessage('Votre candidature a été envoyée avec succès !');
      closeApplicationModal();

      // Navigate to mes-candidatures after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/espace-etudiant/mes-candidatures';
      }, 1500);

    } catch (err: any) {
      console.error('Error applying:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || 'Erreur lors de la candidature';
      alert(errorMsg);
    } finally {
      setApplyingId(null);
    }
  };

  // Filtered offers
  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      if (search && !offer.title?.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [offers, search]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarEtudiant />

        <main className="flex-1 ml-6 rounded-2xl p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Stages Disponibles
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Briefcase size={20} />
                <span>Postulez aux stages qui vous intéressent</span>
              </p>
            </div>

            {/* Success message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <p className="text-green-700 font-medium">{successMessage}</p>
              </div>
            )}

            {/* Search and filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher un stage..."
                  />
                </div>
                <button
                  onClick={fetchOffers}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  title="Actualiser"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Filters */}
            <FilterBar onClear={clearAllFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
              <FilterDropdown
                label="Spécialité"
                value={filters.specialty}
                onChange={(v) => setFilter('specialty', v)}
                options={[
                  { label: 'Cardiologie', value: 'cardiologie' },
                  { label: 'Chirurgie', value: 'chirurgie' },
                  { label: 'Pédiatrie', value: 'pediatrie' },
                  { label: 'Médecine Interne', value: 'medecine_interne' },
                ]}
              />
              <FilterDropdown
                label="Statut"
                value={filters.status}
                onChange={(v) => setFilter('status', v)}
                options={[
                  { label: 'Ouvert', value: 'open' },
                  { label: 'Bientôt', value: 'upcoming' },
                ]}
              />
            </FilterBar>

            {/* Stats */}
            <div className="mb-6">
              <p className="text-gray-700">
                <span className="font-bold text-gray-900">{filteredOffers.length}</span> stage(s) disponible(s)
              </p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-4" />
                <p className="text-gray-500">Chargement des stages...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {/* Offers list */}
            {!loading && !error && filteredOffers.length > 0 && (
              <div className="space-y-6">
                {filteredOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {offer.title || 'Stage sans titre'}
                        </h3>
                        <p className="text-gray-600">{offer.description || '-'}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${offer.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : offer.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                        }`}>
                        {offer.status === 'published' ? 'Ouvert' : offer.status === 'draft' ? 'Brouillon' : 'Fermé'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Service: {offer.service_id || '-'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {offer.period_start ? new Date(offer.period_start).toLocaleDateString('fr-FR') : '-'}
                          {' - '}
                          {offer.period_end ? new Date(offer.period_end).toLocaleDateString('fr-FR') : '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{offer.available_slots || 0} place(s)</span>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => openApplicationModal(offer)}
                        disabled={applyingId === offer.id || offer.available_slots === 0}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                      >
                        {applyingId === offer.id ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        {applyingId === offer.id ? 'Envoi...' : 'Postuler'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && filteredOffers.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg mb-2">Aucun stage trouvé</p>
                <p className="text-gray-500">Modifiez vos critères de recherche</p>
              </div>
            )}

            {/* Info box */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Comment ça marche :</span> Postulez aux stages qui vous intéressent.
                Les hôpitaux consulteront automatiquement votre profil et vos documents joints pour évaluer votre candidature.
              </p>
            </div>

          </div>
        </main>
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Postuler à ce stage
              </h2>
              <p className="text-gray-600">{selectedOffer.title}</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Offer Details */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Service: {selectedOffer.service_id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    {selectedOffer.period_start ? new Date(selectedOffer.period_start).toLocaleDateString('fr-FR') : '-'}
                    {' → '}
                    {selectedOffer.period_end ? new Date(selectedOffer.period_end).toLocaleDateString('fr-FR') : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{selectedOffer.available_slots} place(s) disponible(s)</span>
                </div>
              </div>

              {/* Motivation Letter */}
              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                  Lettre de motivation <span className="text-red-500">*</span>
                  <span className="text-gray-500 font-normal ml-1">(minimum 50 caractères)</span>
                </label>
                <textarea
                  id="motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Indiquez pourquoi vous souhaitez effectuer ce stage, vos motivations, et comment cette expérience s'inscrit dans votre parcours professionnel..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  {motivation.length} / 50 caractères minimum
                </p>
              </div>

              {/* Warning */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Attention :</span> Une fois envoyée, votre candidature ne pourra plus être modifiée.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={closeApplicationModal}
                disabled={applyingId !== null}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Annuler
              </button>
              <button
                onClick={submitApplication}
                disabled={applyingId !== null || motivation.trim().length < 50}
                className="flex items-center gap-2 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {applyingId ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Envoyer ma candidature
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}