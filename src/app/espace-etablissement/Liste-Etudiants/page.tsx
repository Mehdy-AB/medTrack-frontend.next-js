"use client";

import { useState, useMemo } from 'react';
import NavbarEtablissement from '../Components/NavbarEtablissement';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtablissement from '../Components/SidebarEtablissement';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchBarListe from './components/SearchBarListe';
import FilterListe, { FilterState } from './components/FilterListe';
import TableListe from './components/TableListe';
import PaginationListe from './components/PaginationListe';
import { mockStudents, Student } from './models/student.model';

const ITEMS_PER_PAGE = 10;

export default function ListeEtudiantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    promotion: '',
    specialite: '',
    statut: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction de filtrage et recherche
  const filteredStudents = useMemo(() => {
    let result = [...mockStudents];

    // Recherche (exacte pour les notes, texte pour le reste, date uniquement si format complet)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      // Vérifier si l'utilisateur tape un nombre → recherche EXACTE sur les notes
      const numericQuery = Number(searchQuery);
      const isExactNumber = !isNaN(numericQuery) && searchQuery.trim() !== '';

      // Vérifier si c'est une date du type JJ/MM/AAAA
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      const isFullDate = dateRegex.test(searchQuery.trim());

      result = result.filter((student) => {
        // 1) Recherche exacte des notes
        if (isExactNumber) {
          return student.note === numericQuery;
        }

        // 2) Recherche date (format complet seulement)
        if (isFullDate) {
          return (
            student.dateDebut === searchQuery ||
            student.dateFin === searchQuery
          );
        }

        // 3) Recherche textuelle normale
        return (
          student.nom.toLowerCase().includes(query) ||
          student.matricule.toLowerCase().includes(query) ||
          student.specialite.toLowerCase().includes(query) ||
          student.statut.toLowerCase().includes(query) ||
          student.stageActuel.toLowerCase().includes(query)
        );
      });
    }

    // Filtres
    if (filters.promotion) {
      result = result.filter((student) => student.promotion === filters.promotion);
    }
    if (filters.specialite) {
      result = result.filter((student) => student.specialite === filters.specialite);
    }
    if (filters.statut) {
      result = result.filter((student) => student.statut === filters.statut);
    }

    return result;
  }, [searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  // Fonction d'export
  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exportation des étudiants en ${format}`, filteredStudents);

    // Créer le contenu d'export
    let exportContent = '';
    let mimeType = 'text/plain';
    let extension = 'txt';
    let filename = `etudiants_${new Date().toISOString().split('T')[0]}`;

    if (format === 'excel') {
      // Format CSV pour Excel
      mimeType = 'text/csv';
      extension = 'csv';

      // En-tête CSV
      exportContent = 'Nom,Matricule,Promotion,Spécialité,Stage Actuel,Début,Fin,Statut,Note\n';

      // Données
      filteredStudents.forEach(student => {
        exportContent += `"${student.nom}","${student.matricule}","${student.promotion}","${student.specialite}",`;
        exportContent += `"${student.stageActuel}","${student.dateDebut}","${student.dateFin}","${student.statut}","${student.note || ''}"\n`;
      });

      filename += '.csv';
    } else {
      // Format PDF (simulé avec texte formaté)
      mimeType = 'text/plain';
      extension = 'txt';

      exportContent = '=== LISTE DES ÉTUDIANTS ===\n\n';
      exportContent += `Date d'export: ${new Date().toLocaleDateString('fr-FR')}\n`;
      exportContent += `Nombre d'étudiants: ${filteredStudents.length}\n\n`;
      exportContent += '─'.repeat(80) + '\n\n';

      filteredStudents.forEach((student, index) => {
        exportContent += `${index + 1}. ${student.nom}\n`;
        exportContent += `   Matricule: ${student.matricule}\n`;
        exportContent += `   Promotion: ${student.promotion}\n`;
        exportContent += `   Spécialité: ${student.specialite}\n`;
        exportContent += `   Stage: ${student.stageActuel}\n`;
        exportContent += `   Période: ${student.dateDebut} - ${student.dateFin}\n`;
        exportContent += `   Statut: ${student.statut}\n`;
        exportContent += `   Note: ${student.note || 'Non noté'}\n`;
        exportContent += '\n';
      });

      exportContent += '─'.repeat(80) + '\n';
      exportContent += 'Fin de la liste\n';

      filename += '.txt';
    }

    // Créer et télécharger le fichier
    const blob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Notification
    alert(`${filteredStudents.length} étudiants exportés en ${format.toUpperCase()} !`);
  };

  // Reset à la page 1 quand on filtre ou recherche
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <>
      <NavbarEtablissement />
      <Header spaceName="Espace Etablissement" notificationCount={5} />

      <div className="flex min-h-screen bg-white">
        <SidebarEtablissement />

        {/* Contenu principal */}
        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* En-tête avec titre et MiniCard */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Étudiants d etablissement
                  </h1>
                  <p className="text-gray-600">
                    Liste des étudiants en stage actuellement
                  </p>
                </div>

                {/* MiniCard pour le nombre total */}
                <MiniCard
                  label="Total étudiants"
                  count={filteredStudents.length}
                />
              </div>

              {/* Barre de recherche alignée à droite */}
              <div className="flex justify-end">
                <div className="w-full max-w-md">
                  <SearchBarListe onSearch={handleSearch} />
                </div>
              </div>
            </div>

            {/* Filtres avec bouton d'export */}
            <div className="mb-6">
              <FilterListe
                onFilterChange={handleFilterChange}
                onReset={handleReset}
                onExport={handleExport}
              />
            </div>

            {/* Tableau */}
            <div className="w-full">
              <TableListe students={paginatedStudents} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationListe
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