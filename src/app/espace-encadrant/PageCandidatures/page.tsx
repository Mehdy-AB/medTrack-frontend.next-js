"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import NavbarEncadrant from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEncadrant from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchInput from '../../Components/SearchInput';
import { FilterDropdown, FilterBar } from '../../Components/FilterDropdown';
import DataTable, { Column } from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import { RefreshCw, CheckCircle, XCircle, Eye, Clock } from 'lucide-react';
import { coreApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { Application } from '@/types/api.types';
import CandidatureModal from './components/CandidatureModal';
import ConfirmationModal from './components/ConfirmationModal';

interface ApplicationFilters {
  status: string;
}

export default function CandidaturesPage() {
  // State
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);
  const [actionReason, setActionReason] = useState('');

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<ApplicationFilters>({
    status: '',
  });

  // Fetch applications
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...toQueryParams(),
        page: pagination.page,
        limit: pagination.perPage,
      };

      const response = await coreApi.listApplications(params);
      const data = response.data;

      if (Array.isArray(data)) {
        setApplications(data);
        pagination.setTotal(data.length);
      } else if (data && 'data' in data) {
        setApplications(data.data || []);
        pagination.setTotal(data.total || 0);
      } else {
        setApplications([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Erreur lors du chargement des candidatures');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, toQueryParams]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: applications.length, // Only counted for current page if not handled by backend stats
      pending: applications.filter(a => a.status === 'pending').length,
      accepted: applications.filter(a => a.status === 'accepted').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
    };
  }, [applications]);

  // Actions
  const handleAction = async () => {
    if (!selectedApplication || !actionType) return;

    try {
      await coreApi.updateApplication(selectedApplication.id, {
        status: actionType === 'accept' ? 'accepted' : 'rejected',
        rejection_reason: actionReason,
      });
      setShowConfirm(false);
      setShowModal(false);
      fetchApplications();
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Erreur lors du traitement de la candidature');
    }
  };

  const openAction = (app: Application, type: 'accept' | 'reject') => {
    setSelectedApplication(app);
    setActionType(type);
    setActionReason('');
    setShowConfirm(true);
  };

  // Table columns
  const columns: Column<Application>[] = [
    {
      key: 'student',
      header: 'Étudiant',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
            {(item.student?.user?.first_name?.[0] || '') + (item.student?.user?.last_name?.[0] || '')}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {item.student?.user?.first_name} {item.student?.user?.last_name}
            </div>
            <div className="text-xs text-gray-500">{item.student?.student_number}</div>
          </div>
        </div>
      )
    },
    {
      key: 'offer',
      header: 'Offre de stage',
      render: (item) => item.offer?.title || '-'
    },
    {
      key: 'date',
      header: 'Date',
      render: (item) => new Date(item.submission_date).toLocaleDateString('fr-FR')
    },
    {
      key: 'status',
      header: 'Statut',
      render: (item) => {
        const styles = {
          pending: 'bg-yellow-100 text-yellow-800',
          accepted: 'bg-green-100 text-green-800',
          rejected: 'bg-red-100 text-red-800',
        };
        const labels = {
          pending: 'En attente',
          accepted: 'Acceptée',
          rejected: 'Refusée',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[item.status]}`}>
            {labels[item.status]}
          </span>
        );
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '140px',
      render: (item) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedApplication(item);
              setShowModal(true);
            }}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg"
            title="Savoir plus"
          >
            <Eye className="w-4 h-4" />
          </button>

          {item.status === 'pending' && (
            <>
              <button
                onClick={() => openAction(item, 'accept')}
                className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                title="Accepter"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => openAction(item, 'reject')}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                title="Refuser"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <NavbarEncadrant />
      <Header spaceName="Espace Chef de Service" notificationCount={3} />

      <div className="flex min-h-screen bg-white">
        <SidebarEncadrant />

        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Candidatures
              </h1>
              <p className="text-gray-600 mb-6">
                Consultez, analysez et traitez les candidatures de stage
              </p>

              {/* Stats Cards */}
              <div className="flex gap-4 mb-8">
                <MiniCard label="En attente" count={stats.pending} />
                <MiniCard label="Acceptées" count={stats.accepted} />
                <MiniCard label="Refusées" count={stats.rejected} />
              </div>

              {/* Search & Refresh */}
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher une candidature..."
                  />
                </div>
                <button
                  onClick={fetchApplications}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Filters */}
            <FilterBar onClear={clearAllFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
              <FilterDropdown
                label="Statut"
                value={filters.status}
                onChange={(v) => setFilter('status', v)}
                options={[
                  { label: 'En attente', value: 'pending' },
                  { label: 'Acceptée', value: 'accepted' },
                  { label: 'Refusée', value: 'rejected' },
                ]}
              />
            </FilterBar>

            {/* Table */}
            <DataTable
              data={applications}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucune candidature trouvée"
              pagination={{
                page: pagination.page,
                perPage: pagination.perPage,
                total: pagination.total,
                totalPages: pagination.totalPages,
                onPageChange: pagination.setPage,
                onPerPageChange: pagination.setPerPage,
              }}
            />
          </div>
        </main>
      </div>

      <Footer />

      {/* Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold">Détails de la candidature</h3>
                <p className="text-gray-500">
                  {selectedApplication.student?.user?.first_name} {selectedApplication.student?.user?.last_name}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-medium text-gray-700">Motivation</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                  {selectedApplication.motivation_letter || 'Aucune lettre de motivation'}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Stage</label>
                  <p className="text-sm">{selectedApplication.offer?.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <p className="text-sm">{new Date(selectedApplication.submission_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Fermer
              </button>
              {selectedApplication.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      openAction(selectedApplication, 'reject');
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      openAction(selectedApplication, 'accept');
                    }}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Accepter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold mb-2">
              {actionType === 'accept' ? 'Accepter la candidature ?' : 'Refuser la candidature ?'}
            </h3>

            {actionType === 'reject' && (
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Motif du refus</label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm"
                  placeholder="Veuillez indiquer le motif..."
                  rows={3}
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handleAction}
                className={`px-4 py-2 text-white rounded-lg ${actionType === 'accept' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}