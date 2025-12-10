"use client";

import { useState, useMemo } from 'react';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtablissement from '../components/SidebarEtablissement';
import NavbarEtablissement from '../components/NavbarEtablissement';
import AnnonceCard from './components/AnnonceCard';
import TableAnnonces from './components/TableAnnonces';
import AjoutAnnonceModal from './components/AjoutAnnonceModal';
import AnnonceDetailModal from './components/AnnonceDetailModal';
import ConfirmationModal from './components/ConfirmationModal';
import ValidationModal from './components/ValidationModal';
import FilterAnnonces from './components/FilterAnnonces';
import SearchBarAnnonces from './components/SearchBarAnnonces.tsx et ConfirmationModal';
import { 
  mockAnnonces, 
  mockServices,
  mockHopitaux,
  mockEncadrants,
  AnnonceStage,
  ConfigAnnonce,
  Encadrant,
  typeStageOptions,
  specialitesOptions,
  tagOptions
} from './models/annonce.model';
import { 
  Plus, 
  FileText, 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp,
  Bell,
  Copy,
  Eye,
  CalendarDays,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function PageGestionAnnonces() {
  // États
  const [annonces, setAnnonces] = useState<AnnonceStage[]>(mockAnnonces);
  const [filteredAnnonces, setFilteredAnnonces] = useState<AnnonceStage[]>(mockAnnonces);
  const [selectedAnnonce, setSelectedAnnonce] = useState<AnnonceStage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    statut: 'tous',
    service: 'tous',
    hopital: 'tous',
    periode: 'tous',
    statutStage: 'tous'
  });

  // Statistiques
  const stats = useMemo(() => {
    const total = annonces.length;
    const brouillons = annonces.filter(a => a.statut === 'brouillon').length;
    const publiees = annonces.filter(a => a.statut === 'publiée').length;
    const actives = annonces.filter(a => a.statut === 'active').length;
    const cloturees = annonces.filter(a => a.statut === 'clôturée').length;
    
    const totalCandidatures = annonces.reduce((acc, a) => 
      acc + a.candidaturesEnAttente + a.candidaturesAcceptees + a.candidaturesRefusees, 0
    );
    
    const totalPlaces = annonces.reduce((acc, a) => acc + a.placesTotal, 0);
    const placesDisponibles = annonces.reduce((acc, a) => acc + a.placesDisponibles, 0);
    
    const nouvellesAnnonces = annonces.filter(a => a.isNew).length;
    const annoncesUrgentes = annonces.filter(a => {
      const dateLimite = new Date(a.dateLimiteCandidature);
      const maintenant = new Date();
      const diffJours = Math.ceil((dateLimite.getTime() - maintenant.getTime()) / (1000 * 60 * 60 * 24));
      return diffJours <= 7 && a.statut === 'active';
    }).length;

    // Statistiques pour validations
    const attenteValidationChef = annonces.filter(a => 
      a.statut === 'publiée' && !a.validationChef
    ).length;
    
    const attenteValidationEtablissement = annonces.filter(a => 
      a.statut === 'publiée' && a.validationChef && !a.validationEtablissement
    ).length;

    const stagesEnCours = annonces.filter(a => a.statutStage === 'en_cours').length;
    const stagesTermines = annonces.filter(a => a.statutStage === 'termine').length;

    return {
      total,
      brouillons,
      publiees,
      actives,
      cloturees,
      totalCandidatures,
      totalPlaces,
      placesDisponibles,
      nouvellesAnnonces,
      annoncesUrgentes,
      attenteValidationChef,
      attenteValidationEtablissement,
      stagesEnCours,
      stagesTermines,
      tauxOccupation: Math.round(((totalPlaces - placesDisponibles) / totalPlaces) * 100) || 0
    };
  }, [annonces]);

  // Filtrage et recherche
  useMemo(() => {
    let result = annonces;

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(annonce =>
        annonce.titre.toLowerCase().includes(term) ||
        annonce.description.toLowerCase().includes(term) ||
        annonce.serviceNom.toLowerCase().includes(term) ||
        annonce.hopitalNom.toLowerCase().includes(term) ||
        annonce.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    // Filtre par statut
    if (filters.statut !== 'tous') {
      result = result.filter(annonce => annonce.statut === filters.statut);
    }

    // Filtre par service
    if (filters.service !== 'tous') {
      result = result.filter(annonce => annonce.serviceId === filters.service);
    }

    // Filtre par hôpital
    if (filters.hopital !== 'tous') {
      result = result.filter(annonce => annonce.hopitalId === filters.hopital);
    }

    // Filtre par période
    if (filters.periode !== 'tous') {
      const maintenant = new Date();
      result = result.filter(annonce => {
        const dateLimite = new Date(annonce.dateLimiteCandidature);
        const diffJours = Math.ceil((dateLimite.getTime() - maintenant.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.periode) {
          case 'urgent':
            return diffJours <= 7;
          case 'prochain':
            return diffJours > 7 && diffJours <= 30;
          case 'futur':
            return diffJours > 30;
          default:
            return true;
        }
      });
    }

    // Filtre par statut de stage
    if (filters.statutStage !== 'tous') {
      result = result.filter(annonce => annonce.statutStage === filters.statutStage);
    }

    setFilteredAnnonces(result);
  }, [annonces, searchTerm, filters]);

  // Handlers
  const handleAddAnnonce = (config: ConfigAnnonce) => {
    const service = mockServices.find(s => s.id === config.serviceId);
    const hopital = mockHopitaux.find(h => h.id === config.hopitalId);
    const chefService = mockEncadrants.find(e => e.id === config.chefServiceId);
    
    // Vérifier les conflits de chef de service
    const conflitChef = annonces.filter(a => 
      a.statut !== 'clôturée' && 
      a.statut !== 'archivée' &&
      a.chefServiceId === config.chefServiceId
    );

    if (conflitChef.length > 0) {
      alert('Ce chef de service a déjà un stage actif. Un chef ne peut avoir qu\'un stage à la fois.');
      return;
    }

    // Vérifier les conflits de dates pour le même service
    const dateDebut = new Date(config.dateDebut);
    const dateFin = new Date(config.dateFin);
    
    const conflitDates = annonces.filter(a => 
      a.statut !== 'clôturée' && 
      a.statut !== 'archivée' &&
      a.serviceId === config.serviceId &&
      (
        (dateDebut >= new Date(a.dateDebut) && dateDebut <= new Date(a.dateFin)) ||
        (dateFin >= new Date(a.dateDebut) && dateFin <= new Date(a.dateFin)) ||
        (dateDebut <= new Date(a.dateDebut) && dateFin >= new Date(a.dateFin))
      )
    );

    if (conflitDates.length > 0) {
      alert('Conflit de dates avec un autre stage dans le même service.');
      return;
    }
  
    // Filtrer les encadrants pour s'assurer qu'ils existent
    const encadrants = config.encadrantsIds
      .map(id => mockEncadrants.find(e => e.id === id))
      .filter((encadrant): encadrant is Encadrant => encadrant !== undefined);
    
    const dureeSemaines = Math.ceil((dateFin.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24 * 7));

    const newAnnonce: AnnonceStage = {
      id: `A${annonces.length + 1}`,
      titre: config.titre,
      description: config.description,
      serviceId: config.serviceId,
      serviceNom: service?.nom || 'Service inconnu',
      hopitalId: config.hopitalId,
      hopitalNom: hopital?.nom || 'Hôpital inconnu',
      dateDebut: config.dateDebut,
      dateFin: config.dateFin,
      dureeSemaines,
      dateLimiteCandidature: config.dateLimiteCandidature,
      placesDisponibles: config.placesTotal,
      placesTotal: config.placesTotal,
      candidaturesEnAttente: 0,
      candidaturesAcceptees: 0,
      candidaturesRefusees: 0,
      chefServiceId: config.chefServiceId,
      chefServiceNom: chefService?.nom || 'Chef inconnu',
      encadrants: encadrants,
      horaireQuotidien: config.horaireQuotidien,
      statut: config.publierImmediatement ? 'publiée' : 'brouillon',
      validationChef: false,
      validationEtablissement: false,
      etudiantsAcceptes: [],
      statutStage: 'non_debute',
      datePublication: config.publierImmediatement ? new Date().toISOString().split('T')[0] : null,
      dateCloture: null,
      isNew: config.publierImmediatement ? true : false,
      tags: config.tags,
      typeStage: config.typeStage,
      specialitesRequerues: config.specialitesRequerues,
      prerequis: config.prerequis,
      vues: 0,
      favoris: 0
    };

    setAnnonces([...annonces, newAnnonce]);
    setShowAddModal(false);
    
    if (config.publierImmediatement) {
      alert(`Annonce "${config.titre}" publiée avec succès ! Email envoyé aux étudiants abonnés.`);
    } else {
      alert(`Annonce "${config.titre}" sauvegardée en brouillon.`);
    }
  };

  const handleUpdateAnnonce = (id: string, updates: Partial<AnnonceStage>) => {
    setAnnonces(annonces.map(annonce => {
      if (annonce.id === id) {
        return { ...annonce, ...updates };
      }
      return annonce;
    }));
  };

  const handleDeleteAnnonce = (id: string) => {
    const annonce = annonces.find(a => a.id === id);
    if (annonce && annonce.statutStage === 'en_cours') {
      alert('Impossible de supprimer un stage en cours.');
      return;
    }
    
    setAnnonces(annonces.filter(annonce => annonce.id !== id));
    setShowDeleteModal(false);
    alert('Annonce supprimée avec succès');
  };

  const handleDuplicateAnnonce = (id: string) => {
    const annonceToDuplicate = annonces.find(a => a.id === id);
    if (!annonceToDuplicate) return;

    const newAnnonce: AnnonceStage = {
      ...annonceToDuplicate,
      id: `A${annonces.length + 1}`,
      titre: `${annonceToDuplicate.titre} (Copie)`,
      datePublication: null,
      dateCloture: null,
      statut: 'brouillon',
      validationChef: false,
      validationEtablissement: false,
      etudiantsAcceptes: [],
      statutStage: 'non_debute',
      isNew: false,
      candidaturesEnAttente: 0,
      candidaturesAcceptees: 0,
      candidaturesRefusees: 0,
      placesDisponibles: annonceToDuplicate.placesTotal,
      vues: 0,
      favoris: 0
    };

    setAnnonces([...annonces, newAnnonce]);
    setShowDuplicateModal(false);
    alert('Annonce dupliquée avec succès en tant que brouillon');
  };

  const handleChangeStatut = (id: string, statut: AnnonceStage['statut']) => {
    const updates: Partial<AnnonceStage> = { statut };
    
    if (statut === 'publiée' || statut === 'active') {
      updates.datePublication = new Date().toISOString().split('T')[0];
      updates.isNew = true;
      alert('Notification envoyée aux étudiants abonnés !');
    }
    
    if (statut === 'clôturée') {
      updates.dateCloture = new Date().toISOString().split('T')[0];
      alert('Les nouvelles candidatures pour cette annonce sont maintenant suspendues');
    }

    handleUpdateAnnonce(id, updates);
  };

  const handleValidateChef = (id: string) => {
    setAnnonces(annonces.map(annonce => 
      annonce.id === id ? { ...annonce, validationChef: true } : annonce
    ));
  };

  const handleValidateEtablissement = (id: string) => {
    setAnnonces(annonces.map(annonce => 
      annonce.id === id ? { ...annonce, validationEtablissement: true } : annonce
    ));
  };

  const handleConfirmerStage = (id: string) => {
    const annonce = annonces.find(a => a.id === id);
    if (!annonce) return;

    // Vérifier si toutes les places sont remplies
    if (annonce.placesDisponibles > 0) {
      alert('Impossible de confirmer le stage : toutes les places ne sont pas encore attribuées.');
      return;
    }

    // Vérifier les validations
    if (!annonce.validationChef || !annonce.validationEtablissement) {
      alert('Les validations du chef de service et de l\'établissement sont requises.');
      return;
    }

    // Créer le stage actif
    const stageActif: AnnonceStage = {
      ...annonce,
      statut: 'active',
      statutStage: 'en_cours',
      dateDebutReelle: new Date().toISOString().split('T')[0],
      notes: Array(annonce.placesTotal).fill(null)
    };

    // Mettre à jour l'annonce
    setAnnonces(annonces.map(a => 
      a.id === id ? stageActif : a
    ));

    // Envoyer notifications
    alert('Stage confirmé ! Notifications envoyées aux étudiants et au chef de service.');
    setShowValidationModal(false);
  };

  const handleTerminerStage = (id: string) => {
    const annonce = annonces.find(a => a.id === id);
    if (!annonce) return;

    if (annonce.statutStage !== 'en_cours') {
      alert('Seuls les stages en cours peuvent être terminés.');
      return;
    }

    // Vérifier si toutes les notes sont attribuées
    const notesManquantes = annonce.notes?.some(note => note === null);
    if (notesManquantes) {
      alert('Impossible de terminer le stage : toutes les notes ne sont pas encore attribuées.');
      return;
    }

    const stageTermine: AnnonceStage = {
      ...annonce,
      statut: 'archivée',
      statutStage: 'termine',
      dateCloture: new Date().toISOString().split('T')[0]
    };

    setAnnonces(annonces.map(a => 
      a.id === id ? stageTermine : a
    ));

    alert('Stage terminé avec succès !');
  };

  const handleEditTable = (annonce: AnnonceStage) => {
    setSelectedAnnonce(annonce);
    setShowAddModal(true);
  };

  const handleViewDetailTable = (annonce: AnnonceStage) => {
    setSelectedAnnonce(annonce);
    setShowDetailModal(true);
  };

  const handleDuplicateTable = (annonce: AnnonceStage) => {
    setSelectedAnnonce(annonce);
    setShowDuplicateModal(true);
  };

  const handleValidationModal = (annonce: AnnonceStage) => {
    setSelectedAnnonce(annonce);
    setShowValidationModal(true);
  };

  return (
    <>
      <NavbarEtablissement />
      <Header 
        spaceName="Publication des Annonces de Stages" 
        notificationCount={stats.annoncesUrgentes + stats.nouvellesAnnonces + stats.attenteValidationChef} 
      />
      
      <div className="flex min-h-screen bg-white">
        <SidebarEtablissement />
        
        {/* Contenu principal */}
        <main className="flex-1 overflow-x-hidden">
          <div className="p-8">
            {/* En-tête avec statistiques */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Publication des Annonces de Stages
                  </h1>
                  <p className="text-gray-600">
                    Créer, publier et gérer toutes les annonces de stages pour l'ensemble des services
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Nouvelle Annonce
                </button>
              </div>

              {/* Cartes de statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Annonces Total</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <FileText className="w-8 h-8 text-teal-500" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {stats.actives} actives
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                      {stats.brouillons} brouillons
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Candidatures Total</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCandidatures}</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Places: {stats.totalPlaces - stats.placesDisponibles}/{stats.totalPlaces}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Stages en Cours</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.stagesEnCours}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {stats.stagesEnCours} en cours
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {stats.stagesTermines} terminés
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Validations en Attente</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.attenteValidationChef + stats.attenteValidationEtablissement}</p>
                    </div>
                    <Bell className="w-8 h-8 text-red-500" />
                  </div>
                  {stats.attenteValidationChef > 0 && (
                    <p className="text-sm text-red-600 mt-2">
                      {stats.attenteValidationChef} chef(s) à valider
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 md:flex-[1] lg:flex-[1]1">
                  <SearchBarAnnonces onSearch={setSearchTerm} />
                </div>
                <div className="w-full md:w-auto md:flex-1">
                  <FilterAnnonces
                    filters={filters}
                    onFilterChange={setFilters}
                    annonces={annonces}
                    services={mockServices}
                    hopitaux={mockHopitaux}
                  />
                </div>
              </div>
            </div>

            {/* Vue cartes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Annonces ({filteredAnnonces.length})
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Publiée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    <span>Brouillon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>New</span>
                  </div>
                </div>
              </div>

              {filteredAnnonces.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-500">Aucune annonce ne correspond aux critères</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnnonces.map(annonce => (
                    <AnnonceCard
                      key={annonce.id}
                      annonce={annonce}
                      onViewDetail={() => {
                        setSelectedAnnonce(annonce);
                        setShowDetailModal(true);
                      }}
                      onEdit={() => {
                        setSelectedAnnonce(annonce);
                        setShowAddModal(true);
                      }}
                      onDelete={() => {
                        setSelectedAnnonce(annonce);
                        setShowDeleteModal(true);
                      }}
                      onDuplicate={() => {
                        setSelectedAnnonce(annonce);
                        setShowDuplicateModal(true);
                      }}
                      onValidate={() => {
                        handleValidationModal(annonce);
                      }}
                      onChangeStatut={(statut) => handleChangeStatut(annonce.id, statut)}
                      onTerminer={() => handleTerminerStage(annonce.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Vue tableau */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Vue Synthétique
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays className="w-4 h-4" />
                  <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <TableAnnonces
                annonces={filteredAnnonces}
                onEdit={handleEditTable}
                onViewDetail={handleViewDetailTable}
                onDuplicate={handleDuplicateTable}
                onValidate={handleValidationModal}
              />
            </div>
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      <AjoutAnnonceModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedAnnonce(null);
        }}
        onSave={selectedAnnonce ? 
          (config) => handleUpdateAnnonce(selectedAnnonce.id, {
            titre: config.titre,
            description: config.description,
            serviceId: config.serviceId,
            hopitalId: config.hopitalId,
            dateDebut: config.dateDebut,
            dateFin: config.dateFin,
            dateLimiteCandidature: config.dateLimiteCandidature,
            placesTotal: config.placesTotal,
            placesDisponibles: config.placesTotal,
            chefServiceId: config.chefServiceId,
            tags: config.tags,
            typeStage: config.typeStage,
            specialitesRequerues: config.specialitesRequerues,
            prerequis: config.prerequis,
            horaireQuotidien: config.horaireQuotidien,
            statut: config.publierImmediatement ? 'publiée' : 'brouillon',
            datePublication: config.publierImmediatement ? new Date().toISOString().split('T')[0] : null,
            isNew: config.publierImmediatement ? true : false
          }) : 
          handleAddAnnonce
        }
        services={mockServices}
        hopitaux={mockHopitaux}
        encadrants={mockEncadrants}
        typeStageOptions={typeStageOptions}
        specialitesOptions={specialitesOptions}
        tagOptions={tagOptions}
        annonceToEdit={selectedAnnonce || undefined} // CORRECTION ICI
        isEditing={!!selectedAnnonce}
        annonces={annonces}
      />

      <AnnonceDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        annonce={selectedAnnonce}
        encadrants={mockEncadrants}
        onChangeStatut={(statut) => {
          if (selectedAnnonce) {
            handleChangeStatut(selectedAnnonce.id, statut);
          }
        }}
        onTerminer={() => {
          if (selectedAnnonce) {
            handleTerminerStage(selectedAnnonce.id);
          }
        }}
      />

      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        annonce={selectedAnnonce}
        onValidateChef={handleValidateChef}
        onValidateEtablissement={handleValidateEtablissement}
        onConfirmerStage={() => {
          if (selectedAnnonce) {
            handleConfirmerStage(selectedAnnonce.id);
          }
        }}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (selectedAnnonce) {
            handleDeleteAnnonce(selectedAnnonce.id);
          }
        }}
        title="Supprimer l'annonce"
        message={`Êtes-vous sûr de vouloir supprimer l'annonce "${selectedAnnonce?.titre}" ? Cette action est irréversible.`}
        type="danger"
      />

      <ConfirmationModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        onConfirm={() => {
          if (selectedAnnonce) {
            handleDuplicateAnnonce(selectedAnnonce.id);
          }
        }}
        title="Dupliquer l'annonce"
        message={`Dupliquer l'annonce "${selectedAnnonce?.titre}" ? La copie sera créée en tant que brouillon.`}
        type="info"
        confirmText="Dupliquer"
      />
    </>
  );
}