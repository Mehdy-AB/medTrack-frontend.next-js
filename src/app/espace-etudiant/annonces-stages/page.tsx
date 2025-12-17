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

  // Handle apply
  const handleApply = async (offerId: string) => {
    setApplyingId(offerId);
    try {
      await coreApi.createApplication({
        offer_id: offerId,
        motivation: 'Je souhaite postuler à ce stage.',
      });
      setSuccessMessage('Votre candidature a été envoyée avec succès !');
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchOffers(); // Refresh to update available spots
    } catch (err) {
      console.error('Error applying:', err);
      alert('Erreur lors de la candidature');
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
                        onClick={() => handleApply(offer.id)}
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

      <Footer />
    </div>
  );
}