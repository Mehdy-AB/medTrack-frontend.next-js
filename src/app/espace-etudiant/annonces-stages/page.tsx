"use client";

import { useState, useMemo } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import AnnonceCard from './Components/AnnonceCard';
import { mockAnnoncesStages } from './models/stage.model';
import { Search, Filter, Briefcase } from 'lucide-react';

export default function AnnoncesStagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtreStatut, setFiltreStatut] = useState<string>('Tous');
  const [filtreSpecialite, setFiltreSpecialite] = useState<string>('Toutes');

  // Filtrage des annonces
  const annoncesFilterees = useMemo(() => {
    return mockAnnoncesStages.filter((annonce) => {
      const matchSearch = 
        annonce.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annonce.hopital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annonce.service.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatut = filtreStatut === 'Tous' || annonce.statut === filtreStatut;
      const matchSpecialite = filtreSpecialite === 'Toutes' || annonce.specialite === filtreSpecialite;

      return matchSearch && matchStatut && matchSpecialite;
    });
  }, [searchQuery, filtreStatut, filtreSpecialite]);

  // Extraire les spécialités uniques
  const specialites = ['Toutes', ...Array.from(new Set(mockAnnoncesStages.map(a => a.specialite)))];

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
                Annonces de Stages
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Briefcase size={20} />
                <span>Consultez et postulez aux stages disponibles dans les établissements partenaires</span>
              </p>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Recherche */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher un stage..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Filtre Statut */}
                <div>
                  <select
                    value={filtreStatut}
                    onChange={(e) => setFiltreStatut(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Tous">Tous les statuts</option>
                    <option value="Ouvert">Ouvert</option>
                    <option value="Bientôt">Bientôt</option>
                    <option value="Fermé">Fermé</option>
                  </select>
                </div>

                {/* Filtre Spécialité */}
                <div>
                  <select
                    value={filtreSpecialite}
                    onChange={(e) => setFiltreSpecialite(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {specialites.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec === 'Toutes' ? 'Toutes les spécialités' : spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Statistiques */}
            <div className="mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{annoncesFilterees.length}</span> stage(s) trouvé(s)
              </p>
            </div>

            {/* Liste des annonces */}
            {annoncesFilterees.length > 0 ? (
              <div className="space-y-4">
                {annoncesFilterees.map((annonce) => (
                  <AnnonceCard key={annonce.id} annonce={annonce} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Aucun stage trouvé avec ces critères</p>
              </div>
            )}

          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
