"use client";

import NavbarAdmin from './Components/NavbarAdmin';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import SidebarAdmin from './Components/SidebarAdmin';
import StatCard from './Components/StatCard';
import BarChart from './Components/BarChart';
import DonutChart from './Components/DonutChart';
import LineChart from './Components/LineChart';
import { Calendar, Building2, Stethoscope, Users, UserX } from 'lucide-react';

export default function EspaceAdmin() {
  // Données statistiques
  const stats = [
    { emoji: '🎓', label: 'Total Etudiants', value: '820' },
    { emoji: '🏥', label: 'Hôpitaux partenaires', value: '3' },
    { emoji: '👨‍⚕️', label: 'Total Encadrants', value: '120' },
    { emoji: '🔬', label: 'Stages actifs', value: '36' },
    { emoji: '🎓', label: 'Stages terminés ce mois-ci', value: '40' },
    { emoji: '⏱️', label: 'Stages en attente de validation', value: '10' }
  ];

  // NOUVELLES DONNÉES - Étudiants en stage vs sans stage
  const etudiantsStats = [
    { emoji: '✅', label: 'Étudiants en stage', value: '756' },
    { emoji: '❌', label: 'Étudiants sans stage', value: '64' }
  ];

  // NOUVELLES DONNÉES - Liste des établissements avec services
  const etablissements = [
    {
      nom: 'Hôpital THENIA',
      services: ['Chirurgie Cardiaque', 'Pédiatrie', 'Urgences', 'Radiologie'],
      nbEtudiants: 280
    },
    {
      nom: 'CHU DELLES',
      services: ['Médecine Interne', 'Cardiologie', 'Neurologie', 'Oncologie', 'ORL'],
      nbEtudiants: 341
    },
    {
      nom: 'Centre Bordj Menail',
      services: ['Médecine Générale', 'Gynécologie', 'Dermatologie'],
      nbEtudiants: 199
    }
  ];

  // Données pour les graphiques
  const studentsPerHospital = [
    { label: 'THENIA', value: 280 },
    { label: "DELLES", value: 341 },
    { label: 'Bordj Menail', value: 199 }
  ];

  const stageStatus = [
    { label: 'En cours', value: 36 },
    { label: 'Terminés', value: 40 },
    { label: 'En attente', value: 10 }
  ];

  const evolutionData = [
    { label: 'Janvier', value: 25 },
    { label: 'Février', value: 32 },
    { label: 'Mars', value: 28 },
    { label: 'Avril', value: 35 },
    { label: 'Mai', value: 22 },
    { label: 'Juin', value: 29 },
    { label: 'Juillet', value: 38 },
    { label: 'Août', value: 25 },
    { label: 'Septembre', value: 33 },
    { label: 'Octobre', value: 39 },
    { label: 'Novembre', value: 27 },
    { label: 'Décembre', value: 30 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Tableau de Bord" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarAdmin />
        
        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            
            {/* Titre principal */}
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Tableau de bord administrateur
            </h1>

            {/* Carte de bienvenue */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                👋 Bonjour, Admin !
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Aujourd&apos;hui : Lundi 20 octobre 2025</span>
              </div>
            </div>

            {/* Grille de statistiques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  emoji={stat.emoji}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>

            {/* NOUVEAU - Statistiques Étudiants en stage vs sans stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {etudiantsStats.map((stat, index) => (
                <StatCard
                  key={index}
                  emoji={stat.emoji}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>

            {/* NOUVEAU - Liste des établissements et services */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-teal-600" />
                Liste des établissements et services
              </h2>
              
              <div className="space-y-6">
                {etablissements.map((etablissement, index) => (
                  <div key={index} className="border-l-4 border-teal-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        🏥 {etablissement.nom}
                      </h3>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {etablissement.nbEtudiants} étudiants
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {etablissement.services.map((service, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                        >
                          <Stethoscope className="w-3 h-3" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Visualisations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <BarChart data={studentsPerHospital} />
              <DonutChart data={stageStatus} />
            </div>

            {/* Graphique d'évolution */}
            <LineChart data={evolutionData} />
          </div>
        </main>
      </div>
      
      <Footer /> 
    </div>
  );
}