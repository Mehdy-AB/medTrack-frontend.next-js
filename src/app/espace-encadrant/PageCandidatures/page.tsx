"use client";

import { useState, useMemo } from 'react';
import NavbarEncadrant from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEncadrant from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchBarCandidatures from './components/SearchBarCandidatures';
import FilterCandidatures, { FilterState } from './components/FilterCandidatures';
import TableCandidatures from './components/TableCandidatures';
import PaginationCandidatures from './components/PaginationCandidatures';
import CandidatureModal from './components/CandidatureModal';
import ConfirmationModal from './components/ConfirmationModal';
import HistoriqueCandidatures from './components/HistoriqueCandidatures';
import { 
  mockCandidatures, 
  mockMedecins, 
  mockHistorique, 
  Candidature 
} from './models/candidature.model';

const ITEMS_PER_PAGE = 10;

export default function CandidaturesPage() {
  const [candidatures, setCandidatures] = useState<Candidature[]>(mockCandidatures);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    statut: '',
    specialite: '',
    anciennete: '',
    universite: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidature, setSelectedCandidature] = useState<Candidature | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showCandidatureModal, setShowCandidatureModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'accept' | 'reject' | 'mass'>('accept');
  const [pendingAction, setPendingAction] = useState<{
    type: 'accept' | 'reject';
    candidature?: Candidature;
    massIds?: string[];
  } | null>(null);

  // Fonction de filtrage et recherche
  const filteredCandidatures = useMemo(() => {
    let result = candidatures.filter(c => c.statut === 'en_attente');

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((candidature) => {
        return (
          candidature.nom.toLowerCase().includes(query) ||
          candidature.matricule.toLowerCase().includes(query) ||
          candidature.specialite.toLowerCase().includes(query) ||
          candidature.universite.toLowerCase().includes(query)
        );
      });
    }

    // Filtres
    if (filters.statut === 'Prioritaires') {
      result = result.filter(c => c.prioritaire);
    }
    
    if (filters.specialite) {
      result = result.filter(c => c.specialite === filters.specialite);
    }
    
    if (filters.anciennete) {
      switch(filters.anciennete) {
        case '< 3 jours':
          result = result.filter(c => c.anciennete < 3);
          break;
        case '3-7 jours':
          result = result.filter(c => c.anciennete >= 3 && c.anciennete <= 7);
          break;
        case '> 7 jours':
          result = result.filter(c => c.anciennete > 7);
          break;
      }
    }
    
    if (filters.universite) {
      result = result.filter(c => c.universite === filters.universite);
    }

    return result;
  }, [candidatures, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCandidatures.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCandidatures = filteredCandidatures.slice(startIndex, endIndex);

  // Statistiques
  const stats = useMemo(() => {
    const enAttente = candidatures.filter(c => c.statut === 'en_attente').length;
    const acceptees = candidatures.filter(c => c.statut === 'acceptee').length;
    const refusees = candidatures.filter(c => c.statut === 'refusee').length;
    const urgentes = candidatures.filter(c => c.prioritaire && c.statut === 'en_attente').length;
    
    return { enAttente, acceptees, refusees, urgentes };
  }, [candidatures]);

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleExport = (format: 'excel' | 'print') => {
    console.log(`Exporting as ${format}`, filteredCandidatures);
    alert(`Export en ${format.toUpperCase()} en cours...`);
  };

  const handleMassAction = (action: 'accept' | 'reject') => {
    if (selectedIds.length === 0) {
      alert('Veuillez sélectionner au moins une candidature');
      return;
    }
    
    setConfirmationType('mass');
    setPendingAction({ type: action, massIds: selectedIds });
    setShowConfirmationModal(true);
  };

  const handleViewCandidature = (candidature: Candidature) => {
    setSelectedCandidature(candidature);
    setShowCandidatureModal(true);
  };

  const handleAcceptCandidature = (candidature: Candidature) => {
    setSelectedCandidature(candidature);
    setConfirmationType('accept');
    setPendingAction({ type: 'accept', candidature });
    setShowConfirmationModal(true);
  };

  const handleRejectCandidature = (candidature: Candidature) => {
    setSelectedCandidature(candidature);
    setConfirmationType('reject');
    setPendingAction({ type: 'reject', candidature });
    setShowConfirmationModal(true);
  };

  const handleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedCandidatures.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const executeAccept = (candidatureId: string, medecinId: string, message?: string) => {
    const medecin = mockMedecins.find(m => m.id === medecinId);
    
    setCandidatures(prev => prev.map(c => 
      c.id === candidatureId 
        ? { 
            ...c, 
            statut: 'acceptee',
            medecinAffecte: medecin?.nom,
            emailEnvoye: true
          }
        : c
    ));

    // TODO: Appel API backend
    console.log('API: Accept candidature', {
      candidatureId,
      medecinId,
      message
    });

    // Notification et email
    alert('Candidature acceptée avec succès. Email envoyé à l\'étudiant.');
  };

  const executeReject = (candidatureId: string, motif: string, envoyerEmail: boolean, message?: string) => {
    setCandidatures(prev => prev.map(c => 
      c.id === candidatureId 
        ? { 
            ...c, 
            statut: 'refusee',
            motifRefus: motif,
            emailEnvoye: envoyerEmail
          }
        : c
    ));

    // TODO: Appel API backend
    console.log('API: Reject candidature', {
      candidatureId,
      motif,
      envoyerEmail,
      message
    });

    if (envoyerEmail) {
      alert('Candidature refusée avec succès. Email envoyé à l\'étudiant.');
    } else {
      alert('Candidature refusée avec succès.');
    }
  };

  const handleConfirmation = () => {
    if (!pendingAction) return;

    if (pendingAction.type === 'accept' && pendingAction.candidature) {
      // Pour une candidature unique, ouvrir le modal détaillé
      setSelectedCandidature(pendingAction.candidature);
      setShowCandidatureModal(true);
    } else if (pendingAction.type === 'reject' && pendingAction.candidature) {
      // Pour un refus unique, ouvrir le modal détaillé
      setSelectedCandidature(pendingAction.candidature);
      setShowCandidatureModal(true);
    } else if (pendingAction.type === 'accept' && pendingAction.massIds) {
      // Traitement en masse d'acceptation
      pendingAction.massIds.forEach(id => {
        const randomMedecin = mockMedecins.find(m => m.disponibilite);
        if (randomMedecin) {
          executeAccept(id, randomMedecin.id, 'Votre candidature a été acceptée.');
        }
      });
      setSelectedIds([]);
      alert(`${pendingAction.massIds.length} candidatures acceptées avec succès.`);
    } else if (pendingAction.type === 'reject' && pendingAction.massIds) {
      // Traitement en masse de refus
      pendingAction.massIds.forEach(id => {
        executeReject(id, 'Manque de places disponibles dans le service', true, 'Votre candidature a été refusée.');
      });
      setSelectedIds([]);
      alert(`${pendingAction.massIds.length} candidatures refusées avec succès.`);
    }

    setPendingAction(null);
  };

  const handleAcceptFromModal = (data: { medecinId: string; message?: string }) => {
    if (!selectedCandidature) return;
    executeAccept(selectedCandidature.id, data.medecinId, data.message);
    setShowCandidatureModal(false);
    setSelectedCandidature(null);
  };

  const handleRejectFromModal = (data: { motif: string; envoyerEmail: boolean; message?: string }) => {
    if (!selectedCandidature) return;
    executeReject(selectedCandidature.id, data.motif, data.envoyerEmail, data.message);
    setShowCandidatureModal(false);
    setSelectedCandidature(null);
  };

  return (
    <>
      < NavbarEncadrant />
      <Header spaceName="Espace Chef de Service" notificationCount={3} />
      
      <div className="flex min-h-screen bg-white">
        <SidebarEncadrant/>
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* En-tête avec titre et statistiques */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gestion des Candidatures
                  </h1>
                  <p className="text-gray-600">
                    Consultez, analysez et traitez les candidatures de stage
                  </p>
                </div>
                
                {/* MiniCards pour les statistiques */}
                <div className="flex gap-4">
                  <MiniCard 
                    label="En attente"
                    count={stats.enAttente}
                  />
                  <MiniCard 
                    label="Acceptées"
                    count={stats.acceptees}
                  />
                  <MiniCard 
                    label="Refusées"
                    count={stats.refusees}
                  />
                  <MiniCard 
                    label="Urgentes"
                    count={stats.urgentes}
                  />
                </div>
              </div>

              {/* Barre de recherche */}
              <div className="mb-6">
                <SearchBarCandidatures onSearch={handleSearch} />
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6">
              <FilterCandidatures 
                onFilterChange={handleFilterChange}
                onExport={handleExport}
                onMassAction={handleMassAction}
                onShowHistory={() => setShowHistoryModal(true)}
              />
            </div>

            {/* Tableau */}
            <div className="w-full">
              <TableCandidatures 
                candidatures={paginatedCandidatures}
                onView={handleViewCandidature}
                onAccept={handleAcceptCandidature}
                onReject={handleRejectCandidature}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationCandidatures
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredCandidatures.length}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            )}
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      {selectedCandidature && (
        <CandidatureModal
          isOpen={showCandidatureModal}
          onClose={() => {
            setShowCandidatureModal(false);
            setSelectedCandidature(null);
          }}
          candidature={selectedCandidature}
          medecins={mockMedecins}
          onAccept={handleAcceptFromModal}
          onReject={handleRejectFromModal}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setPendingAction(null);
        }}
        type={confirmationType}
        count={confirmationType === 'mass' ? selectedIds.length : 1}
        onConfirm={handleConfirmation}
      />

      <HistoriqueCandidatures
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        decisions={mockHistorique}
      />
    </>
  );
}