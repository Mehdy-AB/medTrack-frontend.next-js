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
import { Plus, GraduationCap } from 'lucide-react';

interface Etudiant {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  annee: string;
  specialite: string;
  motDePasse: string;
  dateCreation: string;
  actif: boolean;
  photo?: string;
}

// Type pour les données du formulaire
interface EtudiantFormData {
  photo?: string;
  matricule: string;
  nom: string;
  prenom: string;
  annee: string;
  specialite: string;
  motDePasse: string;
}

export default function GestionEtudiants() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([
    {
      id: '1',
      matricule: '22232025001',
      nom: 'Bouaid',
      prenom: 'Karim',
      annee: '3 ème année',
      specialite: 'Medecine générale',
      motDePasse: 'pass123',
      dateCreation: '12/10/2025',
      actif: true,
      photo: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      matricule: '22232025001',
      nom: 'Belkacem',
      prenom: 'Amina',
      annee: '3 ème année',
      specialite: 'Medecine générale',
      motDePasse: 'pass456',
      dateCreation: '03/11/2025',
      actif: true,
      photo: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '3',
      matricule: '22232258002',
      nom: 'Haddad',
      prenom: 'Sofiane',
      annee: '3 ème année',
      specialite: 'Medecine générale',
      motDePasse: 'pass789',
      dateCreation: '01/11/2025',
      actif: true,
      photo: 'https://i.pravatar.cc/150?img=1'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('matricule');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEtudiant, setSelectedEtudiant] = useState<Etudiant | null>(null);

  // Configuration des colonnes du tableau
  const columns = [
    { key: 'matricule', label: 'Matricule / ID' },
    { 
      key: 'nomComplet', 
      label: 'Nom complet',
      render: (_: unknown, row: Etudiant) => `${row.prenom} ${row.nom}`
    },
    { key: 'annee', label: 'Année' },
    { key: 'specialite', label: 'Spécialité' },
    { key: 'dateCreation', label: 'Date de création' }
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
    { name: 'annee', label: 'Année', type: 'text' as const, placeholder: 'Année', required: true },
    { name: 'specialite', label: 'Spécialité', type: 'text' as const, placeholder: 'Spécialité', required: true },
    { name: 'motDePasse', label: 'Mot de passe', type: 'password' as const, placeholder: 'Mot de passe', required: true }
  ];

  // Options de filtrage
  const filterOptions = [
    { value: 'matricule', label: 'Matricule' },
    { value: 'nom', label: 'Nom' },
    { value: 'annee', label: 'Année' }
  ];

  // Filtrage des données
  const filteredEtudiants = etudiants.filter((etudiant) => {
    const searchLower = searchTerm.toLowerCase();
    switch (filterBy) {
      case 'matricule':
        return etudiant.matricule.toLowerCase().includes(searchLower);
      case 'nom':
        return etudiant.nom.toLowerCase().includes(searchLower);
      case 'annee':
        return etudiant.annee.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  // Ajouter un étudiant
  const handleAdd = (data: EtudiantFormData) => {
    const newEtudiant: Etudiant = {
      id: Date.now().toString(),
      ...data,
      dateCreation: new Date().toLocaleDateString('fr-FR'),
      actif: true
    };
    setEtudiants([...etudiants, newEtudiant]);
    setShowAddModal(false);
  };

  // Modifier un étudiant
  const handleEdit = (data: Partial<EtudiantFormData>) => {
    if (selectedEtudiant) {
      setEtudiants(etudiants.map(e =>
        e.id === selectedEtudiant.id ? { ...selectedEtudiant, ...data } : e
      ));
      setShowEditModal(false);
      setSelectedEtudiant(null);
    }
  };

  // Désactiver un étudiant
  const handleDelete = () => {
    if (selectedEtudiant) {
      setEtudiants(etudiants.map(e =>
        e.id === selectedEtudiant.id ? { ...e, actif: false } : e
      ));
      setShowDeleteModal(false);
      setSelectedEtudiant(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion des étudiants" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            
            {/* Barre de recherche et actions */}
            <div className="flex items-center mb-7 gap-4">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder={`Rechercher un étudiant par ${filterBy}`}
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
                <Plus className="w-5 h-5" />
                Nouveau Étudiant
              </button>
            </div>

            {/* Tableau */}
            <DataTable
              title="Tableau des étudiants"
              columns={columns}
              data={filteredEtudiants}
              onEdit={(item: Etudiant) => {
                setSelectedEtudiant(item);
                setShowEditModal(true);
              }}
              onDelete={(item: Etudiant) => {
                setSelectedEtudiant(item);
                setShowDeleteModal(true);
              }}
              actifKey="actif"
            />

            {/* Modals */}
            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouveau étudiant"
              icon={<Plus className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Étudiant"
            />

            <FormModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedEtudiant(null);
              }}
              onSubmit={handleEdit}
              title="Modifier Étudiant"
              icon={<GraduationCap className="w-6 h-6 text-white" />}
              fields={formFields}
              initialData={selectedEtudiant}
              submitLabel="Sauvegarder"
              showCancel={true}
            />

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setSelectedEtudiant(null);
              }}
              onConfirm={handleDelete}
              title="Supprimer Étudiant ?"
              message={`Êtes-vous sûr de vouloir supprimer l'étudiant ${selectedEtudiant?.prenom} ${selectedEtudiant?.nom} ?`}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}