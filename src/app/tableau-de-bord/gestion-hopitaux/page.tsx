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
import { Plus, Building2, Phone, Mail, MapPin, Hash } from 'lucide-react';

interface Hopital {
  id: string;
  matricule: string;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
  dateCreation: string;
  actif: boolean;
  nombreServices?: number;
  nombreEncadrants?: number;
}

// Type pour les données du formulaire
interface HopitalFormData {
  matricule: string;
  nom: string;
  adresse: string;
  email: string;
  telephone: string;
}

export default function GestionHopitaux() {
  // Données initiales des hôpitaux
  const [hopitaux, setHopitaux] = useState<Hopital[]>([
    {
      id: '1',
      matricule: 'HOP-2025-001',
      nom: 'Hôpital THENIA',
      adresse: 'Rue de la Santé, Thenia, Boumerdes',
      email: 'direction@hopital-thenia.dz',
      telephone: '+213 25 45 67 89',
      dateCreation: '15/10/2025',
      actif: true,
      nombreServices: 12,
      nombreEncadrants: 45
    },
    {
      id: '2',
      matricule: 'HOP-2025-002',
      nom: 'CHU DELLES',
      adresse: 'Avenue des Martyrs, Alger Centre',
      email: 'contact@chu-delles.dz',
      telephone: '+213 21 23 45 67',
      dateCreation: '10/11/2025',
      actif: true,
      nombreServices: 18,
      nombreEncadrants: 68
    },
    {
      id: '3',
      matricule: 'HOP-2025-003',
      nom: 'Centre Bordj Menail',
      adresse: 'Route Nationale, Bordj Menail, Blida',
      email: 'administration@centre-bordjmenail.dz',
      telephone: '+213 25 78 90 12',
      dateCreation: '05/11/2025',
      actif: true,
      nombreServices: 8,
      nombreEncadrants: 32
    },
    {
      id: '4',
      matricule: 'HOP-2024-001',
      nom: 'Hôpital Mustapha Bacha',
      adresse: 'Place du 1er Mai, Alger',
      email: 'info@hopital-mustapha.dz',
      telephone: '+213 21 34 56 78',
      dateCreation: '20/09/2024',
      actif: false,
      nombreServices: 15,
      nombreEncadrants: 52
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('nom');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHopital, setSelectedHopital] = useState<Hopital | null>(null);

  // Configuration des colonnes du tableau (champs demandés)
  const columns = [
    { 
      key: 'matricule', 
      label: 'Matricule',
      render: (_: unknown, row: Hopital) => (
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-400" />
          <span className="font-mono">{row.matricule}</span>
        </div>
      )
    },
    { 
      key: 'nom', 
      label: 'Nom de l\'Établissement',
      render: (_: unknown, row: Hopital) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{row.nom}</div>
            {row.nombreServices && (
              <div className="text-xs text-gray-500">
                {row.nombreServices} service{row.nombreServices > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      )
    },
    { 
      key: 'adresse', 
      label: 'Adresse',
      render: (_: unknown, row: Hopital) => (
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{row.adresse}</span>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email',
      render: (_: unknown, row: Hopital) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <a 
            href={`mailto:${row.email}`} 
            className="text-teal-600 hover:text-teal-800 hover:underline text-sm"
          >
            {row.email}
          </a>
        </div>
      )
    },
    { 
      key: 'telephone', 
      label: 'Téléphone',
      render: (_: unknown, row: Hopital) => (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <a 
            href={`tel:${row.telephone.replace(/\s+/g, '')}`} 
            className="text-gray-700 hover:text-teal-600 hover:underline text-sm"
          >
            {row.telephone}
          </a>
        </div>
      )
    },
    { key: 'dateCreation', label: 'Date de création' }
  ];

  // Configuration des champs du formulaire (champs demandés)
  const formFields = [
    { 
      name: 'matricule', 
      label: 'Matricule', 
      type: 'text' as const, 
      placeholder: 'Ex: HOP-2025-001', 
      required: true,
      icon: <Hash className="w-5 h-5 text-gray-400" />
    },
    { 
      name: 'nom', 
      label: 'Nom de l\'Établissement', 
      type: 'text' as const, 
      placeholder: 'Nom complet de l\'hôpital', 
      required: true,
      icon: <Building2 className="w-5 h-5 text-gray-400" />
    },
    { 
      name: 'adresse', 
      label: 'Adresse complète', 
      type: 'text' as const, 
      placeholder: 'Adresse postale complète', 
      required: true,
      icon: <MapPin className="w-5 h-5 text-gray-400" />
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'email' as const, 
      placeholder: 'email@etablissement.dz', 
      required: true,
      icon: <Mail className="w-5 h-5 text-gray-400" />
    },
    { 
      name: 'telephone', 
      label: 'Numéro de téléphone', 
      type: 'tel' as const, 
      placeholder: '+213 XX XX XX XX', 
      required: true,
      icon: <Phone className="w-5 h-5 text-gray-400" />
    }
  ];

  // Options de filtrage
  const filterOptions = [
    { value: 'nom', label: 'Nom' },
    { value: 'matricule', label: 'Matricule' },
    { value: 'adresse', label: 'Adresse' },
    { value: 'email', label: 'Email' }
  ];

  // Filtrage des données
  const filteredHopitaux = hopitaux.filter((hopital) => {
    const searchLower = searchTerm.toLowerCase();
    switch (filterBy) {
      case 'nom':
        return hopital.nom.toLowerCase().includes(searchLower);
      case 'matricule':
        return hopital.matricule.toLowerCase().includes(searchLower);
      case 'adresse':
        return hopital.adresse.toLowerCase().includes(searchLower);
      case 'email':
        return hopital.email.toLowerCase().includes(searchLower);
      default:
        return true;
    }
  });

  // Générer un matricule automatique
  const generateMatricule = () => {
    const currentYear = new Date().getFullYear();
    const count = hopitaux.filter(h => h.matricule.includes(`-${currentYear}-`)).length + 1;
    return `HOP-${currentYear}-${count.toString().padStart(3, '0')}`;
  };

  // Ajouter un hôpital
  const handleAdd = (data: HopitalFormData) => {
    const newHopital: Hopital = {
      id: Date.now().toString(),
      matricule: data.matricule || generateMatricule(),
      nom: data.nom,
      adresse: data.adresse,
      email: data.email,
      telephone: data.telephone,
      dateCreation: new Date().toLocaleDateString('fr-FR'),
      actif: true,
      nombreServices: 0,
      nombreEncadrants: 0
    };
    setHopitaux([...hopitaux, newHopital]);
    setShowAddModal(false);
  };

  // Modifier un hôpital
  const handleEdit = (data: Partial<HopitalFormData>) => {
    if (selectedHopital) {
      setHopitaux(hopitaux.map(h =>
        h.id === selectedHopital.id ? { ...selectedHopital, ...data } : h
      ));
      setShowEditModal(false);
      setSelectedHopital(null);
    }
  };

  // Désactiver un hôpital
  const handleDelete = () => {
    if (selectedHopital) {
      setHopitaux(hopitaux.map(h =>
        h.id === selectedHopital.id ? { ...h, actif: false } : h
      ));
      setShowDeleteModal(false);
      setSelectedHopital(null);
    }
  };

  // Réactiver un hôpital
  const handleReactivate = (hopital: Hopital) => {
    setHopitaux(hopitaux.map(h =>
      h.id === hopital.id ? { ...h, actif: true } : h
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion des Hôpitaux" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            
            {/* En-tête avec statistiques */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Gestion des Hôpitaux</h1>
                  <p className="text-gray-600">Gérez les établissements hospitaliers partenaires</p>
                </div>
                
                {/* Statistiques rapides */}
                <div className="flex items-center gap-4">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-500">Hôpitaux actifs</div>
                    <div className="text-xl font-bold text-teal-600">
                      {hopitaux.filter(h => h.actif).length}
                    </div>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-500">Total services</div>
                    <div className="text-xl font-bold text-blue-600">
                      {hopitaux.reduce((sum, h) => sum + (h.nombreServices || 0), 0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Barre de recherche et actions */}
              <div className="flex items-center gap-4">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  placeholder={`Rechercher un hôpital par ${filterBy}`}
                />

                <FilterButton
                  options={filterOptions}
                  selectedFilter={filterBy}
                  onFilterChange={setFilterBy}
                />

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium shadow-sm hover:shadow-md transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Nouvel Hôpital
                </button>
              </div>
            </div>

            {/* Tableau */}
            <DataTable
              title="Liste des hôpitaux partenaires"
              columns={columns}
              data={filteredHopitaux}
              onEdit={(item: Hopital) => {
                setSelectedHopital(item);
                setShowEditModal(true);
              }}
              onDelete={(item: Hopital) => {
                setSelectedHopital(item);
                setShowDeleteModal(true);
              }}
              actifKey="actif"
              additionalActions={(item: Hopital) => (
                !item.actif ? (
                  <button
                    onClick={() => handleReactivate(item)}
                    className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium"
                  >
                    Réactiver
                  </button>
                ) : null
              )}
            />

            {/* Indicateur si aucun résultat */}
            {filteredHopitaux.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun hôpital trouvé</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? `Aucun résultat pour "${searchTerm}"` : "Aucun hôpital n'est enregistré"}
                </p>
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-teal-600 hover:text-teal-800 font-medium"
                  >
                    Réinitialiser la recherche
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter le premier hôpital
                  </button>
                )}
              </div>
            )}

            {/* Modals */}
            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouvel hôpital"
              icon={<Building2 className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Hôpital"
              initialData={{ matricule: generateMatricule() }}
            />

            <FormModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedHopital(null);
              }}
              onSubmit={handleEdit}
              title="Modifier l'hôpital"
              icon={<Building2 className="w-6 h-6 text-white" />}
              fields={formFields}
              initialData={selectedHopital}
              submitLabel="Sauvegarder"
              showCancel={true}
            />

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setSelectedHopital(null);
              }}
              onConfirm={handleDelete}
              title="Désactiver l'hôpital ?"
              message={`Êtes-vous sûr de vouloir désactiver l'hôpital "${selectedHopital?.nom}" ? 
              Les étudiants ne pourront plus postuler aux stages de cet établissement.`}
              confirmText="Désactiver"
              cancelText="Annuler"
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}