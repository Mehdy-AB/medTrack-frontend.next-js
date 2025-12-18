"use client";

import { useState, useEffect, useCallback } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import { GraduationCap, TrendingUp, Download, Calendar, RefreshCw } from 'lucide-react';
import { evalApi } from '@/services';
import type { Evaluation } from '@/types/api.types';
import DataTable, { Column } from '../../Components/DataTable';

export default function MesEvaluationsPage() {
  const [evaluations, setEvaluations] = useState<any[]>([]); // Using any for flexible backend response
  const [loading, setLoading] = useState(true);

  const fetchEvaluations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await evalApi.getMyEvaluations();
      console.log('Evaluations response:', response.data);

      // Handle DRF pagination
      const data = response.data;
      if (data && typeof data === 'object' && 'results' in data) {
        setEvaluations(data.results || []);
      } else if (Array.isArray(data)) {
        setEvaluations(data);
      } else if (data && 'data' in data) {
        setEvaluations((data as any).data || []);
      } else {
        setEvaluations([]);
      }
    } catch (err) {
      console.error('Error fetching evaluations:', err);
      setEvaluations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvaluations();
  }, [fetchEvaluations]);

  // Stats
  const validScores = evaluations.filter(e => e.average_score != null).map(e => Number(e.average_score));
  const moyenneGenerale = validScores.length > 0
    ? validScores.reduce((a, b) => a + b, 0) / validScores.length
    : 0;

  const maxScore = validScores.length > 0 ? Math.max(...validScores) : 0;
  const completedCount = evaluations.filter(e => e.status === 'completed').length;

  const columns: Column<Evaluation>[] = [
    { key: 'date', header: 'Date', render: (i) => i.evaluation_date ? new Date(i.evaluation_date).toLocaleDateString() : '-' },
    { key: 'evaluator', header: 'Évaluateur', render: (i) => i.encadrant_id || '-' }, // Ideally fetch name
    {
      key: 'criteria', header: 'Critères', render: (i) => (
        <div className="text-xs text-gray-500 max-w-xs truncate">
          {i.criteres ? JSON.stringify(i.criteres) : '-'}
        </div>
      )
    },
    {
      key: 'comment', header: 'Appréciation', render: (i) => (
        <div className="text-sm italic text-gray-600 max-w-xs truncate">{i.commentaire || '-'}</div>
      )
    },
    {
      key: 'score', header: 'Note', render: (i) => (
        <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{i.average_score || '-'}/20</span>
      )
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarEtudiant />

        <main className="flex-1 ml-6 rounded-2xl bg-gray-50 overflow-x-auto">
          <div className="max-w-7xl mx-auto p-8">

            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Mes évaluations
                </h1>
                <p className="text-gray-600 flex items-center space-x-2">
                  <GraduationCap size={20} />
                  <span>Suivez vos performances et vos retours des évaluation pour chaque stage.</span>
                </p>
              </div>
              <button onClick={fetchEvaluations} className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg">
                <RefreshCw className={loading ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Moyenne */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Moyenne générale</p>
                  <TrendingUp className="text-teal-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {moyenneGenerale.toFixed(1)}
                  <span className="text-xl text-gray-500">/20</span>
                </p>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  {moyenneGenerale >= 15 ? 'Excellent' : moyenneGenerale >= 10 ? 'Satisfaisant' : 'Insuffisant'}
                </span>
              </div>

              {/* Count */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Stages évalués</p>
                  <Calendar className="text-blue-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {evaluations.length}
                </p>
                <p className="text-xs text-gray-600">
                  {completedCount} terminés
                </p>
              </div>

              {/* Best Score */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Meilleure note</p>
                  <GraduationCap className="text-yellow-500" size={20} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {maxScore}
                  <span className="text-xl text-gray-500">/20</span>
                </p>
              </div>
            </div>

            {/* List */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Historique des évaluations
              </h2>
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <DataTable
                  data={evaluations}
                  columns={columns}
                  keyExtractor={i => i.id}
                  loading={loading}
                  emptyMessage="Aucune évaluation trouvée"
                />
              </div>
            </div>

            {/* Download */}
            <div className="flex justify-start mt-6">
              <button className="flex items-center space-x-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors shadow-sm hover:shadow-md">
                <Download size={18} />
                <span className="font-medium">Télécharger toutes mes évaluations (PDF)</span>
              </button>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}