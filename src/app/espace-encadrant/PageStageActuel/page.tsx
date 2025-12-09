// Encadrant/PageStageActuel/page.tsx

"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../components/Sidebar';
import StudentCard from './components/StudentCard';
import EncadrantCard from './components/EncadrantCard';
import StageInfoCard from './components/StageInfoCard';
import HoraireCard from './components/HoraireCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { mockStageData } from './models/stage.model';

export default function StageActuelPage() {
  // États
  const [currentStudentPage, setCurrentStudentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  // Données depuis le modèle (simulant les données du backend)
  const { stageInfo, students, encadrants, horaires } = mockStageData;
  
  // Pagination des étudiants
  const studentsPerPage = 3;
  const totalStudentPages = Math.ceil(students.length / studentsPerPage);
  const startIndex = (currentStudentPage - 1) * studentsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + studentsPerPage);

  const handlePreviousPage = () => {
    setCurrentStudentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentStudentPage(prev => Math.min(totalStudentPages, prev + 1));
  };

  return (
    <>
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={5} />
      
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {stageInfo.titre}
              </h1>
              <p className="text-gray-600">
                Période du stage : {stageInfo.periode.debut} – {stageInfo.periode.fin}
              </p>
            </div>

            {/* Grille à 2 colonnes - Première ligne */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              
              {/* Carte Liste Étudiants */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Liste Étudiants</h2>
                
                <div className="space-y-3 mb-6">
                  {currentStudents.map((student) => (
                    <StudentCard 
                      key={student.id} 
                      student={student}
                      onMenuOpen={setActiveMenu}
                    />
                  ))}
                </div>

                {/* Pagination pour étudiants */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentStudentPage === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <span className="text-sm text-gray-600 font-medium">
                    Page {currentStudentPage} sur {totalStudentPages}
                  </span>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={currentStudentPage === totalStudentPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Carte Informations sur le stage */}
              <StageInfoCard stageInfo={stageInfo} />
            </div>

            {/* Grille à 2 colonnes - Deuxième ligne */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Carte Équipe des encadreurs */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Équipe des encadreurs
                </h2>
                
                <div className="space-y-3">
                  {encadrants.map((encadrant) => (
                    <EncadrantCard 
                      key={encadrant.id} 
                      encadrant={encadrant}
                    />
                  ))}
                </div>
              </div>

              {/* Carte Horaires */}
              <HoraireCard horaires={horaires} />
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}