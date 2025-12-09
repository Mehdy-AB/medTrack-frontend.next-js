"use client";

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchBarEvaluations from './components/SearchBarEvaluations';
import FilterEvaluations, { FilterState } from './components/FilterEvaluations';
import TableEvaluations from './components/TableEvaluations';
import PaginationEvaluations from './components/PaginationEvaluations';
import EvaluationModal from './components/EvaluationModal';
import SuccessModal from './components/SuccessModal';
import ErrorModal from './components/ErrorModal';
import { mockEvaluations, Evaluation } from './models/evaluation.model';

const ITEMS_PER_PAGE = 10;

export default function EvaluationsPage() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>(mockEvaluations);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    stage: '',
    statut: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fonction de filtrage et recherche
  const filteredEvaluations = useMemo(() => {
    let result = [...evaluations];

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const numericQuery = Number(searchQuery);
      const isExactNumber = !isNaN(numericQuery) && searchQuery.trim() !== '';

      result = result.filter((evaluation) => {
        if (isExactNumber) {
          return evaluation.noteMoyenne === numericQuery;
        }
        return (
          evaluation.nom.toLowerCase().includes(query) ||
          evaluation.matricule.toLowerCase().includes(query) ||
          evaluation.stage.toLowerCase().includes(query)
        );
      });
    }

    // Filtres
    if (filters.stage) {
      result = result.filter((evaluation) => evaluation.stage === filters.stage);
    }
    if (filters.statut) {
      result = result.filter((evaluation) => evaluation.statut === filters.statut);
    }

    return result;
  }, [evaluations, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredEvaluations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEvaluations = filteredEvaluations.slice(startIndex, endIndex);

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
    console.log(`Exporting as ${format}`, filteredEvaluations);
    alert(`Export en ${format.toUpperCase()} en cours...`);
    // TODO: Intégration backend pour export
  };

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleEvaluate = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowEvaluationModal(true);
  };

  const handleSaveDraft = (data: any) => {
    if (!selectedEvaluation) return;

    // Mettre à jour l'évaluation dans l'état local
    setEvaluations(prev => prev.map(ev => 
      ev.id === selectedEvaluation.id 
        ? {
            ...ev,
            criteres: data.criteres,
            commentaire: data.commentaire,
            noteMoyenne: data.noteMoyenne ? Number(data.noteMoyenne) : null,
            dateModification: new Date().toLocaleDateString('fr-FR'),
            statut: 'En cours'
          }
        : ev
    ));

    // TODO: Appel API backend
    console.log('API: Save draft', {
      evaluationId: selectedEvaluation.id,
      ...data
    });

    setShowEvaluationModal(false);
    setSuccessMessage('Brouillon enregistré avec succès');
    setShowSuccessModal(true);
  };

  const handleSubmitEvaluation = (data: any) => {
    if (!selectedEvaluation) return;

    // Mettre à jour l'évaluation dans l'état local
    setEvaluations(prev => prev.map(ev => 
      ev.id === selectedEvaluation.id 
        ? {
            ...ev,
            criteres: data.criteres,
            commentaire: data.commentaire,
            noteMoyenne: Number(data.noteMoyenne),
            dateModification: new Date().toLocaleDateString('fr-FR'),
            statut: 'Finalisée'
          }
        : ev
    ));

    // TODO: Appel API backend
    console.log('API: Submit evaluation', {
      evaluationId: selectedEvaluation.id,
      ...data
    });

    setShowEvaluationModal(false);
    setSuccessMessage('Évaluation soumise avec succès');
    setShowSuccessModal(true);
  };

  const handleError = () => {
    setShowEvaluationModal(false);
    setShowErrorModal(true);
  };

  return (
    <>
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={5} />
      
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* En-tête avec titre et MiniCard */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Évaluations
                  </h1>
                  <p className="text-gray-600">
                    Liste des étudiants en stage actuellement sous votre encadrement
                  </p>
                </div>
                
                {/* MiniCard pour le nombre total */}
                <MiniCard 
                  label="Total étudiants"
                  count={filteredEvaluations.length}
                />
              </div>

              {/* Barre de recherche alignée à droite */}
              <div className="flex justify-end">
                <div className="w-full max-w-md">
                  <SearchBarEvaluations onSearch={handleSearch} />
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6">
              <FilterEvaluations 
                onFilterChange={handleFilterChange}
                onExport={handleExport}
                onReset={handleReset}
              />
            </div>

            {/* Tableau */}
            <div className="w-full">
              <TableEvaluations 
                evaluations={paginatedEvaluations}
                onEvaluate={handleEvaluate}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationEvaluations
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      {selectedEvaluation && (
        <EvaluationModal
          isOpen={showEvaluationModal}
          onClose={() => setShowEvaluationModal(false)}
          evaluation={selectedEvaluation}
          onSave={handleSaveDraft}
          onSubmit={handleSubmitEvaluation}
          onError={handleError}
        />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </>
  );
}