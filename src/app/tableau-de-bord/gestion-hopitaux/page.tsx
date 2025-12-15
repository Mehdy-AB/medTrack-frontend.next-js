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
import { Plus, Building2, Phone, Mail, MapPin, Hash, RefreshCw } from 'lucide-react';
import { profileApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { Establishment } from '@/types/api.types';

interface EstablishmentFilters {
  type: string;
  wilaya: string;
}

export default function GestionHopitaux() {
  // State
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<EstablishmentFilters>({
    type: '',
    wilaya: '',
  });

  // Fetch establishments
  const fetchEstablishments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...toQueryParams(),
        page: pagination.page,
        limit: pagination.perPage,
      };

      const response = await profileApi.listEstablishments(params);
      const data = response.data;

      if (Array.isArray(data)) {
        setEstablishments(data);
        pagination.setTotal(data.length);
      } else if (data && 'data' in data) {
        setEstablishments(data.data || []);
        pagination.setTotal(data.total || 0);
      } else {
        setEstablishments([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching establishments:', err);
      setError('Erreur lors du chargement des établissements');
      setEstablishments([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, toQueryParams]);

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  // Stats
  const activeCount = establishments.filter(e => e.is_active !== false).length;
  const totalServicesCount = establishments.length; // Would need API for real count

  // Table columns
  const columns: Column<Establishment>[] = [
    {
      key: 'code',
      header: 'Code',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-400" />
          <span className="font-mono">{item.code || '-'}</span>
        </div>
      )
    },
    {
      key: 'name',
      header: 'Nom',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-500">{item.type || 'Hôpital'}</div>
          </div>
        </div>
      )
    },
    {
      key: 'address',
      header: 'Adresse',
      render: (item) => (
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{item.address || '-'}</span>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          {item.email ? (
            <a href={`mailto:${item.email}`} className="text-teal-600 hover:underline text-sm">
              {item.email}
            </a>
          ) : '-'}
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Téléphone',
      render: (item) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          {item.phone ? (
            <a href={`tel:${item.phone}`} className="text-gray-700 hover:text-teal-600 text-sm">
              {item.phone}
            </a>
          ) : '-'}
        </div>
      )
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
              setSelectedEstablishment(item);
              setShowEditModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Modifier"
          >
            <Building2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEstablishment(item);
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
    { name: 'code', label: 'Code', type: 'text' as const, placeholder: 'Ex: HOP-2025-001', required: false },
    { name: 'name', label: 'Nom', type: 'text' as const, placeholder: 'Nom de l\'établissement', required: true },
    { name: 'type', label: 'Type', type: 'text' as const, placeholder: 'CHU, Clinique, etc.', required: false },
    { name: 'address', label: 'Adresse', type: 'text' as const, placeholder: 'Adresse complète', required: false },
    { name: 'wilaya', label: 'Wilaya', type: 'text' as const, placeholder: 'Wilaya', required: false },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'email@etablissement.dz', required: false },
    { name: 'phone', label: 'Téléphone', type: 'tel' as const, placeholder: '+213 XX XX XX XX', required: false },
  ];

  // Handlers
  const handleAdd = async (data: Record<string, unknown>) => {
    try {
      await profileApi.createEstablishment({
        name: data.name as string,
        code: data.code as string,
        type: data.type as string,
        address: data.address as string,
        wilaya: data.wilaya as string,
        email: data.email as string,
        phone: data.phone as string,
      });
      setShowAddModal(false);
      fetchEstablishments();
    } catch (err) {
      console.error('Error creating establishment:', err);
      alert('Erreur lors de la création');
    }
  };

  const handleEdit = async (data: Record<string, unknown>) => {
    if (!selectedEstablishment) return;

    try {
      await profileApi.updateEstablishment(selectedEstablishment.id, {
        name: data.name as string,
        code: data.code as string,
        type: data.type as string,
        address: data.address as string,
        wilaya: data.wilaya as string,
        email: data.email as string,
        phone: data.phone as string,
      });
      setShowEditModal(false);
      setSelectedEstablishment(null);
      fetchEstablishments();
    } catch (err) {
      console.error('Error updating establishment:', err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async () => {
    if (!selectedEstablishment) return;

    try {
      await profileApi.deleteEstablishment(selectedEstablishment.id);
      setShowDeleteModal(false);
      setSelectedEstablishment(null);
      fetchEstablishments();
    } catch (err) {
      console.error('Error deleting establishment:', err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion des Hôpitaux" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">

            {/* Header with stats */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des Hôpitaux</h1>
                  <p className="text-gray-600">Gérez les établissements hospitaliers partenaires</p>
                </div>

                {/* Quick stats */}
                <div className="flex items-center gap-4">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-500">Hôpitaux actifs</div>
                    <div className="text-xl font-bold text-teal-600">{activeCount}</div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-xl font-bold text-blue-600">{establishments.length}</div>
                  </div>
                </div>
              </div>

              {/* Search and actions */}
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher un établissement..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchEstablishments}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Actualiser"
                  >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Nouvel Hôpital
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <FilterBar onClear={clearAllFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
              <FilterDropdown
                label="Type"
                value={filters.type}
                onChange={(v) => setFilter('type', v)}
                options={[
                  { label: 'CHU', value: 'CHU' },
                  { label: 'EPH', value: 'EPH' },
                  { label: 'Clinique', value: 'clinique' },
                ]}
              />
              <FilterDropdown
                label="Wilaya"
                value={filters.wilaya}
                onChange={(v) => setFilter('wilaya', v)}
                options={[
                  { label: 'Alger', value: 'alger' },
                  { label: 'Boumerdès', value: 'boumerdes' },
                  { label: 'Blida', value: 'blida' },
                ]}
              />
            </FilterBar>

            {/* Data Table */}
            <DataTable
              data={establishments}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucun établissement trouvé"
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
              title="Ajouter un nouvel hôpital"
              icon={<Building2 className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Hôpital"
            />

            <FormModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedEstablishment(null);
              }}
              onSubmit={handleEdit}
              title="Modifier l'hôpital"
              icon={<Building2 className="w-6 h-6 text-white" />}
              fields={formFields}
              initialData={selectedEstablishment || undefined}
              submitLabel="Sauvegarder"
              showCancel={true}
            />

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setSelectedEstablishment(null);
              }}
              onConfirm={handleDelete}
              title="Désactiver l'hôpital ?"
              message={`Êtes-vous sûr de vouloir désactiver l'établissement "${selectedEstablishment?.name}" ?`}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}