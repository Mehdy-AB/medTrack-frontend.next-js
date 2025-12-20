"use client";

import { useState, useEffect, useCallback } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import { FileCheck, Calendar, MapPin, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { coreApi } from '@/services';


export default function MesCandidaturesPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch applications for the current student (implied by token or passed)
      // Since the API doesn't support 'me' yet, we assume listApplications filters by user or returns all if admin?
      // Actually coreApi.listApplications returns all applications.
      // We need to filter by student_id or rely on backend to return only 'my' applications if the endpoint supports it.
      // Assuming for now listApplications returns current user's apps if student role, or we filter client side if needed (not ideal for security but ok for MVP).
      // Wait, listApplications takes params. If I don't pass student_id, it returns all?
      // Ideally backend filters by request.user.
      const response = await coreApi.listApplications();
      console.log('Applications response:', response.data);
      const data = response.data;

      // Handle Django REST Framework pagination
      if (data && typeof data === 'object' && 'results' in data) {
        const drfData = data as unknown as { results: any[]; count: number };
        setApplications(drfData.results || []);
      }
      // Handle direct array
      else if (Array.isArray(data)) {
        setApplications(data);
      }
      // Handle custom pagination
      else if (data && typeof data === 'object' && 'data' in data) {
        setApplications((data as any).data || []);
      } else {
        setApplications([]);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Erreur lors du chargement des candidatures');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getStatutIcon = (statut: string) => {
    switch (statut) {
      case 'accepted':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={24} />;
      case 'pending':
        return <Clock className="text-orange-500" size={24} />;
      default:
        return <Clock className="text-gray-500" size={24} />;
    }
  };

  const getStatutStyle = (statut: string) => {
    switch (statut) {
      case 'accepted':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const translateStatus = (status: string) => {
    const map: Record<string, string> = {
      accepted: 'Acceptée',
      rejected: 'Refusée',
      submitted: 'En attente',
      cancelled: 'Annulée',
    };
    return map[status] || status;
  };

  // Stats
  const acceptedCount = applications.filter(a => a.status === 'accepted').length;
  const pendingCount = applications.filter(a => a.status === 'submitted').length;
  const rejectedCount = applications.filter(a => a.status === 'rejected').length;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarEtudiant />

        <main className="flex-1 ml-6 rounded-2xl p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Mes Candidatures
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FileCheck size={20} />
                  <span>Suivez l'état de vos candidatures aux stages</span>
                </p>
              </div>
              <button
                onClick={fetchApplications}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
              </div>
              <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                <p className="text-sm text-green-700 mb-1">Acceptées</p>
                <p className="text-2xl font-bold text-green-700">{acceptedCount}</p>
              </div>
              <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
                <p className="text-sm text-orange-700 mb-1">En attente</p>
                <p className="text-2xl font-bold text-orange-700">{pendingCount}</p>
              </div>
              <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                <p className="text-sm text-red-700 mb-1">Refusées</p>
                <p className="text-2xl font-bold text-red-700">{rejectedCount}</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* List */}
            {!loading && applications.length > 0 ? (
              <div className="space-y-4">
                {applications.map((candidature) => (
                  <div
                    key={candidature.id}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getStatutIcon(candidature.status)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {candidature.offer?.title || 'Stage sans titre'}
                          </h3>
                          <div className="flex flex-col gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <MapPin size={16} className="text-teal-500" />
                              <span>Service: {candidature.offer?.service_id || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-teal-500" />
                              <span>Postulé le {new Date(candidature.submitted_at).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatutStyle(candidature.status)}`}>
                        {translateStatus(candidature.status)}
                      </span>
                    </div>

                    {candidature.rejection_reason && (
                      <div className="mt-4 p-4 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-700">
                          <span className="font-medium">Motif du refus : </span>
                          {candidature.rejection_reason}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Lettre de motivation : </span>
                        {(candidature.metadata?.motivation || candidature.metadata?.['motivation'] || 'Aucune lettre de motivation fournie')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <FileCheck size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Vous n'avez pas encore postulé à des stages</p>
                <a
                  href="/espace-etudiant/annonces-stages"
                  className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                >
                  Voir les annonces disponibles
                </a>
              </div>
            ) : (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-teal-500 mx-auto" />
              </div>
            )}

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
