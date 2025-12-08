"use client";

import NavbarAdmin from './Components/NavbarAdmin';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import SidebarAdmin from './Components/SidebarAdmin';
import StatCard from './Components/StatCard';
import BarChart from './Components/BarChart';
import DonutChart from './Components/DonutChart';
import LineChart from './Components/LineChart';
import { Calendar } from 'lucide-react';

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
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Tableau de Bord" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarAdmin />
        
        <main className="flex-1 p-8 bg-gray-50">
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
                <span>Aujourd'hui : Lundi 20 octobre 2025</span>
              </div>
            </div>

            {/* Grille de statistiques */}
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
