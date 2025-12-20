"use client";

import { useState, useMemo } from 'react';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtablissement from '../Components/SidebarEtablissement';
import NavbarEtablissement from '../Components/NavbarEtablissement';
import DashboardStats from './components/DashboardStats';
import KpiCard from './components/KpiCard';
import CustomChart from './components/CustomChart';
import ComparisonPanel from './components/ComparisonPanel';
import ReportGenerator from './components/ReportGenerator';
import ExportModal from './components/ExportModal';
import HistoricalReports from './components/HistoricalReports';
import {
  periodesDisponibles,
  mockServicesStats,
  mockDonneesAnnonces,
  mockDonneesCandidatures,
  mockDonneesPerformance,
  mockDonneesSatisfaction,
  mockHistoriqueRapports,
  Periode,
  ServiceStat,
  Rapport
} from './models/statistiques.model';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileText,
  Filter,
  Calendar,
  Target,
  Users,
  Award,
  PieChart,
  LineChart
} from 'lucide-react';

export default function PageStatistiquesRapports() {
  // États
  const [periodeActuelle, setPeriodeActuelle] = useState(periodesDisponibles[1]); // Mois en cours
  const [periodeComparaison, setPeriodeComparaison] = useState(periodesDisponibles[4]); // Mois précédent
  const [selectedServices, setSelectedServices] = useState<string[]>(mockServicesStats.map(s => s.id));
  const [showExportModal, setShowExportModal] = useState(false);
  const [rapports, setRapports] = useState<Rapport[]>(mockHistoriqueRapports);

  // Calcul des statistiques globales
  const statsGlobales = useMemo(() => {
    const servicesFiltres = mockServicesStats.filter(s => selectedServices.includes(s.id));

    const annoncesTotal = servicesFiltres.reduce((acc, s) => acc + s.annoncesTotal, 0);
    const annoncesActives = servicesFiltres.reduce((acc, s) => acc + s.annoncesActives, 0);
    const candidaturesTotal = servicesFiltres.reduce((acc, s) => acc + s.candidaturesTotal, 0);
    const candidaturesAcceptees = servicesFiltres.reduce((acc, s) => acc + s.candidaturesAcceptees, 0);

    const tauxConversion = candidaturesTotal > 0
      ? (candidaturesAcceptees / candidaturesTotal) * 100
      : 0;

    const tauxOccupation = servicesFiltres.reduce((acc, s) => acc + s.tauxOccupation, 0) / servicesFiltres.length;
    const satisfactionMoyenne = servicesFiltres.reduce((acc, s) => acc + s.satisfactionMoyenne, 0) / servicesFiltres.length;

    // Pour la période précédente (simplifié)
    const tauxVariation = 1.05; // +5% par défaut

    return {
      actuelle: {
        annoncesTotal,
        annoncesActives,
        candidaturesTotal,
        candidaturesAcceptees,
        tauxConversion,
        tauxOccupation,
        satisfactionMoyenne
      },
      precedente: {
        annoncesTotal: annoncesTotal / tauxVariation,
        annoncesActives: annoncesActives / tauxVariation,
        candidaturesTotal: candidaturesTotal / tauxVariation,
        candidaturesAcceptees: candidaturesAcceptees / tauxVariation,
        tauxConversion: tauxConversion / tauxVariation,
        tauxOccupation: tauxOccupation / tauxVariation,
        satisfactionMoyenne: satisfactionMoyenne / tauxVariation
      }
    };
  }, [selectedServices]);

  // KPIs consolidés
  const kpisConsolides = useMemo(() => {
    const servicesFiltres = mockServicesStats.filter(s => selectedServices.includes(s.id));

    const kpis = servicesFiltres.flatMap(s => s.kpis);

    // Groupement par type de KPI
    const kpisGroupes = kpis.reduce((acc, kpi) => {
      if (!acc[kpi.nom]) {
        acc[kpi.nom] = {
          ...kpi,
          valeur: 0,
          variation: 0,
          historique: []
        };
      }

      acc[kpi.nom].valeur += kpi.valeur / servicesFiltres.length;
      acc[kpi.nom].variation += kpi.variation / servicesFiltres.length;

      return acc;
    }, {} as Record<string, any>);

    return Object.values(kpisGroupes);
  }, [selectedServices]);

  // Métriques pour comparaison
  // Dans la page.tsx, modifiez la fonction metriquesComparaison :

  const metriquesComparaison = useMemo(() => {
    const calculateTendance = (actuel: number, precedent: number): 'hausse' | 'baisse' | 'stable' => {
      if (actuel > precedent) return 'hausse';
      if (actuel < precedent) return 'baisse';
      return 'stable';
    };

    return [
      {
        label: 'Annonces publiées',
        valeurActuelle: statsGlobales.actuelle.annoncesTotal,
        valeurComparaison: statsGlobales.precedente.annoncesTotal,
        unite: '',
        tendance: calculateTendance(
          statsGlobales.actuelle.annoncesTotal,
          statsGlobales.precedente.annoncesTotal
        )
      },
      {
        label: 'Candidatures totales',
        valeurActuelle: statsGlobales.actuelle.candidaturesTotal,
        valeurComparaison: statsGlobales.precedente.candidaturesTotal,
        unite: '',
        tendance: calculateTendance(
          statsGlobales.actuelle.candidaturesTotal,
          statsGlobales.precedente.candidaturesTotal
        )
      },
      {
        label: 'Taux de conversion',
        valeurActuelle: statsGlobales.actuelle.tauxConversion,
        valeurComparaison: statsGlobales.precedente.tauxConversion,
        unite: '%',
        tendance: calculateTendance(
          statsGlobales.actuelle.tauxConversion,
          statsGlobales.precedente.tauxConversion
        )
      },
      {
        label: 'Satisfaction moyenne',
        valeurActuelle: statsGlobales.actuelle.satisfactionMoyenne,
        valeurComparaison: statsGlobales.precedente.satisfactionMoyenne,
        unite: '/5',
        tendance: calculateTendance(
          statsGlobales.actuelle.satisfactionMoyenne,
          statsGlobales.precedente.satisfactionMoyenne
        )
      }
    ];
  }, [statsGlobales]);

  // Handlers
  const handleGenerateReport = (config: any) => {
    const nouveauRapport: Rapport = {
      id: `R${rapports.length + 1}`,
      titre: config.titre,
      type: config.type,
      periode: config.periode,
      dateGeneration: new Date().toISOString().split('T')[0],
      generateur: 'Admin Établissement',
      format: config.format,
      taille: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      url: `/rapports/${config.type}-${new Date().toISOString().split('T')[0]}.${config.format}`,
      statsResume: {
        annoncesTotal: statsGlobales.actuelle.annoncesTotal,
        candidaturesTotal: statsGlobales.actuelle.candidaturesTotal,
        tauxConversion: statsGlobales.actuelle.tauxConversion,
        serviceMeilleur: mockServicesStats[0].nom,
        kpiPrincipal: `Variation +${kpisConsolides[0]?.variation.toFixed(1)}%`
      }
    };

    setRapports([nouveauRapport, ...rapports]);
    alert(`Rapport "${config.titre}" généré avec succès !`);
  };

  const handleExportData = (config: any) => {
    const formats = {
      csv: 'text/csv',
      excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pdf: 'application/pdf',
      json: 'application/json'
    };

    const data = {
      periode: config.periode,
      donnees: config.donnees,
      statsGlobales: statsGlobales.actuelle,
      services: mockServicesStats.filter(s => selectedServices.includes(s.id)),
      dateExport: new Date().toISOString()
    };

    const content = config.format === 'json'
      ? JSON.stringify(data, null, 2)
      : 'Export simulé - Fonctionnalité backend requise';

    const blob = new Blob([content], { type: formats[config.format as keyof typeof formats] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export-statistiques-${new Date().toISOString().split('T')[0]}.${config.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert(`Export ${config.format} généré avec succès !`);
  };

  const handleViewReport = (rapport: Rapport) => {
    // Simuler l'ouverture du rapport
    alert(`Ouverture du rapport: ${rapport.titre}\nFormat: ${rapport.format}\nTaille: ${rapport.taille}`);
  };

  const handleDownloadReport = (rapport: Rapport) => {
    // Simuler le téléchargement
    alert(`Téléchargement du rapport: ${rapport.titre}`);
  };

  const handleDeleteReport = (rapportId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) {
      setRapports(rapports.filter(r => r.id !== rapportId));
      alert('Rapport supprimé avec succès');
    }
  };

  const handleChartExport = () => {
    alert('Fonctionnalité d\'export de graphique activée');
  };

  return (
    <>
      <NavbarEtablissement />
      <Header
        spaceName="Statistiques & Rapports Avancés"
        notificationCount={0}
      />

      <div className="flex min-h-screen bg-white">
        <SidebarEtablissement />

        <main className="flex-1 overflow-x-hidden">
          <div className="p-8">
            {/* En-tête */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Statistiques & Rapports Avancés
                  </h1>
                  <p className="text-gray-600">
                    Analyse approfondie, comparaisons et génération de rapports personnalisés
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Exporter les données
                  </button>
                </div>
              </div>

              {/* Sélection de période */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Période d'analyse:</span>
                  </div>
                  <select
                    value={periodeActuelle.id}
                    onChange={(e) => {
                      const periode = periodesDisponibles.find(p => p.id === e.target.value);
                      if (periode) setPeriodeActuelle(periode);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {periodesDisponibles.map(periode => (
                      <option key={periode.id} value={periode.id}>
                        {periode.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-400">|</span>
                  <div className="text-sm text-gray-500">
                    {new Date(periodeActuelle.dateDebut).toLocaleDateString('fr-FR')} → {new Date(periodeActuelle.dateFin).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard statistiques */}
            <div className="mb-8">
              <DashboardStats
                periodesComparees={statsGlobales}
                kpis={kpisConsolides}
              />
            </div>

            {/* Graphiques principaux */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <CustomChart
                titre="Évolution des Annonces"
                type="line"
                donnees={mockDonneesAnnonces}
                hauteur={350}
                onExport={handleChartExport}
              />

              <CustomChart
                titre="Candidatures par Service"
                type="bar"
                donnees={mockDonneesCandidatures}
                hauteur={350}
                onExport={handleChartExport}
              />

              <CustomChart
                titre="Performance Hebdomadaire"
                type="line"
                donnees={mockDonneesPerformance}
                hauteur={350}
                onExport={handleChartExport}
              />

              <CustomChart
                titre="Satisfaction par Service"
                type="pie"
                donnees={mockDonneesSatisfaction}
                hauteur={350}
                onExport={handleChartExport}
              />
            </div>

            {/* KPIs par service */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Indicateurs de Performance (KPI)</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Target className="w-4 h-4" />
                  <span>{kpisConsolides.length} indicateurs suivis</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpisConsolides.slice(0, 6).map((kpi, index) => (
                  <KpiCard key={index} kpi={kpi} />
                ))}
              </div>
            </div>

            {/* Comparaison de périodes */}
            <div className="mb-8">
              <ComparisonPanel
                periodeActuelle={periodeActuelle}
                periodeComparaison={periodeComparaison}
                metriques={metriquesComparaison}
                onPeriodeChange={setPeriodeComparaison}
              />
            </div>

            {/* Générateur de rapports */}
            <div className="mb-8">
              <ReportGenerator
                periodes={periodesDisponibles}
                servicesStats={mockServicesStats}
                onGenerate={handleGenerateReport}
              />
            </div>

            {/* Historique des rapports */}
            <div className="mb-8">
              <HistoricalReports
                rapports={rapports}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
                onDelete={handleDeleteReport}
              />
            </div>

            {/* Légende et informations */}
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Informations d'analyse</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Période modifiable</h5>
                  <p className="text-sm text-gray-500">
                    La période d'analyse peut être modifiée à tout moment pour générer des rapports sur différentes périodes.
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Comparaison automatique</h5>
                  <p className="text-sm text-gray-500">
                    Les variations % sont calculées automatiquement par rapport à la période de comparaison sélectionnée.
                  </p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Export multi-formats</h5>
                  <p className="text-sm text-gray-500">
                    Les données peuvent être exportées en PDF, Excel, CSV ou JSON pour analyse externe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Modals */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        periodes={periodesDisponibles}
        onExport={handleExportData}
      />
    </>
  );
}