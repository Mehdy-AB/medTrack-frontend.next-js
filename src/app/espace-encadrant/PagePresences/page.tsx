// src/app/espace-encadrant/PagePresences/page.tsx

"use client";

import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchBarPresences from './components/SearchBarPresences';
import FilterPresences, { FilterState } from './components/FilterPresences';
import TablePresences from './components/TablePresences';
import PaginationPresences from './components/PaginationPresences';
import { mockPresences, Presence, PresenceStatus } from './models/presence.model';

const ITEMS_PER_PAGE = 10;

export default function PresencesPage() {
  const [presences, setPresences] = useState<Presence[]>(mockPresences);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    stage: '',
    date: '',
    statutPresence: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction de filtrage et recherche
  const filteredPresences = useMemo(() => {
    let result = [...presences];

    // Recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((presence) => 
        presence.nom.toLowerCase().includes(query) ||
        presence.matricule.toLowerCase().includes(query) ||
        presence.stage.toLowerCase().includes(query)
      );
    }

    // Filtres
    if (filters.stage) {
      result = result.filter((presence) => presence.stage === filters.stage);
    }
    if (filters.date) {
      result = result.filter((presence) => presence.date === filters.date);
    }
    if (filters.statutPresence) {
      result = result.filter((presence) => presence.statut === filters.statutPresence);
    }

    return result;
  }, [presences, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredPresences.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPresences = filteredPresences.slice(startIndex, endIndex);

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
    console.log(`Exporting as ${format}`, filteredPresences);
    alert(`Export en ${format.toUpperCase()} en cours...`);
    // TODO: Intégration backend pour export
  };

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePresenceChange = async (presenceId: string, newStatus: PresenceStatus) => {
    // Mise à jour locale
    setPresences(prev => prev.map(p => 
      p.id === presenceId ? { ...p, statut: newStatus } : p
    ));

    // TODO: Appel API backend
    try {
      console.log('API: Update presence', {
        presenceId,
        newStatus,
        timestamp: new Date().toISOString()
      });
      
      // Exemple d'appel API:
      // await fetch(`/api/presences/${presenceId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ statut: newStatus })
      // });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la présence:', error);
      // Rollback en cas d'erreur
      setPresences(prev => prev.map(p => 
        p.id === presenceId ? { ...p, statut: prev.find(pr => pr.id === presenceId)?.statut || 'Non marqué' } : p
      ));
    }
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
                    Gestion des présences
                  </h1>
                  <p className="text-gray-600">
                    Les étudiants en stage actuellement sous votre encadrement
                  </p>
                </div>
                
                {/* MiniCard pour le nombre total */}
                <MiniCard 
                  label="Total: 24 étudianst"
                  count={filteredPresences.length}
                />
              </div>

              {/* Barre de recherche alignée à droite */}
              <div className="flex justify-end">
                <div className="w-full max-w-md">
                  <SearchBarPresences onSearch={handleSearch} />
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6">
              <FilterPresences 
                onFilterChange={handleFilterChange}
                onExport={handleExport}
                onReset={handleReset}
              />
            </div>

            {/* Tableau */}
            <div className="w-full">
              <TablePresences 
                presences={paginatedPresences}
                onPresenceChange={handlePresenceChange}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationPresences
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}