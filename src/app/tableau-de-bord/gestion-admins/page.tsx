"use client";

import { useState } from 'react';
import NavbarAdmin from '../Components/NavbarAdmin';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarAdmin from '../Components/SidebarAdmin';
import { Plus, UserCheck } from 'lucide-react';
import SearchBar from '../Components/SearchBar';
import FilterButton from '../Components/FilterButton';
import DataTable from '../Components/DataTable';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';

interface Admin {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  actif: boolean;
}

export default function GestionAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: '1',
      nom: 'Benali',
      prenom: 'Sami',
      email: 'sami.b@univ.dz',
      role: 'Admin Stage',
      actif: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('nom');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const columns = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rôle' }
  ];

  const formFields = [
    { name: 'nom', label: 'Nom', type: 'text' as const, placeholder: 'Nom', required: true },
    { name: 'prenom', label: 'Prénom', type: 'text' as const, placeholder: 'Prénom', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'Email', required: true },
    { name: 'motDePasse', label: 'Mot de passe', type: 'password' as const, placeholder: 'Mot de passe', required: true },
    { name: 'role', label: 'Rôle', type: 'select' as const, options: [
        { value: 'Admin Stage', label: 'Admin Stage' },
        { value: 'Admin Etablissement', label: 'Admin Etablissement' }
      ], required: true
    }
  ];

  const filterOptions = [
    { value: 'nom', label: 'Nom' },
    { value: 'prenom', label: 'Prénom' },
    { value: 'role', label: 'Rôle' }
  ];

  const filteredAdmins = admins.filter((admin) => {
    const searchLower = searchTerm.toLowerCase();
    const value = (admin as any)[filterBy] || '';
    return value.toLowerCase().includes(searchLower);
  });

  const handleAdd = (data: any) => {
    const newAdmin: Admin = {
      id: Date.now().toString(),
      ...data,
      actif: true
    };
    setAdmins([...admins, newAdmin]);
    setShowAddModal(false);
  };

  const handleEdit = (data: any) => {
    if (selectedAdmin) {
      setAdmins(admins.map(a =>
        a.id === selectedAdmin.id ? { ...selectedAdmin, ...data } : a
      ));
      setShowEditModal(false);
      setSelectedAdmin(null);
    }
  };

  const handleDelete = () => {
    if (selectedAdmin) {
      setAdmins(admins.map(a =>
        a.id === selectedAdmin.id ? { ...a, actif: false } : a
      ));
      setShowDeleteModal(false);
      setSelectedAdmin(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion Admins" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 p-8 rounded-3xl ml-5 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Gestion des Admins secondaires
            </h1>

            <div className="flex items-center mb-7 gap-4">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder={`Rechercher un admin par ${filterBy}...`}
              />
              <FilterButton
                options={filterOptions}
                selectedFilter={filterBy}
                onFilterChange={setFilterBy}
              />
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
              >
                <Plus className="w-5 h-5" /> Nouvel Admin
              </button>
            </div>

            <DataTable
              title="Tableau des Admins"
              columns={columns}
              data={filteredAdmins}
              onEdit={(item) => {
                setSelectedAdmin(item);
                setShowEditModal(true);
              }}
              onDelete={(item) => {
                setSelectedAdmin(item);
                setShowDeleteModal(true);
              }}
              actifKey="actif"
            />

            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouvel admin"
              icon={<Plus className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Admin"
            />

            {selectedAdmin && showEditModal && (
              <FormModal
                isOpen={showEditModal}
                onClose={() => {
                  setShowEditModal(false);
                  setSelectedAdmin(null);
                }}
                onSubmit={handleEdit}
                title="Modifier Admin"
                icon={<UserCheck className="w-6 h-6 text-white" />}
                fields={formFields}
                initialData={selectedAdmin}
                submitLabel="Sauvegarder"
                showCancel={true}
              />
            )}

            {selectedAdmin && showDeleteModal && (
              <DeleteModal
                isOpen={showDeleteModal}
                onClose={() => {
                  setShowDeleteModal(false);
                  setSelectedAdmin(null);
                }}
                onConfirm={handleDelete}
                title="Supprimer Admin ?"
                message={`Êtes-vous sûr de vouloir supprimer l'admin ${selectedAdmin.prenom} ${selectedAdmin.nom} ?`}
              />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
