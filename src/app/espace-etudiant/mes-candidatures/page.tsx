"use client";

import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import { mockCandidatures } from './models/candidature.model';
import { FileCheck, Calendar, MapPin, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function MesCandidaturesPage() {
  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'Acceptée':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'Refusée':
        return <XCircle className="text-red-500" size={24} />;
      case 'En attente':
      case 'En cours d\'examen':
        return <Clock className="text-orange-500" size={24} />;
      default:
        return <Clock className="text-gray-500" size={24} />;
    }
  };

  const getStatutStyle = (statut: string) => {
    switch (statut) {
      case 'Acceptée':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Refusée':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'En attente':
      case 'En cours d\'examen':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 ml-6 rounded-2xl p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mes Candidatures
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <FileCheck size={20} />
                <span>Suivez l'état de vos candidatures aux stages</span>
              </p>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{mockCandidatures.length}</p>
              </div>
              <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                <p className="text-sm text-green-700 mb-1">Acceptées</p>
                <p className="text-2xl font-bold text-green-700">
                  {mockCandidatures.filter(c => c.statut === 'Acceptée').length}
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
                <p className="text-sm text-orange-700 mb-1">En attente</p>
                <p className="text-2xl font-bold text-orange-700">
                  {mockCandidatures.filter(c => c.statut.includes('attente') || c.statut.includes('examen')).length}
                </p>
              </div>
              <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                <p className="text-sm text-red-700 mb-1">Refusées</p>
                <p className="text-2xl font-bold text-red-700">
                  {mockCandidatures.filter(c => c.statut === 'Refusée').length}
                </p>
              </div>
            </div>

            {/* Liste des candidatures */}
            {mockCandidatures.length > 0 ? (
              <div className="space-y-4">
                {mockCandidatures.map((candidature) => (
                  <div
                    key={candidature.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getStatutIcon(candidature.statut)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {candidature.titreStage}
                          </h3>
                          <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-teal-500" />
                              <span>{candidature.hopital} - {candidature.service}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-teal-500" />
                              <span>Postulé le {candidature.datePostulation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatutStyle(candidature.statut)}`}>
                        {candidature.statut}
                      </span>
                    </div>

                    {candidature.commentaire && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Commentaire : </span>
                          {candidature.commentaire}
                        </p>
                        {candidature.dateReponse && (
                          <p className="text-xs text-gray-500 mt-2">
                            Réponse reçue le {candidature.dateReponse}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium">
                        Priorité #{candidature.priorite}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FileCheck size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Vous n'avez pas encore postulé à des stages</p>
                <a
                  href="/espace-etudiant/annonces-stages"
                  className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                >
                  Voir les annonces disponibles
                </a>
              </div>
            )}

          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
