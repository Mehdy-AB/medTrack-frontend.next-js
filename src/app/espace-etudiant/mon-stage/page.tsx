"use client";

import { useState, useEffect, useCallback } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import { MapPin, User, Calendar, RefreshCw } from 'lucide-react';
import DataTable, { Column } from '../../Components/DataTable'; // Assuming I can reuse DataTable or similar table structure, or I'll just build simple tables as in design
import { coreApi, evalApi } from '@/services';
import type { Application, Evaluation } from '@/types/api.types';
import { useSession } from 'next-auth/react';

export default function MonStagePage() {
  const { data: session } = useSession();
  const [currentStage, setCurrentStage] = useState<any | null>(null); // Using any since ApplicationWithDetails includes offer
  const [presences, setPresences] = useState<any[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Get accepted application to identify current stage
      const appsRes = await coreApi.listApplications();
      console.log('Applications response:', appsRes.data);

      // Handle DRF pagination
      const apps = appsRes.data?.results || (Array.isArray(appsRes.data) ? appsRes.data : []);

      // Find latest accepted application
      const accepted = apps.find((a: any) => a.status === 'accepted');

      if (accepted) {
        setCurrentStage(accepted);

        // 2. Fetch attendance for this student
        const presRes = await evalApi.listAttendance({ limit: 100 });
        const presData = presRes.data?.results || (Array.isArray(presRes.data) ? presRes.data : []);
        setPresences(presData);

        // 3. Fetch evaluations
        const evalRes = await evalApi.getMyEvaluations();
        const evalData = evalRes.data?.results || (Array.isArray(evalRes.data) ? evalRes.data : []);
        setEvaluations(evalData);
      }
    } catch (err) {
      console.error('Error fetching stage data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Columns for Presences (simplified)
  const presenceColumns: Column<any>[] = [
    { key: 'date', header: 'Date', render: (i) => i.date ? new Date(i.date).toLocaleDateString() : '-' },
    {
      key: 'status', header: 'Statut', render: (i) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${i.status === 'present' ? 'bg-green-100 text-green-800' :
          i.status === 'absent' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
          {i.status}
        </span>
      )
    },
  ];

  // Columns for Evaluations
  const evalColumns: Column<Evaluation>[] = [
    { key: 'evaluator', header: 'Évaluateur', render: (i) => i.evaluator_id || 'Encadrant' },
    { key: 'date', header: 'Date', render: (i) => i.submitted_at ? new Date(i.submitted_at).toLocaleDateString() : '-' },
    { key: 'score', header: 'Note', render: (i) => <span className="font-bold">{i.grade}/20</span> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <>
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarEtudiant />

        <main className="flex-1 ml-6 rounded-2xl bg-gray-50">
          <div className="max-w-7xl mx-auto p-8">

            {/* Warning if no active stage */}
            {!currentStage ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun stage actif</h2>
                <p className="text-gray-600 mb-4">Vous n'avez pas de stage accepté en cours.</p>
                <a href="/espace-etudiant/annonces-stages" className="text-teal-600 hover:underline">Trouver un stage</a>
              </div>
            ) : (
              <>
                {/* Welcome Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl">👋</span>
                        <h1 className="text-2xl font-bold text-gray-900">Bonjour,</h1>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {session?.user?.name || 'Étudiant'}.
                      </h2>
                      <p className="text-gray-600 mb-4">
                        Bienvenue sur votre espace de suivi de stage.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-teal-50 p-2 rounded-lg">
                            <MapPin className="text-teal-500" size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Stage</p>
                            <p className="text-sm font-medium text-gray-900">{currentStage.offer?.title || 'Stage'}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="bg-teal-50 p-2 rounded-lg">
                            <User className="text-teal-500" size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Service</p>
                            <p className="text-sm font-medium text-gray-900">{currentStage.offer?.service_id || '-'}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="bg-teal-50 p-2 rounded-lg">
                            <Calendar className="text-teal-500" size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Date début</p>
                            <p className="text-sm font-medium text-gray-900">
                              {currentStage.offer?.period_start ? new Date(currentStage.offer.period_start).toLocaleDateString() : '-'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Statut:</span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            En cours
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Presences */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Relevé de présences/absences
                  </h3>
                  <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <DataTable
                      data={presences}
                      columns={presenceColumns}
                      keyExtractor={i => i.id}
                      emptyMessage="Aucune présence enregistrée"
                    />
                  </div>
                </div>

                {/* Evaluations */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Évaluations reçues
                  </h3>
                  <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <DataTable
                      data={evaluations}
                      columns={evalColumns}
                      keyExtractor={i => i.id}
                      emptyMessage="Aucune évaluation reçue"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
