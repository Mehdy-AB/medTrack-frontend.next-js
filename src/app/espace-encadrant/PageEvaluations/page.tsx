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
import { RefreshCw, ClipboardList, PenTool } from 'lucide-react';
import { evalApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { Evaluation } from '@/types/api.types';
import EvaluationModal from './components/EvaluationModal';
import SuccessModal from './components/SuccessModal';

interface EvaluationFilters {
  status: string;
}

export default function EvaluationsPage() {
  // State
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<EvaluationFilters>({
    status: '',
  });

  // Fetch evaluations
  const fetchEvaluations = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...toQueryParams(),
        page: pagination.page,
        limit: pagination.perPage,
      };

      const response = await evalApi.listEvaluations(params);
      const data = response.data;

      if (Array.isArray(data)) {
        setEvaluations(data);
        pagination.setTotal(data.length);
      } else if (data && 'data' in data) {
        setEvaluations(data.data || []);
        pagination.setTotal(data.total || 0);
      } else {
        setEvaluations([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching evaluations:', err);
      setError('Erreur lors du chargement des évaluations');
      setEvaluations([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, toQueryParams]);

  useEffect(() => {
    fetchEvaluations();
  }, [fetchEvaluations]);

  // Actions
  const handleEvaluate = async (data: any) => {
    if (!selectedEvaluation) return;

    try {
      if (selectedEvaluation.id) {
        await evalApi.updateEvaluation(selectedEvaluation.id, {
          ...data,
          status: 'completed',
        });
      } else {
        // Create new if not exists (though typically list items should exist)
        await evalApi.createEvaluation({
          student_id: selectedEvaluation.student_id,
          ...data,
          status: 'completed',
        });
      }
      setShowModal(false);
      setShowSuccess(true);
      fetchEvaluations();
    } catch (err) {
      console.error('Error submitting evaluation:', err);
      alert('Erreur lors de la soumission');
    }
  };

  // Table columns
  const columns: Column<Evaluation>[] = [
    {
      key: 'student',
      header: 'Étudiant',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs">
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
      key: 'average_score',
      header: 'Note Moyenne',
      sortable: true,
      render: (item) => item.average_score ? (
        <span className="font-bold text-gray-900">{item.average_score}/20</span>
      ) : '-'
    },
    {
      key: 'status',
      header: 'Statut',
      render: (item) => {
        const isCompleted = item.status === 'completed';
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${isCompleted ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
            {isCompleted ? 'Complétée' : 'En attente'}
          </span>
        );
      }
    },
    {
      key: 'date',
      header: 'Date',
      render: (item) => item.evaluation_date ? new Date(item.evaluation_date).toLocaleDateString('fr-FR') : '-'
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '100px',
      render: (item) => (
        <button
          onClick={() => {
            setSelectedEvaluation(item);
            setShowModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg text-sm font-medium transition-colors"
        >
          <PenTool className="w-4 h-4" />
          {item.status === 'completed' ? 'Modifier' : 'Évaluer'}
        </button>
      )
    }
  ];

  return (
    <>
      <NavbarEncadrant />
      <Header spaceName="Espace Chef de Service" notificationCount={5} />

      <div className="flex min-h-screen bg-white">
        <SidebarEncadrant />

        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Évaluations des Stagiaires
              </h1>
              <p className="text-gray-600 mb-6">
                Gérez les évaluations de fin de stage
              </p>

              <div className="flex gap-4 mb-8">
                <MiniCard
                  label="Total à évaluer"
                  count={evaluations.filter(e => e.status !== 'completed').length}
                />
                <MiniCard
                  label="Complétées"
                  count={evaluations.filter(e => e.status === 'completed').length}
                />
              </div>

              {/* Search & Refresh */}
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher une évaluation..."
                  />
                </div>
                <button
                  onClick={fetchEvaluations}
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
                  { label: 'Complétée', value: 'completed' },
                ]}
              />
            </FilterBar>

            {/* Table */}
            <DataTable
              data={evaluations}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucune évaluation trouvée"
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

      {/* Evaluation Modal */}
      {selectedEvaluation && (
        <EvaluationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          evaluation={selectedEvaluation}
          onSubmit={handleEvaluate}
          onSave={() => { }}
          onError={() => { }}
        />
      )}

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Évaluation enregistrée avec succès !"
      />
    </>
  );
}