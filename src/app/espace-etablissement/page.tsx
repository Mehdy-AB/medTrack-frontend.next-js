"use client";

import { useState, useMemo } from 'react';
import NavbarEtablissement from './components/NavbarEtablissement';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import SidebarEtablissement from './components/SidebarEtablissement';
import KPICard from './components/KPICard';
import ChartKPIs from './components/ChartKPIs';
import TendancesChart from './components/TendancesChart';
import AlertesUrgentes from './components/AlertesUrgentes';
import TableServices from './components/TableServices';
import FilterTableauBord from './components/FilterTableauBord';
import MessageGlobalModal from './components/MessageGlobalModal';
import { 
  mockServices, 
  mockKPIs, 
  mockTendances, 
  mockAlertes,
  ServiceData,
  Alerte
} from './models/tableau-bord.model';

export default function TableauBordEtablissementPage() {
  const [services, setServices] = useState<ServiceData[]>(mockServices);
  const [alertes, setAlertes] = useState<Alerte[]>(mockAlertes);
  const [filters, setFilters] = useState({ statut: '' });
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Filtrer les services selon les filtres
  const filteredServices = useMemo(() => {
    let result = [...services];
    
    if (filters.statut) {
      result = result.filter(service => service.statut === filters.statut.toLowerCase().replace('-', ''));
    }
    
    return result;
  }, [services, filters]);

  // Calculer les KPIs globaux
  const globalKPIs = useMemo(() => {
    const totalCandidatures = services.reduce((sum, s) => sum + s.candidaturesAttente, 0);
    const urgentCandidatures = services.filter(s => s.candidaturesAttente > 10).length;
    
    return {
      totalCandidatures,
      urgentCandidatures,
      totalAlertes: alertes.filter(a => a.priorite === 1).length
    };
  }, [services, alertes]);

  // Handlers
  const handleFilterChange = (newFilters: { statut: string }) => {
    setFilters(newFilters);
  };

  const handleResolveAlerte = (id: string) => {
    setAlertes(prev => prev.filter(alerte => alerte.id !== id));
  };

  const handleExport = () => {
    setExporting(true);
    
    // Simuler l'export
    setTimeout(() => {
      const data = {
        services: filteredServices,
        kpis: mockKPIs,
        tendances: mockTendances,
        alertes: alertes,
        dateExport: new Date().toISOString()
      };
      
      const content = JSON.stringify(data, null, 2);
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport_etablissement_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      setExporting(false);
      alert('Rapport exporté avec succès !');
    }, 1000);
  };

  const handleMessageGlobal = (data: { message: string; destinataires: string[]; copieAdmin: boolean }) => {
    console.log('Envoi message global:', data);
    alert(`Message envoyé à ${data.destinataires.length} groupe(s) de destinataires !`);
  };

  const handleReset = () => {
    setFilters({ statut: '' });
  };

  return (
    <>
      <NavbarEtablissement />
      <Header spaceName="Espace Établissement" notificationCount={globalKPIs.urgentCandidatures} />
      
      <div className="flex min-h-screen bg-white">
        <SidebarEtablissement />
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tableau de Bord Établissement
              </h1>
              <p className="text-gray-600">
                Vision stratégique complète de l&apos;activité de formation
              </p>
              
              {/* Indicateurs urgents */}
              <div className="flex gap-4 mt-4">
                {globalKPIs.totalCandidatures > 20 && (
                  <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    ⚠️ {globalKPIs.totalCandidatures} candidatures en attente
                  </div>
                )}
                {globalKPIs.urgentCandidatures > 0 && (
                  <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    ⚡ {globalKPIs.urgentCandidatures} services avec +10 candidatures
                  </div>
                )}
                {globalKPIs.totalAlertes > 0 && (
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    🔔 {globalKPIs.totalAlertes} alertes urgentes
                  </div>
                )}
              </div>
            </div>

            {/* Filtres */}
            <div className="mb-6">
              <FilterTableauBord 
                onFilterChange={handleFilterChange}
                onExport={handleExport}
                onMessageGlobal={() => setShowMessageModal(true)}
                onReset={handleReset}
              />
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockKPIs.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ChartKPIs services={filteredServices} />
              <TendancesChart tendances={mockTendances} />
            </div>

            {/* Alertes et Tableau */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-1">
                <AlertesUrgentes 
                  alertes={alertes} 
                  onResolve={handleResolveAlerte}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Performance des Services</h3>
                    <span className="text-sm text-gray-500">
                      {filteredServices.length} services affichés
                    </span>
                  </div>
                  <TableServices services={filteredServices} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />

      {/* Modals */}
      <MessageGlobalModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        onSend={handleMessageGlobal}
      />
    </>
  );
}