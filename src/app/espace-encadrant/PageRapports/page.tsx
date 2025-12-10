"use client";

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchBarRapports from './components/SearchBarRapports';
import FilterRapports, { FilterState } from './components/FilterRapports';
import TableRapports from './components/TableRapports';
import RapportCard from './components/RapportCard';
import GenerationModal from './components/GenerationModal';
import SuppressionModal from './components/SuppressionModal';
import { 
  mockRapportsEtudiants, 
  mockRapportsGeneres, 
  RapportEtudiant, 
  RapportGenere,
  ConfigRapport 
} from './models/rapport.model';

const ITEMS_PER_PAGE = 10;

export default function RapportsPage() {
  const [rapportsEtudiants, setRapportsEtudiants] = useState<RapportEtudiant[]>(mockRapportsEtudiants);
  const [rapportsGeneres, setRapportsGeneres] = useState<RapportGenere[]>(mockRapportsGeneres);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    typeRapport: '',
    statut: '',
    periode: '',
    stage: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRapportId, setSelectedRapportId] = useState<string | null>(null);
  const [selectedRapportNom, setSelectedRapportNom] = useState('');
  const [activeTab, setActiveTab] = useState<'etudiants' | 'generes'>('etudiants');

  // Fonction de filtrage et recherche pour rapports étudiants
  const filteredRapportsEtudiants = useMemo(() => {
    let result = [...rapportsEtudiants];

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((rapport) => {
        return (
          rapport.nom.toLowerCase().includes(query) ||
          rapport.matricule.toLowerCase().includes(query) ||
          rapport.stage.toLowerCase().includes(query) ||
          rapport.typeRapport.toLowerCase().includes(query)
        );
      });
    }

    // Filtres
    if (filters.typeRapport) {
      result = result.filter(r => r.typeRapport.toLowerCase() === filters.typeRapport.toLowerCase());
    }
    if (filters.statut) {
      result = result.filter(r => r.statut.toLowerCase() === filters.statut.toLowerCase());
    }
    if (filters.stage) {
      result = result.filter(r => r.stage === filters.stage);
    }

    return result;
  }, [rapportsEtudiants, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredRapportsEtudiants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedRapports = filteredRapportsEtudiants.slice(startIndex, endIndex);

  // Statistiques
  const stats = useMemo(() => {
    const total = rapportsEtudiants.length;
    const complets = rapportsEtudiants.filter(r => r.statut === 'complet').length;
    const incomplets = rapportsEtudiants.filter(r => r.statut === 'incomplet').length;
    const enAttente = rapportsEtudiants.filter(r => r.statut === 'en_attente').length;
    
    return { total, complets, incomplets, enAttente };
  }, [rapportsEtudiants]);

  // Fonction pour générer le contenu du rapport basé sur la configuration
  const generateRapportContent = (config: ConfigRapport): string => {
    let content = `=== RAPPORT DE STAGE ===\n\n`;
    content += `Type: ${config.typeRapport}\n`;
    content += `Période: ${config.periodeDebut} - ${config.periodeFin}\n`;
    content += `Date de génération: ${new Date().toLocaleDateString('fr-FR')}\n\n`;
    
    content += `=== INFORMATIONS INCLUSES ===\n`;
    Object.entries(config.informations).forEach(([key, included]) => {
      if (included) {
        const label = key === 'nom' ? 'Nom étudiant' : 
                     key === 'matricule' ? 'Matricule' :
                     key === 'stage' ? 'Stage' :
                     key === 'periode' ? 'Période stage' :
                     key === 'competences' ? 'Compétences' :
                     key === 'noteGenerale' ? 'Note générale' :
                     key === 'commentaires' ? 'Commentaires' : 
                     'Documents';
        content += `✓ ${label}\n`;
      }
    });
    
    content += `\n=== DONNÉES DES ÉTUDIANTS ===\n`;
    
    // Filtrer les étudiants selon la sélection
    const etudiantsInclus = config.etudiantsInclus 
      ? rapportsEtudiants.filter(e => config.etudiantsInclus?.includes(e.id))
      : rapportsEtudiants;
    
    etudiantsInclus.forEach(etudiant => {
      content += `\n--- ${etudiant.nom} ---\n`;
      
      if (config.informations.nom) content += `Nom: ${etudiant.nom}\n`;
      if (config.informations.matricule) content += `Matricule: ${etudiant.matricule}\n`;
      if (config.informations.stage) content += `Stage: ${etudiant.stage}\n`;
      if (config.informations.periode) content += `Période: ${etudiant.periode}\n`;
      
      if (config.informations.competences && etudiant.competences.length > 0) {
        content += `Compétences: ${etudiant.competences.join(', ')}\n`;
      }
      
      if (config.informations.noteGenerale && etudiant.noteGenerale !== undefined) {
        content += `Note générale: ${etudiant.noteGenerale}/20\n`;
      }
      
      if (config.informations.commentaires && etudiant.commentaires) {
        content += `Commentaires: ${etudiant.commentaires}\n`;
      }
      
      if (config.informations.documents && etudiant.documents.length > 0) {
        content += `Documents: ${etudiant.documents.join(', ')}\n`;
      }
    });
    
    if (config.fichierJoint) {
      content += `\n=== FICHIER JOINT ===\n`;
      content += `Nom: ${config.fichierJoint.name}\n`;
      content += `Taille: ${(config.fichierJoint.size / 1024).toFixed(2)} KB\n`;
      content += `Type: ${config.fichierJoint.type}\n`;
    }
    
    content += `\n=== FIN DU RAPPORT ===\n`;
    content += `Généré automatiquement par MedTrack\n`;
    
    return content;
  };

  // Fonction pour télécharger un rapport
  const downloadRapport = (rapport: RapportGenere) => {
    if (!rapport.contenu && !rapport.fichier) {
      alert('Ce rapport ne contient pas de données à télécharger');
      return;
    }
    
    // Si le rapport a un fichier uploadé, le télécharger directement
    if (rapport.fichier) {
      const url = URL.createObjectURL(rapport.fichier);
      const a = document.createElement('a');
      a.href = url;
      a.download = rapport.fichier.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }
    
    // Sinon, générer un fichier à partir du contenu
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    switch (rapport.nom.split('.').pop()?.toLowerCase()) {
      case 'pdf':
        mimeType = 'application/pdf';
        extension = 'pdf';
        break;
      case 'xlsx':
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        extension = 'xlsx';
        break;
      case 'doc':
      case 'docx':
        mimeType = 'application/msword';
        extension = 'docx';
        break;
    }
    
    const content = rapport.contenu || `Rapport: ${rapport.nom}\nDate: ${rapport.dateGeneration}`;
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rapport.nom.replace(/\s+/g, '_')}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`Rapport téléchargé: ${a.download}`);
  };

  // Handlers
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    const data = activeTab === 'etudiants' ? filteredRapportsEtudiants : rapportsGeneres;
    console.log(`Exporting as ${format}`, data);
    
    // Créer un export réel
    let exportContent = '';
    let mimeType = 'text/plain';
    let extension = 'txt';
    
    if (format === 'excel') {
      mimeType = 'text/csv';
      extension = 'csv';
      // Créer un CSV
      exportContent = 'Nom,Matricule,Stage,Période,Type,Statut,Note\n';
      filteredRapportsEtudiants.forEach(r => {
        exportContent += `${r.nom},${r.matricule},${r.stage},${r.periode},${r.typeRapport},${r.statut},${r.noteGenerale || ''}\n`;
      });
    } else {
      mimeType = 'text/plain';
      extension = 'txt';
      exportContent = `=== EXPORT DES RAPPORTS ===\n\n`;
      filteredRapportsEtudiants.forEach(r => {
        exportContent += `${r.nom} (${r.matricule})\n`;
        exportContent += `Stage: ${r.stage}\n`;
        exportContent += `Période: ${r.periode}\n`;
        exportContent += `Type: ${r.typeRapport} - Statut: ${r.statut}\n`;
        if (r.noteGenerale) exportContent += `Note: ${r.noteGenerale}/20\n`;
        exportContent += `---\n\n`;
      });
    }
    
    const blob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export_rapports_${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleViewRapport = (rapport: RapportEtudiant) => {
    console.log('Consultation du rapport:', rapport);
    // Ouvrir une modal avec les détails
    const details = `
      Étudiant: ${rapport.nom}
      Matricule: ${rapport.matricule}
      Stage: ${rapport.stage}
      Période: ${rapport.periode}
      Type de rapport: ${rapport.typeRapport}
      Statut: ${rapport.statut}
      Date soumission: ${rapport.dateSoumission}
      ${rapport.noteGenerale ? `Note générale: ${rapport.noteGenerale}/20` : ''}
      Compétences: ${rapport.competences.join(', ')}
      ${rapport.commentaires ? `Commentaires: ${rapport.commentaires}` : ''}
      Documents: ${rapport.documents.join(', ') || 'Aucun'}
    `;
    alert(details);
  };

  const handleDownloadRapport = (rapport: RapportEtudiant) => {
    console.log('Téléchargement du rapport:', rapport);
    
    // Créer un fichier pour l'étudiant
    let content = `=== RAPPORT INDIVIDUEL ===\n\n`;
    content += `Étudiant: ${rapport.nom}\n`;
    content += `Matricule: ${rapport.matricule}\n`;
    content += `Stage: ${rapport.stage}\n`;
    content += `Période: ${rapport.periode}\n`;
    content += `Type: ${rapport.typeRapport}\n`;
    content += `Statut: ${rapport.statut}\n`;
    content += `Date soumission: ${rapport.dateSoumission}\n`;
    if (rapport.noteGenerale) content += `Note générale: ${rapport.noteGenerale}/20\n`;
    content += `Compétences: ${rapport.competences.join(', ')}\n`;
    if (rapport.commentaires) content += `Commentaires: ${rapport.commentaires}\n`;
    content += `Documents: ${rapport.documents.join(', ') || 'Aucun'}\n`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport_${rapport.nom.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadRapportGenere = (rapport: RapportGenere) => {
    downloadRapport(rapport);
  };

  const handleDeleteRapport = (id: string) => {
    const rapport = rapportsGeneres.find(r => r.id === id);
    if (rapport) {
      setSelectedRapportId(id);
      setSelectedRapportNom(rapport.nom);
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    if (selectedRapportId) {
      setRapportsGeneres(prev => prev.filter(r => r.id !== selectedRapportId));
      console.log('Rapport supprimé:', selectedRapportId);
      alert('Rapport supprimé avec succès');
    }
    setSelectedRapportId(null);
  };

  const handleGenerateReport = (config: ConfigRapport) => {
    console.log('Génération de rapport avec config:', config);
    
    // Générer le contenu du rapport
    const rapportContent = generateRapportContent(config);
    
    // Déterminer la taille approximative
    const tailleFichier = config.fichierJoint 
      ? `${(config.fichierJoint.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(rapportContent.length / 1024).toFixed(1)} KB`;
    
    // Créer le nouveau rapport
    const nouveauRapport: RapportGenere = {
      id: `RG${Date.now()}`,
      nom: `Rapport_${config.typeRapport}_${new Date().toISOString().split('T')[0]}.${config.formatExport}`,
      type: config.typeRapport,
      dateGeneration: new Date().toLocaleDateString('fr-FR'),
      periodeCouverte: `${config.periodeDebut} - ${config.periodeFin}`,
      nbEtudiants: config.etudiantsInclus?.length || rapportsEtudiants.length,
      tailleFichier: tailleFichier,
      statut: 'en_cours',
      fichier: config.fichierJoint,
      contenu: rapportContent
    };

    // Ajouter à la liste
    setRapportsGeneres(prev => [nouveauRapport, ...prev]);
    
    // Simulation de la génération
    setTimeout(() => {
      setRapportsGeneres(prev => 
        prev.map(r => 
          r.id === nouveauRapport.id 
            ? { ...r, statut: 'généré' } 
            : r
        )
      );
      
      // Télécharger automatiquement si demandé
      const shouldAutoDownload = window.confirm(
        'Rapport généré avec succès ! Voulez-vous le télécharger maintenant ?'
      );
      
      if (shouldAutoDownload) {
        setTimeout(() => downloadRapport(nouveauRapport), 500);
      }
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={3} />
      
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* En-tête avec titre et statistiques */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Rapports & Exportation
                  </h1>
                  <p className="text-gray-600">
                    Consultez, générez et exportez les rapports de stage
                  </p>
                </div>
                
                {/* MiniCards pour les statistiques */}
                <div className="flex gap-4">
                  <MiniCard 
                    label="Total rapports"
                    count={stats.total}
                  />
                  <MiniCard 
                    label="Complets"
                    count={stats.complets}
                  />
                  <MiniCard 
                    label="Incomplets"
                    count={stats.incomplets}
                  />
                  <MiniCard 
                    label="En attente"
                    count={stats.enAttente}
                  />
                </div>
              </div>

              {/* Barre de recherche */}
              <div className="mb-6">
                <SearchBarRapports onSearch={handleSearch} />
              </div>
            </div>

            {/* Onglets */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('etudiants')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'etudiants'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rapports étudiants
                </button>
                <button
                  onClick={() => setActiveTab('generes')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'generes'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rapports générés
                </button>
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6">
              <FilterRapports 
                onFilterChange={handleFilterChange}
                onExport={handleExport}
                onGenerate={() => setShowGenerationModal(true)}
                onReset={handleReset}
              />
            </div>

            {/* Contenu selon l'onglet */}
            {activeTab === 'etudiants' ? (
              <>
                {/* Tableau des rapports étudiants */}
                <div className="w-full mb-8">
                  <TableRapports 
                    rapports={paginatedRapports}
                    onView={handleViewRapport}
                    onDownload={handleDownloadRapport}
                  />
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">
                      Page {currentPage} sur {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        Précédent
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Grid des rapports générés */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rapportsGeneres.map((rapport) => (
                  <RapportCard
                    key={rapport.id}
                    rapport={rapport}
                    onDownload={handleDownloadRapportGenere}
                    onDelete={handleDeleteRapport}
                  />
                ))}
                
                {rapportsGeneres.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500">Aucun rapport généré pour le moment</p>
                    <button
                      onClick={() => setShowGenerationModal(true)}
                      className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Générer votre premier rapport
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      <GenerationModal
        isOpen={showGenerationModal}
        onClose={() => setShowGenerationModal(false)}
        onSubmit={handleGenerateReport}
      />

      <SuppressionModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedRapportId(null);
        }}
        onConfirm={confirmDelete}
        rapportNom={selectedRapportNom}
      />
    </>
  );
}