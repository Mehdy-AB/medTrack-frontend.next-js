"use client";

import { useState, useMemo } from 'react';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtablissement from '../components/SidebarEtablissement';
import NavbarEtablissement from '../components/NavbarEtablissement';
import CandidatureCard from './components/CandidatureCard';
import CandidatureTable from './components/CandidatureTable';
import FilterCandidatures from './components/FilterCandidatures';
import PreValidationModal from './components/PreValidationModal';
import TransmissionModal from './components/TransmissionModal';
import { 
  mockCandidatures, 
  mockServices, 
  FiltresCandidatures,
  Candidature
} from './models/candidature.model';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Send, 
  Clock, 
  TrendingUp,
  Download,
  Eye,
  Calendar,
  Building,
  Award
} from 'lucide-react';

export default function PageGestionCandidatures() {
  // États
  const [candidatures, setCandidatures] = useState(mockCandidatures);
  const [filtres, setFiltres] = useState<FiltresCandidatures>({
    statut: '',
    service: '',
    hopital: '',
    niveauEtude: '',
    dateDebut: '',
    dateFin: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidatures, setSelectedCandidatures] = useState<string[]>([]);
  const [showPreValidationModal, setShowPreValidationModal] = useState(false);
  const [showTransmissionModal, setShowTransmissionModal] = useState(false);
  const [selectedCandidature, setSelectedCandidature] = useState<Candidature | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filtrage des candidatures
  const filteredCandidatures = useMemo(() => {
    let result = candidatures;

    // Filtre par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(candidature =>
        candidature.etudiant.nom.toLowerCase().includes(term) ||
        candidature.etudiant.prenom.toLowerCase().includes(term) ||
        candidature.etudiant.email.toLowerCase().includes(term) ||
        candidature.annonceTitre.toLowerCase().includes(term) ||
        candidature.serviceNom.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (filtres.statut) {
      result = result.filter(candidature => candidature.statut === filtres.statut);
    }

    // Filtre par service
    if (filtres.service) {
      result = result.filter(candidature => {
        const service = mockServices.find(s => s.id === filtres.service);
        return service && candidature.serviceNom === service.nom;
      });
    }

    // Filtre par hôpital
    if (filtres.hopital) {
      result = result.filter(candidature => candidature.hopitalNom === filtres.hopital);
    }

    // Filtre par niveau d'étude
    if (filtres.niveauEtude) {
      result = result.filter(candidature => candidature.niveauEtude === filtres.niveauEtude);
    }

    // Filtre par date
    if (filtres.dateDebut) {
      const dateDebut = new Date(filtres.dateDebut);
      result = result.filter(candidature => 
        new Date(candidature.dateSoumission) >= dateDebut
      );
    }

    if (filtres.dateFin) {
      const dateFin = new Date(filtres.dateFin);
      dateFin.setHours(23, 59, 59, 999);
      result = result.filter(candidature => 
        new Date(candidature.dateSoumission) <= dateFin
      );
    }

    return result;
  }, [candidatures, searchTerm, filtres]);

  // Statistiques
  const stats = useMemo(() => {
    const total = candidatures.length;
    const enAttente = candidatures.filter(c => c.statut === 'en_attente').length;
    const preValidees = candidatures.filter(c => c.statut === 'pre_validee').length;
    const transmises = candidatures.filter(c => c.statut === 'transmise_service').length;
    const acceptees = candidatures.filter(c => c.statut === 'acceptee_chef').length;
    const refusees = candidatures.filter(c => c.statut === 'refusee_chef').length;
    
    const documentsValides = candidatures.reduce((acc, c) => 
      acc + c.documents.filter(d => d.statut === 'valide').length, 0
    );
    const documentsTotal = candidatures.reduce((acc, c) => acc + c.documents.length, 0);
    
    const candidaturesUrgentes = candidatures.filter(c => 
      c.statut === 'en_attente' && 
      (new Date().getTime() - new Date(c.dateSoumission).getTime()) > 3 * 24 * 60 * 60 * 1000 // > 3 jours
    ).length;

    const tauxPreValidation = total > 0 ? Math.round((preValidees / total) * 100) : 0;
    const tauxTransmission = preValidees > 0 ? Math.round((transmises / preValidees) * 100) : 0;

    return {
      total,
      enAttente,
      preValidees,
      transmises,
      acceptees,
      refusees,
      documentsValides,
      documentsTotal,
      candidaturesUrgentes,
      tauxPreValidation,
      tauxTransmission,
      tauxDocuments: Math.round((documentsValides / documentsTotal) * 100) || 0
    };
  }, [candidatures]);

  // Handlers
  const handlePreValidate = (candidatureId: string, commentaire: string) => {
    setCandidatures(candidatures.map(c => {
      if (c.id === candidatureId) {
        return {
          ...c,
          statut: 'pre_validee',
          datePreValidation: new Date().toISOString().split('T')[0],
          preValidateurId: 'ADMIN_CURRENT',
          commentairePreValidation: commentaire,
          historique: [
            ...c.historique,
            {
              date: new Date().toISOString(),
              action: 'Pré-validation',
              utilisateur: 'Admin Établissement',
              details: commentaire
            }
          ]
        };
      }
      return c;
    }));

    setSelectedCandidatures(selectedCandidatures.filter(id => id !== candidatureId));
    alert('Candidature pré-validée avec succès');
  };

  const handleTransmit = (candidatureIds: string[], serviceId: string, commentaire: string) => {
    const service = mockServices.find(s => s.id === serviceId);
    if (!service) return;

    setCandidatures(candidatures.map(c => {
      if (candidatureIds.includes(c.id)) {
        return {
          ...c,
          statut: 'transmise_service',
          dateTransmission: new Date().toISOString().split('T')[0],
          transmissionId: 'ADMIN_CURRENT',
          historique: [
            ...c.historique,
            {
              date: new Date().toISOString(),
              action: 'Transmise au service',
              utilisateur: 'Admin Établissement',
              details: `Transmise à ${service.nom} - ${service.chefServiceNom}`
            }
          ]
        };
      }
      return c;
    }));

    setSelectedCandidatures([]);
    alert(`${candidatureIds.length} candidature(s) transmise(s) avec succès au service ${service.nom}`);
  };

  const handleSelectCandidature = (id: string) => {
    setSelectedCandidatures(prev =>
      prev.includes(id)
        ? prev.filter(cId => cId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidatures.length === filteredCandidatures.length) {
      setSelectedCandidatures([]);
    } else {
      setSelectedCandidatures(filteredCandidatures.map(c => c.id));
    }
  };

  const handlePreValidateMultiple = () => {
    const candidaturesToValidate = filteredCandidatures.filter(c => 
      selectedCandidatures.includes(c.id) && c.statut === 'en_attente'
    );

    if (candidaturesToValidate.length === 0) {
      alert('Aucune candidature en attente sélectionnée');
      return;
    }

    // Pré-validation en lot
    setCandidatures(candidatures.map(c => {
      if (selectedCandidatures.includes(c.id) && c.statut === 'en_attente') {
        return {
          ...c,
          statut: 'pre_validee',
          datePreValidation: new Date().toISOString().split('T')[0],
          preValidateurId: 'ADMIN_CURRENT',
          commentairePreValidation: 'Validation en lot',
          historique: [
            ...c.historique,
            {
              date: new Date().toISOString(),
              action: 'Pré-validation (lot)',
              utilisateur: 'Admin Établissement',
              details: 'Validation en lot automatique'
            }
          ]
        };
      }
      return c;
    }));

    alert(`${candidaturesToValidate.length} candidature(s) pré-validée(s) en lot`);
    setSelectedCandidatures([]);
  };

  const handleExport = () => {
    const dataToExport = filteredCandidatures.map(c => ({
      Étudiant: `${c.etudiant.prenom} ${c.etudiant.nom}`,
      Email: c.etudiant.email,
      Université: c.etudiant.universite,
      Spécialité: c.etudiant.specialite,
      'Année étude': c.etudiant.anneeEtude,
      'Stage demandé': c.annonceTitre,
      Service: c.serviceNom,
      Hôpital: c.hopitalNom,
      'Niveau demandé': c.niveauEtude,
      Statut: c.statut,
      'Date soumission': c.dateSoumission,
      'Date pré-validation': c.datePreValidation || '',
      'Date transmission': c.dateTransmission || '',
      'Score éligibilité': c.scoreEligibilite,
      'Documents valides': c.documents.filter(d => d.statut === 'valide').length,
      'Documents totaux': c.documents.length
    }));

    const csv = [
      Object.keys(dataToExport[0]).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `candidatures_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewProfile = (candidature: Candidature) => {
    // À implémenter : modal de profil étudiant
    alert(`Voir profil de ${candidature.etudiant.prenom} ${candidature.etudiant.nom}`);
  };

  return (
    <>
      <NavbarEtablissement />
      <Header 
        spaceName="Espace Établissement" 
        notificationCount={stats.enAttente + stats.candidaturesUrgentes} 
      />
      
      <div className="flex min-h-screen bg-white">
        <SidebarEtablissement />
        
        <main className="flex-1 overflow-x-hidden">
          <div className="p-8">
            {/* En-tête avec statistiques */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gestion des Candidatures
                  </h1>
                  <p className="text-gray-600">
                    Vue globale, pré-validation et transmission des candidatures aux services
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Exporter
                  </button>
                </div>
              </div>

              {/* Cartes de statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Candidatures Total</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-teal-500" />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{stats.enAttente} en attente</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Pré-validées</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.preValidees}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-blue-600">
                      Taux: {stats.tauxPreValidation}%
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Transmises</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.transmises}</p>
                    </div>
                    <Send className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-purple-600">
                      Taux: {stats.tauxTransmission}%
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Documents</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.documentsValides}/{stats.documentsTotal}
                      </p>
                    </div>
                    <FileText className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-green-600">
                      Taux de validation: {stats.tauxDocuments}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6">
              <FilterCandidatures
                filters={filtres}
                onFilterChange={setFiltres}
                services={mockServices}
                onSearch={setSearchTerm}
              />
            </div>

            {/* Actions de masse */}
            {selectedCandidatures.length > 0 && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-teal-800">
                        {selectedCandidatures.length} candidature(s) sélectionnée(s)
                      </h4>
                      <p className="text-sm text-teal-600">
                        Actions disponibles pour les candidatures sélectionnées
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handlePreValidateMultiple}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Pré-valider en lot
                    </button>
                    <button
                      onClick={() => setShowTransmissionModal(true)}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Transmettre en lot
                    </button>
                    <button
                      onClick={() => setSelectedCandidatures([])}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* En-tête vue */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Candidatures ({filteredCandidatures.length})
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedCandidatures.length > 0 && `${selectedCandidatures.length} sélectionnée(s) • `}
                  Workflow: En attente → Pré-validée → Transmise → Acceptée/Refusée
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      viewMode === 'cards'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Cartes
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      viewMode === 'table'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Tableau
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>En attente</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Pré-validée</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Transmise</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vue Cartes */}
            {viewMode === 'cards' && (
              <div className="mb-8">
                {filteredCandidatures.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <p className="text-gray-500">Aucune candidature ne correspond aux critères</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCandidatures.map(candidature => (
                      <CandidatureCard
                        key={candidature.id}
                        candidature={candidature}
                        onViewDetail={() => {
                          setSelectedCandidature(candidature);
                          // À implémenter : modal de détail
                          alert(`Détails de la candidature ${candidature.id}`);
                        }}
                        onPreValidate={() => {
                          setSelectedCandidature(candidature);
                          setShowPreValidationModal(true);
                        }}
                        onTransmit={() => {
                          setSelectedCandidature(candidature);
                          setSelectedCandidatures([candidature.id]);
                          setShowTransmissionModal(true);
                        }}
                        onViewProfile={() => handleViewProfile(candidature)}
                        isSelected={selectedCandidatures.includes(candidature.id)}
                        onSelect={handleSelectCandidature}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Vue Tableau */}
            {viewMode === 'table' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <CandidatureTable
                  candidatures={filteredCandidatures}
                  onViewDetail={(candidature) => {
                    setSelectedCandidature(candidature);
                    // À implémenter : modal de détail
                    alert(`Détails de la candidature ${candidature.id}`);
                  }}
                  onPreValidate={(candidature) => {
                    setSelectedCandidature(candidature);
                    setShowPreValidationModal(true);
                  }}
                  onTransmit={(candidature) => {
                    setSelectedCandidature(candidature);
                    setSelectedCandidatures([candidature.id]);
                    setShowTransmissionModal(true);
                  }}
                  onViewProfile={handleViewProfile}
                  selectedIds={selectedCandidatures}
                  onSelect={handleSelectCandidature}
                  onSelectAll={handleSelectAll}
                />
              </div>
            )}

            {/* Légende workflow */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">Workflow des Candidatures</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-bold text-orange-700 mb-1">En attente</div>
                  <div className="text-xs text-orange-600">
                    Documents à vérifier, éligibilité à évaluer
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-bold text-blue-700 mb-1">Pré-validée</div>
                  <div className="text-xs text-blue-600">
                    Documents complets, niveau éligible vérifié
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="font-bold text-purple-700 mb-1">Transmise</div>
                  <div className="text-xs text-purple-600">
                    Envoyée au chef de service pour décision finale
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-bold text-green-700 mb-1">Acceptée</div>
                  <div className="text-xs text-green-600">
                    Validée par le chef de service, place attribuée
                  </div>
                </div>
                <div className="text-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-bold text-red-700 mb-1">Refusée</div>
                  <div className="text-xs text-red-600">
                    Refusée par le chef de service, motif spécifié
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p><strong>Rôle établissement:</strong> Pré-validation administrative (documents + niveau).</p>
                <p><strong>Rôle chef de service:</strong> Décision finale (acceptation/refus) basée sur le profil.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      <PreValidationModal
        isOpen={showPreValidationModal}
        onClose={() => {
          setShowPreValidationModal(false);
          setSelectedCandidature(null);
        }}
        candidature={selectedCandidature}
        onValidate={handlePreValidate}
      />

      <TransmissionModal
        isOpen={showTransmissionModal}
        onClose={() => setShowTransmissionModal(false)}
        candidatures={filteredCandidatures.filter(c => selectedCandidatures.includes(c.id))}
        services={mockServices}
        onTransmit={handleTransmit}
      />
    </>
  );
}