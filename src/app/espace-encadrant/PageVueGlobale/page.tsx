// espace-chef-service/PageVueGlobale/page.tsx

"use client";

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../components/Sidebar';
import KPICard from './components/KPICard';
import MedecinsChart from './components/MedecinsChart';
import EvolutionChart from './components/EvolutionChart';
import TableEvaluations from './components/TableEvaluations';
import AlertesSection from './components/AlertesSection';
import PeriodSelector from './components/PeriodSelector';
import ExportButton from './components/ExportButton';
import {
  mockKPIs,
  mockMedecinsCharge,
  mockEvolutionData,
  mockEvaluationsEnCours,
  mockAlertes
} from './models/dashboard.model';

export default function VueGlobalePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Ce mois');

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log('Période changée:', period);
    // TODO: Recharger les données selon la période
  };

  const handleExport = () => {
    console.log('Export PDF en cours...');
    alert('Export du rapport complet en PDF...');
    // TODO: Intégration backend pour générer le PDF
  };

  return (
    <>
      <Navbar />
      <Header spaceName="Espace Chef de Service" notificationCount={8} />
      
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* En-tête avec titre et actions */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Vue globale du service
                </h1>
                <p className="text-gray-600">
                  Tableau de bord stratégique et indicateurs clés de performance
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <PeriodSelector onPeriodChange={handlePeriodChange} />
                <ExportButton onExport={handleExport} />
              </div>
            </div>

            {/* KPIs - 6 cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockKPIs.map((kpi, index) => (
                <KPICard key={index} kpi={kpi} />
              ))}
            </div>

            {/* Graphiques - 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <MedecinsChart medecins={mockMedecinsCharge} />
              <EvolutionChart data={mockEvolutionData} />
            </div>

            {/* Tableau des évaluations */}
            <div className="mb-8">
              <TableEvaluations evaluations={mockEvaluationsEnCours} />
            </div>

            {/* Alertes et Actions rapides - 2 colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AlertesSection alertes={mockAlertes} />
              </div>
               
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}