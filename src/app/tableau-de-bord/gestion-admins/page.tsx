"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import NavbarAdmin from '../Components/NavbarAdmin';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarAdmin from '../Components/SidebarAdmin';
import SearchInput from '@/app/Components/SearchInput';
import DataTable, { Column } from '@/app/Components/DataTable';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import { Plus, UserCheck, RefreshCw } from 'lucide-react';
import { authApi } from '@/services';
import { formatAxiosError } from '@/lib/error-handler';
import type { User } from '@/types/api.types';
import { mockAdminUser } from '@/mocks/mockData';

export default function GestionAdmins() {
  // State
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null);

  // Fetch admins
  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock fetch - in a real app we'd filter by role='admin'
      // For demo, just return the mock admin user in a list
      await new Promise(r => setTimeout(r, 500));
      setAdmins([mockAdminUser]);
    } catch (err) {
      console.error('Error fetching admins:', err);
      setError('Erreur lors du chargement des admins');
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  // Table columns
  const columns: Column<User>[] = [
    {
      key: 'name',
      header: 'Nom complet',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-700 text-sm font-medium">
              {(item.first_name?.[0] || '') + (item.last_name?.[0] || '')}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.first_name} {item.last_name}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </div>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'Téléphone',
      render: (item) => item.phone || '-'
    },
    {
      key: 'role',
      header: 'Rôle',
      render: (item) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 uppercase">
          {item.role}
        </span>
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
              setSelectedAdmin(item);
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
              setSelectedAdmin(item);
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
  const formFields = useMemo(() => [
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'password', label: 'Mot de passe', type: 'password' as const, required: true },
    { name: 'first_name', label: 'Prénom', type: 'text' as const, required: true },
    { name: 'last_name', label: 'Nom', type: 'text' as const, required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' as const, required: false },
  ], []);

  const editFormFields = useMemo(() =>
    formFields.filter(f => !['email', 'password'].includes(f.name)),
    [formFields]
  );

  // Handlers
  const handleAdd = async (data: Record<string, unknown>) => {
    try {
      // Mock add
      await new Promise(r => setTimeout(r, 500));
      const newAdmin = {
        ...mockAdminUser,
        id: `new-${Date.now()}`,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        email: data.email as string,
        phone: data.phone as string
      };
      setAdmins(prev => [...prev, newAdmin]);
      setShowAddModal(false);
    } catch (err) {
      console.error('Error creating admin:', err);
      alert(formatAxiosError(err, 'Erreur lors de la création'));
    }
  };

  const handleEdit = async (data: Record<string, unknown>) => {
    if (!selectedAdmin) return;

    try {
      // Mock edit
      await new Promise(r => setTimeout(r, 500));
      setAdmins(prev => prev.map(a => a.id === selectedAdmin.id ? { ...a, ...data } : a));
      setShowEditModal(false);
      setSelectedAdmin(null);
    } catch (err) {
      console.error('Error updating admin:', err);
      alert(formatAxiosError(err, 'Erreur lors de la mise à jour'));
    }
  };

  const handleDelete = async () => {
    if (!selectedAdmin) return;

    try {
      // Mock delete
      await new Promise(r => setTimeout(r, 500));
      setAdmins(prev => prev.filter(a => a.id !== selectedAdmin.id));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
    } catch (err) {
      console.error('Error deleting admin:', err);
      alert(formatAxiosError(err, 'Erreur lors de la suppression'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion des administrateurs" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">

            {/* Header with search and actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <SearchInput
                  value=""
                  onChange={() => { }}
                  placeholder="Rechercher un admin..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchAdmins}
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
                  Nouveau Admin
                </button>
              </div>
            </div>

            {/* Data Table */}
            <DataTable
              data={admins}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucun administrateur trouvé"
            />

            {/* Modals */}
            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouvel administrateur"
              icon={<Plus className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Admin"
            />

            <FormModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedAdmin(null);
              }}
              onSubmit={handleEdit}
              title="Modifier Admin"
              icon={<UserCheck className="w-6 h-6 text-white" />}
              fields={editFormFields}
              initialData={selectedAdmin ? {
                first_name: selectedAdmin.first_name,
                last_name: selectedAdmin.last_name,
                phone: selectedAdmin.phone,
              } : undefined}
              submitLabel="Sauvegarder"
              showCancel={true}
            />

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setSelectedAdmin(null);
              }}
              onConfirm={handleDelete}
              title="Supprimer Admin ?"
              message={`Êtes-vous sûr de vouloir supprimer ${selectedAdmin?.first_name} ${selectedAdmin?.last_name} ?`}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}