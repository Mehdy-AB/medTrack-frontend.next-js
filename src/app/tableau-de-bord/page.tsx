"use client";

import NavbarAdmin from './Components/NavbarAdmin';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import SidebarAdmin from './Components/SidebarAdmin';
import StatCard from './Components/StatCard';
import BarChart from './Components/BarChart';
import DonutChart from './Components/DonutChart';
import LineChart from './Components/LineChart';
import { Calendar, Building2, Stethoscope, Download, FileText, FileSpreadsheet, Code, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { profileApi } from '@/services/profile';
import { DashboardStats } from '@/types/api.types';

// Définir les types TypeScript pour nos données
interface StatItem {
  emoji: string;
  label: string;
  value: string | number;
}

interface Etablissement {
  nom: string;
  services: string[];
  nbEtudiants: number;
}

interface ChartData {
  label: string;
  value: number;
}

interface DashboardData {
  metadata: {
    titre: string;
    dateGeneration: string;
    formatDateLisible: string;
  };
  statistiques: {
    globales: StatItem[];
    etudiants: Array<{ statut: string, nombre: number, icone: string }>;
    resume: {
      totalEtudiants: number;
      etudiantsEnStage: number;
      etudiantsSansStage: number;
      tauxPlacement: string;
    };
  };
  etablissements: Etablissement[];
  visualisations: {
    repartitionHopitaux: ChartData[];
    statutStages: ChartData[];
    evolutionMensuelle: ChartData[];
  };
  analyses: {
    hopitalPlusCharge: ChartData;
    hopitalMoinsCharge: ChartData;
    moisPlusActif: ChartData;
  };
}

export default function EspaceAdmin() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await profileApi.getDashboardStats();
        setDashboardStats(response.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Données statistiques
  const stats = useMemo(() => [
    { emoji: '🎓', label: 'Total Etudiants', value: dashboardStats?.total_students ?? '...' },
    { emoji: '🏥', label: 'Hôpitaux partenaires', value: dashboardStats?.total_establishments ?? '...' },
    { emoji: '👨‍⚕️', label: 'Total Encadrants', value: dashboardStats?.total_encadrants ?? '...' },
    { emoji: '🔬', label: 'Stages actifs', value: '36' }, // Still mock as it needs stage-service
    { emoji: '🎓', label: 'Stages terminés ce mois-ci', value: '40' },
    { emoji: '⏱️', label: 'Stages en attente de validation', value: '10' }
  ], [dashboardStats]);

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
  const studentsPerHospital = useMemo(() => {
    if (!dashboardStats?.establishment_types) return [];
    return Object.entries(dashboardStats.establishment_types).map(([type, count]) => ({
      label: type,
      value: count
    }));
  }, [dashboardStats]);

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

  // État pour le menu déroulant d'export
  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ========== FONCTION D'EXPORT JSON ==========
  const exportToJSON = () => {
    try {
      // Rassemblez TOUTES les données dans un seul objet structuré
      const allData: DashboardData = {
        metadata: {
          titre: "Rapport de gestion des stages hospitaliers",
          dateGeneration: new Date().toISOString(),
          formatDateLisible: new Date().toLocaleDateString('fr-FR'),
        },

        statistiques: {
          globales: stats.map(stat => ({
            ...stat,
            valeur: parseInt(stat.value.toString()) || stat.value
          })),

          etudiants: etudiantsStats.map(stat => ({
            statut: stat.label.replace('Étudiants ', ''),
            nombre: parseInt(stat.value.toString()),
            icone: stat.emoji
          })),

          resume: {
            totalEtudiants: parseInt(stats.find(s => s.label === 'Total Etudiants')?.value.toString() || '0'),
            etudiantsEnStage: parseInt(etudiantsStats.find(s => s.label === 'Étudiants en stage')?.value.toString() || '0'),
            etudiantsSansStage: parseInt(etudiantsStats.find(s => s.label === 'Étudiants sans stage')?.value.toString() || '0'),
            tauxPlacement: ((parseInt(etudiantsStats.find(s => s.label === 'Étudiants en stage')?.value.toString() || '0') /
              parseInt(stats.find(s => s.label === 'Total Etudiants')?.value.toString() || '1')) * 100).toFixed(1) + '%'
          }
        },

        etablissements: etablissements,

        visualisations: {
          repartitionHopitaux: studentsPerHospital,
          statutStages: stageStatus,
          evolutionMensuelle: evolutionData
        },

        analyses: {
          hopitalPlusCharge: studentsPerHospital.reduce((max, hop) =>
            hop.value > max.value ? hop : max, { label: '', value: 0 }
          ),
          hopitalMoinsCharge: studentsPerHospital.reduce((min, hop) =>
            hop.value < min.value ? hop : min, { label: '', value: Infinity }
          ),
          moisPlusActif: evolutionData.reduce((max, mois) =>
            mois.value > max.value ? mois : max, { label: '', value: 0 }
          )
        }
      };

      // Formater le JSON joliment avec indentation
      const jsonContent = JSON.stringify(allData, null, 2);

      // Créer et télécharger le fichier
      const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Nom du fichier avec date
      const date = new Date();
      const fileName = `rapport-stages-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.json`;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExportOpen(false);

      // Message de confirmation
      alert(`✅ Rapport JSON exporté avec succès !\nFichier: ${fileName}`);

    } catch (error) {
      console.error('Erreur lors de l\'export JSON:', error);
      alert('❌ Erreur lors de l\'export du rapport JSON');
    }
  };

  // ========== FONCTIONS D'EXPORT SIMPLIFIÉES (PDF & Excel) ==========
  const exportToPDF = () => {
    alert('Pour l\'export PDF, installez: npm install jspdf jspdf-autotable');
    setIsExportOpen(false);
  };

  const exportToExcel = () => {
    alert('Pour l\'export Excel, installez: npm install xlsx');
    setIsExportOpen(false);
  };

  const exportToCSV = () => {
    try {
      // Créer un CSV plus complet avec toutes les données
      const csvLines = [
        "=== RAPPORT TABLEAU DE BORD - GESTION DES STAGES HOSPITALIERS ===",
        `Date de génération: ${new Date().toLocaleDateString('fr-FR')}`,
        "",
        "=== STATISTIQUES GLOBALES ===",
        "Indicateur,Valeur",
        ...stats.map(stat => `"${stat.label}",${stat.value}`),
        "",
        "=== ÉTUDIANTS EN STAGE ===",
        "Statut,Nombre",
        ...etudiantsStats.map(stat => `"${stat.label}",${stat.value}`),
        "",
        "=== ÉTABLISSEMENTS PARTENAIRES ===",
        "Établissement,Nombre d'étudiants,Services",
        ...etablissements.map(etab => {
          const servicesStr = etab.services.map(s => s.replace(/"/g, "'")).join('; ');
          return `"${etab.nom}",${etab.nbEtudiants},"${servicesStr}"`;
        }),
        "",
        "=== RÉPARTITION PAR HÔPITAL ===",
        "Hôpital,Nombre d'étudiants",
        ...studentsPerHospital.map(h => `"${h.label}",${h.value}`),
        "",
        "=== STATUT DES STAGES ===",
        "Statut,Nombre",
        ...stageStatus.map(s => `"${s.label}",${s.value}`),
        "",
        "=== ÉVOLUTION MENSUELLE ===",
        "Mois,Nombre de stages actifs",
        ...evolutionData.map(e => `"${e.label}",${e.value}`),
      ];

      const csvContent = csvLines.join('\n');

      // Créer et télécharger le fichier
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const date = new Date();
      const fileName = `rapport-stages-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.csv`;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExportOpen(false);
      alert(`✅ Rapport CSV exporté avec succès !\nFichier: ${fileName}`);

    } catch (error) {
      console.error('Erreur lors de l\'export CSV:', error);
      alert('❌ Erreur lors de l\'export du rapport CSV');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Tableau de Bord" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">

            {/* Titre principal avec bouton d'export */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Tableau de bord administrateur
              </h1>

              {/* Bouton d'export avec menu déroulant */}
              <div className="relative" ref={exportRef}>
                <button
                  onClick={() => setIsExportOpen(!isExportOpen)}
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Download className="w-5 h-5" />
                  <span>Exporter le rapport</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExportOpen ? 'rotate-180' : ''}`} />
                </button>

                {isExportOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border border-gray-200 animate-fadeIn">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b flex justify-between items-center">
                        <span>Choisir le format :</span>
                        <button onClick={() => setIsExportOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Option JSON */}
                      <button
                        onClick={exportToJSON}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <Code className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="font-medium">JSON</div>
                          <div className="text-xs text-gray-500">Données structurées</div>
                        </div>
                      </button>

                      <button
                        onClick={exportToPDF}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 text-red-500" />
                        <div>
                          <div className="font-medium">PDF</div>
                          <div className="text-xs text-gray-500">Pour impression</div>
                        </div>
                      </button>

                      <button
                        onClick={exportToExcel}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-green-600" />
                        <div>
                          <div className="font-medium">Excel</div>
                          <div className="text-xs text-gray-500">Pour analyse</div>
                        </div>
                      </button>

                      <button
                        onClick={exportToCSV}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="font-medium">CSV</div>
                          <div className="text-xs text-gray-500">Format simple</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

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

            {/* Statistiques Étudiants en stage vs sans stage */}
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

            {/* Liste des établissements et services */}
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