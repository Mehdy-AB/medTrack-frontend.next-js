"use client";

import { useState, useMemo } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import AnnonceCard from './Components/AnnonceCard';
import { mockAnnoncesStages, AnnonceStage } from './models/stage.model';
import { Search, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';

export default function AnnoncesStagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtreStatut, setFiltreStatut] = useState<string>('Tous');
  const [annonces, setAnnonces] = useState<AnnonceStage[]>(mockAnnoncesStages);
  const [postulations, setPostulations] = useState<string[]>([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Simuler un étudiant connecté
  const estConnecte = true; // À remplacer par votre logique d'authentification

  // Filtrage simple des annonces
  const annoncesFilterees = useMemo(() => {
    return annonces.filter((annonce) => {
      const matchSearch = 
        annonce.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annonce.hopital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annonce.service.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatut = filtreStatut === 'Tous' || annonce.statut === filtreStatut;

      return matchSearch && matchStatut;
    });
  }, [searchQuery, filtreStatut, annonces]);

  // Gérer la postulation à un stage
  const handlePostuler = (stageId: string) => {
    const annonce = annonces.find(a => a.id === stageId);
    
    if (!annonce || annonce.placesRestantes <= 0 || annonce.statut !== 'Ouvert') {
      return;
    }

    // Simuler l'appel API
    // TODO: Remplacer par un vrai appel API
    console.log('Postulation pour le stage:', stageId);
    
    // Ajouter à la liste des postulations
    if (!postulations.includes(stageId)) {
      setPostulations([...postulations, stageId]);
      
      // Mettre à jour les places restantes
      setAnnonces(annonces.map(a => {
        if (a.id === stageId) {
          return { ...a, placesRestantes: a.placesRestantes - 1 };
        }
        return a;
      }));
      
      // Afficher le message de succès
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 ml-6 rounded-2xl p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            
            {/* En-tête simple */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Stages Disponibles
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Briefcase size={20} />
                <span>Postulez aux stages qui vous intéressent</span>
              </p>
            </div>

            {/* Message de succès */}
            {showSuccessMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <p className="text-green-700 font-medium">
                  Votre postulation a été envoyée ! L&apos;hôpital consultera votre profil et vos documents.
                </p>
              </div>
            )}

            {/* Filtres simples */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Recherche */}
                <div className="flex-1 relative">
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
                <div className="w-full md:w-48">
                  <select
                    value={filtreStatut}
                    onChange={(e) => setFiltreStatut(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="Tous">Tous les stages</option>
                    <option value="Ouvert">Stages ouverts</option>
                    <option value="Bientôt">Bientôt disponibles</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Statistique simple */}
            <div className="mb-6">
              <p className="text-gray-700">
                <span className="font-bold text-gray-900">{annoncesFilterees.length}</span> stage(s) disponible(s)
              </p>
            </div>

            {/* Liste des annonces */}
            {annoncesFilterees.length > 0 ? (
              <div className="space-y-6">
                {annoncesFilterees.map((annonce) => (
                  <AnnonceCard
                    key={annonce.id}
                    annonce={annonce}
                    onPostuler={handlePostuler}
                    estConnecte={estConnecte}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg mb-2">Aucun stage trouvé</p>
                <p className="text-gray-500">
                  Modifiez vos critères de recherche
                </p>
              </div>
            )}

            {/* Note explicative */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Comment ça marche :</span> Postulez aux stages qui vous intéressent. 
                Les hôpitaux consulteront automatiquement votre profil et vos documents joints pour évaluer votre candidature.
              </p>
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}