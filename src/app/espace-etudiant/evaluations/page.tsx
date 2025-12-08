"use client";

import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import TableEvaluationsHistorique from './Components/TableEvaluationsHistorique';
import { mockEvaluationsHistorique } from './models/evaluationHistorique.model';
import { GraduationCap, TrendingUp, Download, Calendar } from 'lucide-react';

export default function MesEvaluationsPage() {
  // Calcul de la moyenne générale (tous les stages)
  const moyenneGenerale =
  mockEvaluationsHistorique.reduce((acc, evaluation) => acc + evaluation.note, 0) /
  mockEvaluationsHistorique.length;

  const moyenneFormatted = moyenneGenerale.toFixed(1);

  // Nombre total de stages
  const nombreStages = mockEvaluationsHistorique.length;
  const stagesTermines = mockEvaluationsHistorique.filter(e => e.statut === 'Terminé').length;
  const stagesEnCours = mockEvaluationsHistorique.filter(e => e.statut === 'En cours').length;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        {/* Contenu principal */}
        <main className="flex-1 ml-6 rounded-2xl bg-gray-50 overflow-x-auto">
          <div className="max-w-7xl mx-auto p-8">
            
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mes évaluations
              </h1>
              <p className="text-gray-600 flex items-center space-x-2">
                <GraduationCap size={20} />
                <span>Suivez vos performances et vos retours des evaluation pour chaque stage.</span>
              </p>
            </div>

            {/* Cartes Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Moyenne Générale */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Moyenne générale actuelle</p>
                  <TrendingUp className="text-teal-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {moyenneFormatted}
                  <span className="text-xl text-gray-500">/20</span>
                </p>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  Très satisfaisant
                </span>
              </div>

              {/* Nombre de stages */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Stages effectués</p>
                  <Calendar className="text-blue-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {nombreStages}
                </p>
                <p className="text-xs text-gray-600">
                  {stagesTermines} terminés • {stagesEnCours} en cours
                </p>
              </div>

              {/* Meilleure note */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Meilleure note</p>
                  <GraduationCap className="text-yellow-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {Math.max(...mockEvaluationsHistorique.map(e => e.note))}
                  <span className="text-xl text-gray-500">/20</span>
                </p>
                <p className="text-xs text-gray-600">
                  {mockEvaluationsHistorique.find(e => e.note === Math.max(...mockEvaluationsHistorique.map(e => e.note)))?.encadrant}
                </p>
              </div>
            </div>

            {/* Section Tableau */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Évaluations sur chaque stage effectué
              </h2>
              <TableEvaluationsHistorique evaluations={mockEvaluationsHistorique} />
            </div>

            {/* Bouton Télécharger tout */}
            <div className="flex justify-start mt-6">
              <button className="flex items-center space-x-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors shadow-sm hover:shadow-md">
                <Download size={18} />
                <span className="font-medium">Télécharger toutes mes évaluations (PDF)</span>
              </button>
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}