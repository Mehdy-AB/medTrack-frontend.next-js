"use client";

import { useState } from 'react';
import NavbarAdmin from '../Components/NavbarAdmin';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarAdmin from '../Components/SidebarAdmin';
import SearchBar from '../Components/SearchBar';
import FilterButton from '../Components/FilterButton';
import DataTable from '../Components/DataTable';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import { Plus, UserCheck } from 'lucide-react';

interface Encadrant {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  hopital: string;
  service: string;
  specialite: string;
  motDePasse: string;
  photo?: string;
  actif: boolean;
}

// Type pour les données du formulaire
interface EncadrantFormData {
  photo?: string;
  matricule: string;
  nom: string;
  prenom: string;
  hopital: string;
  service: string;
  specialite: string;
  motDePasse: string;
}

export default function GestionEncadrants() {
  const [encadrants, setEncadrants] = useState<Encadrant[]>([
    {
      id: '1',
      matricule: '2025852214',
      nom: 'Lounès',
      prenom: 'Karim',
      hopital: 'CHU Thenia',
      service: 'Chirurgie',
      specialite: 'Chirurgie Cardiaque',
      motDePasse: 'pass123',
      photo: '/img/profil-encadrant.jpg',
      actif: true
    },
    {
      id: '2',
      matricule: '5302021477',
      nom: 'Benali',
      prenom: 'Ahmed',
      hopital: 'CHU Bordj Menal',
      service: 'Médecine Interne',
      specialite: 'Cardiologie',
      motDePasse: 'pass456',
      photo: '/img/profil-encadrant.jpg',
      actif: true
    },
    {
      id: '3',
      matricule: '3202048547',
      nom: 'Rahmani',
      prenom: 'Sarah',
      hopital: 'CHU Delles',
      service: 'Pédiatrie',
      specialite: 'Néonatologie',
      motDePasse: 'pass789',
      photo: 'https://i.pravatar.cc/150?img=5',
      actif: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('nom');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEncadrant, setSelectedEncadrant] = useState<Encadrant | null>(null);

  // Configuration des colonnes du tableau
  const columns = [
    { key: 'matricule', label: 'Matricule' },
    { 
      key: 'nomComplet', 
      label: 'Nom complet',
      render: (_: unknown, row: Encadrant) => (
        <div className="flex items-center gap-3">
          {row.photo && (
            <img 
              src={row.photo} 
              alt={`${row.prenom} ${row.nom}`}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
          )}
          <span>{`${row.prenom} ${row.nom}`}</span>
        </div>
      )
    },
    { key: 'hopital', label: 'Hôpital' },
    { key: 'service', label: 'Service' },
    { key: 'specialite', label: 'Spécialité' }
  ];

  // Configuration des champs du formulaire AVEC photo
  const formFields = [
    { 
      name: 'photo', 
      label: 'Photo de profil', 
      type: 'file' as const, 
      accept: 'image/*',
      required: false 
    },
    { name: 'matricule', label: 'Matricule', type: 'text' as const, placeholder: 'Matricule', required: true },
    { name: 'nom', label: 'Nom', type: 'text' as const, placeholder: 'Nom', required: true },
    { name: 'prenom', label: 'Prénom', type: 'text' as const, placeholder: 'Prénom', required: true },
    { name: 'hopital', label: 'Hôpital', type: 'text' as const, placeholder: 'Hôpital', required: true },
    { name: 'service', label: 'Service', type: 'text' as const, placeholder: 'Service', required: true },
    { name: 'specialite', label: 'Spécialité', type: 'text' as const, placeholder: 'Spécialité', required: true },
    { name: 'motDePasse', label: 'Mot de passe', type: 'password' as const, placeholder: 'Mot de passe', required: true }
  ];

  // Options de filtrage
  const filterOptions = [
    { value: 'nom', label: 'Nom' },
    { value: 'specialite', label: 'Spécialité' },
    { value: 'hopital', label: 'Hôpital' }
  ];

  // Filtrage des données
  const filteredEncadrants = encadrants.filter((encadrant) => {
    const searchLower = searchTerm.toLowerCase();
    if (filterBy === 'nom') {
      return encadrant.nom.toLowerCase().includes(searchLower) || 
             encadrant.prenom.toLowerCase().includes(searchLower);
    }
    if (filterBy === 'specialite') {
      return encadrant.specialite.toLowerCase().includes(searchLower);
    }
    if (filterBy === 'hopital') {
      return encadrant.hopital.toLowerCase().includes(searchLower);
    }
    return true;
  });

  // Ajouter un encadrant
  const handleAdd = (data: EncadrantFormData) => {
    // TODO BACKEND: Envoyer data à l'API POST /api/encadrants/create
    const newEncadrant: Encadrant = {
      id: Date.now().toString(),
      ...data,
      actif: true
    };
    setEncadrants([...encadrants, newEncadrant]);
    setShowAddModal(false);
  };

  // Modifier un encadrant
  const handleEdit = (data: Partial<EncadrantFormData>) => {
    // TODO BACKEND: Envoyer data à l'API PUT /api/encadrants/${id}
    if (selectedEncadrant) {
      setEncadrants(encadrants.map(e =>
        e.id === selectedEncadrant.id ? { ...selectedEncadrant, ...data } : e
      ));
      setShowEditModal(false);
      setSelectedEncadrant(null);
    }
  };

  // Désactiver un encadrant
  const handleDelete = () => {
    // TODO BACKEND: Envoyer à l'API PATCH /api/encadrants/${id}/deactivate
    if (selectedEncadrant) {
      setEncadrants(encadrants.map(e =>
        e.id === selectedEncadrant.id ? { ...e, actif: false } : e
      ));
      setShowDeleteModal(false);
      setSelectedEncadrant(null);
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
            
            {/* Titre */}
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Gestion des encadrants
            </h1>

            {/* Barre de recherche et actions */}
            <div className="flex items-center mb-7 gap-4">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder={`Rechercher un encadrant par ${filterBy}...`}
              />

              <FilterButton
                options={filterOptions}
                selectedFilter={filterBy}
                onFilterChange={setFilterBy}
              />

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Nouveau Encadrant
              </button>
            </div>

            {/* Tableau */}
            <DataTable
              title="Tableau des encadrants"
              columns={columns}
              data={filteredEncadrants}
              onEdit={(item: Encadrant) => {
                setSelectedEncadrant(item);
                setShowEditModal(true);
              }}
              onDelete={(item: Encadrant) => {
                setSelectedEncadrant(item);
                setShowDeleteModal(true);
              }}
              actifKey="actif"
            />

            {/* Modals */}
            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouveau encadrant"
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
              fields={formFields}
              initialData={selectedEncadrant}
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
              message={`Êtes-vous sûr de vouloir supprimer l'encadrant ${selectedEncadrant?.prenom} ${selectedEncadrant?.nom} ?`}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}