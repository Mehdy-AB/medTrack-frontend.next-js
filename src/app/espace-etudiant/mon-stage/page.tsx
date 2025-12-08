"use client";

import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import TablePresences from './Components/TablePresences';
import TableEvaluations from './Components/TableEvaluations';
import { mockPresences } from './models/presence.model';
import { mockEvaluations } from './models/evaluation.model';
import { MapPin, User, Calendar } from 'lucide-react';

export default function MonStagePage() {
  return (
    <>
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex min-h-screen bg-gray-50">
        <SidebarEtudiant />
        
        {/* Contenu principal */}
        <main className="flex-1  bg-gray-50">
          <div className="max-w-7xl mx-auto p-8">
            
            {/* En-tête avec carte de bienvenue */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">👋</span>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Bonjour,
                    </h1>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    SOFIA LAHNIN.
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Bienvenue sur votre espace de suivi de stage en médecine.
                  </p>

                  {/* Informations du stage */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-50 p-2 rounded-lg">
                        <MapPin className="text-teal-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hôpital</p>
                        <p className="text-sm font-medium text-gray-900">Hôpital THENIA</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-50 p-2 rounded-lg">
                        <User className="text-teal-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Encadrant</p>
                        <p className="text-sm font-medium text-gray-900">Dr. Lounès Ahmed</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="bg-teal-50 p-2 rounded-lg">
                        <Calendar className="text-teal-500" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Période</p>
                        <p className="text-sm font-medium text-gray-900">01 octobre - 31 octobre 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Statut:</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        En cours
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Relevé de présences/absences */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Relevé de présences/absences
              </h3>
              <TablePresences presences={mockPresences} />
            </div>

            {/* Évaluation des Encadrants */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Évaluation des Encadrants
              </h3>
              <TableEvaluations evaluations={mockEvaluations} />
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}
