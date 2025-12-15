"use client";

import { useState, useEffect, useCallback } from 'react';
import NavbarAdmin from '../Components/NavbarAdmin';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarAdmin from '../Components/SidebarAdmin';
import SearchInput from '@/app/Components/SearchInput';
import { FilterDropdown, FilterBar } from '@/app/Components/FilterDropdown';
import DataTable, { Column } from '@/app/Components/DataTable';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import { Plus, UserCheck, RefreshCw } from 'lucide-react';
import { profileApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { EncadrantWithUser } from '@/types/api.types';

interface EncadrantFilters {
  establishment_id: string;
  service_id: string;
  specialty: string;
}

export default function GestionEncadrants() {
  // State
  const [encadrants, setEncadrants] = useState<EncadrantWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEncadrant, setSelectedEncadrant] = useState<EncadrantWithUser | null>(null);

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<EncadrantFilters>({
    establishment_id: '',
    service_id: '',
    specialty: '',
  });

  // Fetch encadrants
  const fetchEncadrants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...toQueryParams(),
        page: pagination.page,
        limit: pagination.perPage,
      };

      const response = await profileApi.listEncadrants(params);
      const data = response.data;

      if (Array.isArray(data)) {
        setEncadrants(data);
        pagination.setTotal(data.length);
      } else if (data && 'data' in data) {
        setEncadrants(data.data || []);
        pagination.setTotal(data.total || 0);
      } else {
        setEncadrants([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching encadrants:', err);
      setError('Erreur lors du chargement des encadrants');
      setEncadrants([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, toQueryParams]);

  useEffect(() => {
    fetchEncadrants();
  }, [fetchEncadrants]);

  // Table columns
  const columns: Column<EncadrantWithUser>[] = [
    {
      key: 'employee_id',
      header: 'Matricule',
      sortable: true,
      render: (item) => item.employee_id || '-'
    },
    {
      key: 'name',
      header: 'Nom complet',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 text-sm font-medium">
              {(item.user?.first_name?.[0] || '') + (item.user?.last_name?.[0] || '')}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.user?.first_name} {item.user?.last_name}</p>
            <p className="text-xs text-gray-500">{item.user?.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'title',
      header: 'Titre',
      sortable: true,
      render: (item) => item.title || '-'
    },
    {
      key: 'specialty',
      header: 'Spécialité',
      sortable: true,
      render: (item) => item.specialty || '-'
    },
    {
      key: 'phone',
      header: 'Téléphone',
      render: (item) => item.phone || '-'
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (item) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEncadrant(item);
              setShowEditModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Modifier"
          >
            <UserCheck className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEncadrant(item);
              setShowDeleteModal(true);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Supprimer"
          >
            ✕
          </button>
        </div>
      )
    }
  ];

  // Form fields
  const formFields = [
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'password', label: 'Mot de passe', type: 'password' as const, required: true },
    { name: 'first_name', label: 'Prénom', type: 'text' as const, required: true },
    { name: 'last_name', label: 'Nom', type: 'text' as const, required: true },
    { name: 'employee_id', label: 'Matricule', type: 'text' as const, required: false },
    { name: 'title', label: 'Titre', type: 'text' as const, required: false },
    { name: 'specialty', label: 'Spécialité', type: 'text' as const, required: false },
    { name: 'phone', label: 'Téléphone', type: 'text' as const, required: false },
  ];

  // Handlers
  const handleAdd = async (data: Record<string, unknown>) => {
    try {
      await profileApi.createEncadrant({
        email: data.email as string,
        password: data.password as string,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        user_id: '',
        employee_id: data.employee_id as string,
        title: data.title as string,
        specialty: data.specialty as string,
        phone: data.phone as string,
      });
      setShowAddModal(false);
      fetchEncadrants();
    } catch (err) {
      console.error('Error creating encadrant:', err);
      alert('Erreur lors de la création de l\'encadrant');
    }
  };

  const handleEdit = async (data: Record<string, unknown>) => {
    if (!selectedEncadrant) return;

    try {
      await profileApi.updateEncadrant(selectedEncadrant.id, {
        employee_id: data.employee_id as string,
        title: data.title as string,
        specialty: data.specialty as string,
        phone: data.phone as string,
      });
      setShowEditModal(false);
      setSelectedEncadrant(null);
      fetchEncadrants();
    } catch (err) {
      console.error('Error updating encadrant:', err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async () => {
    if (!selectedEncadrant) return;

    try {
      await profileApi.deleteEncadrant(selectedEncadrant.id);
      setShowDeleteModal(false);
      setSelectedEncadrant(null);
      fetchEncadrants();
    } catch (err) {
      console.error('Error deleting encadrant:', err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion des encadrants" notificationCount={5} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Rechercher un encadrant..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchEncadrants}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  title="Actualiser"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Nouveau Encadrant
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
            </FilterBar>

            {/* Data Table */}
            <DataTable
              data={encadrants}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucun encadrant trouvé"
              pagination={{
                page: pagination.page,
                perPage: pagination.perPage,
                total: pagination.total,
                totalPages: pagination.totalPages,
                onPageChange: pagination.setPage,
                onPerPageChange: pagination.setPerPage,
              }}
            />

            {/* Modals */}
            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouvel encadrant"
              icon={<Plus className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Encadrant"
            />

            <FormModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedEncadrant(null);
              }}
              onSubmit={handleEdit}
              title="Modifier Encadrant"
              icon={<UserCheck className="w-6 h-6 text-white" />}
              fields={formFields.filter(f => !['email', 'password'].includes(f.name))}
              initialData={selectedEncadrant ? {
                employee_id: selectedEncadrant.employee_id,
                title: selectedEncadrant.title,
                specialty: selectedEncadrant.specialty,
                phone: selectedEncadrant.phone,
              } : undefined}
              submitLabel="Sauvegarder"
              showCancel={true}
            />

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setSelectedEncadrant(null);
              }}
              onConfirm={handleDelete}
              title="Supprimer Encadrant ?"
              message={`Êtes-vous sûr de vouloir supprimer l'encadrant ${selectedEncadrant?.user?.first_name} ${selectedEncadrant?.user?.last_name} ?`}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}