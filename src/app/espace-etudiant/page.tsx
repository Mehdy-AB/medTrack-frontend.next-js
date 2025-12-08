"use client";

import { useState, useEffect } from 'react';
import NavbarEtudiant from '../espace-etudiant/Components/NavbarEtudiant';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import SidebarEtudiant from './Components/SidebarEtudiant';
import NotificationCard from './Components/NotificationCard';
import { Bell, Calendar, MapPin, Stethoscope } from 'lucide-react';
import { AccueilEtudiantData, mockAccueilData } from './models/etudiant.model';

export default function EspaceEtudiant() {
  // État pour les données (à remplacer par un appel API)
  const [data, setData] = useState<AccueilEtudiantData>(mockAccueilData);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour charger les données depuis le backend
  const fetchAccueilData = async () => {
    setIsLoading(true);
    try {
      // TODO: Remplacer par votre endpoint API
      // const response = await fetch('/api/etudiant/accueil');
      // const data = await response.json();
      // setData(data);
      
      // Pour l'instant, on utilise les données mockées
      setData(mockAccueilData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchAccueilData();
  }, []);

  // Afficher un loader pendant le chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const { etudiant, stageActuel, notifications, dateActuelle } = data;
  const nomComplet = `${etudiant.prenom.toUpperCase()} ${etudiant.nom.toUpperCase()}`;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header 
        spaceName="Espace Étudiant" 
        notificationCount={notifications.filter(n => !n.isRead).length} 
      />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 ml-6 rounded-2xl p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Carte de bienvenue avec photo */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    👋 Bonjour {nomComplet},
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-6">
                    Bienvenue sur votre espace de suivi de stage en médecine.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">Aujourd&apos;hui :</span>
                      <span>{dateActuelle}</span>
                    </div>
                    
                    {stageActuel ? (
                      <>
                        <div className="flex items-center gap-3 text-gray-600">
                          <Stethoscope className="w-5 h-5 text-teal-600" />
                          <span className="font-medium">Stage :</span>
                          <span>{stageActuel.nomStage}</span>
                        </div>
                        
                        <div className="flex items-center gap-3 text-gray-600">
                          <MapPin className="w-5 h-5 text-teal-600" />
                          <span className="font-medium">Lieu :</span>
                          <span>{stageActuel.hopital}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Stethoscope className="w-5 h-5 text-gray-400" />
                        <span className="font-medium">Aucun stage en cours</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Image des médecins */}
                <div className="ml-8">
                  <img 
                    src={etudiant.photo || '/img/Acceuil-etudiant.png'}
                    alt="Équipe médicale"
                    className="w-64 h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Rappels importants */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-teal-600" />
                Rappels Importants:
              </h2>
              
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <NotificationCard 
                      key={notification.id} 
                      notification={notification} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Aucune notification pour le moment
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <Footer/> 
    </div>
  );
}