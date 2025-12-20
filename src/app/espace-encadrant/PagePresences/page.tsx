"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import NavbarEncadrant from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEncadrant from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchInput from '../../Components/SearchInput';
import { FilterDropdown, FilterBar } from '../../Components/FilterDropdown';
import DataTable, { Column } from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { evalApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { StudentWithUser } from '@/types/api.types';

interface AttendanceFilters {
  status: string;
  date: string;
  [key: string]: string | number | boolean | string[] | undefined;
}

interface Attendance {
  id: string;
  student_id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  student?: {
    student_number?: string;
    user?: {
      first_name?: string;
      last_name?: string;
    };
  };
}

export default function PresencesPage() {
  // State
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<AttendanceFilters>({
    status: '',
    date: new Date().toISOString().split('T')[0], // Default to today
  });

  // Fetch attendances
  const fetchAttendances = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...toQueryParams(),
        page: pagination.page,
        limit: pagination.perPage,
      };

      const response = await evalApi.listAttendance(params);
      const data = response.data;

      if (Array.isArray(data)) {
        setAttendances(data);
        pagination.setTotal(data.length);
      } else if (data && 'data' in data) {
        setAttendances(data.data || []);
        pagination.setTotal(data.total || 0);
      } else {
        setAttendances([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching attendances:', err);
      setError('Erreur lors du chargement des présences');
      setAttendances([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, toQueryParams]);

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  // Actions
  const handleStatusChange = async (attendanceId: string, item: Attendance, newStatus: 'present' | 'absent' | 'late' | 'excused') => {
    try {
      // Optimistic update
      setAttendances(prev => prev.map(a =>
        a.id === attendanceId ? { ...a, status: newStatus } : a
      ));

      if (attendanceId.startsWith('temp-')) {
        // Create new
        await evalApi.markAttendance({
          student_id: item.student_id,
          offer_id: 'offer-1', // TODO: Get actual offer_id from context
          date: filters.date,
          is_present: newStatus === 'present',
          justified: newStatus === 'excused',
          justification_reason: newStatus === 'excused' ? 'Excused absence' : undefined,
        });
      } else {
        // Update existing (if API supports it, otherwise create for that day overwrites)
        await evalApi.markAttendance({
          student_id: item.student_id,
          offer_id: 'offer-1', // TODO: Get actual offer_id from context
          date: filters.date,
          is_present: newStatus === 'present',
          justified: newStatus === 'excused',
          justification_reason: newStatus === 'excused' ? 'Excused absence' : undefined,
        });
      }

      // No refetch to keep UI smooth, but ideally sync
    } catch (err) {
      console.error('Error updating status:', err);
      // Revert on error
      fetchAttendances();
    }
  };

  // Table columns
  const columns: Column<Attendance>[] = [
    {
      key: 'student',
      header: 'Étudiant',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
            {(item.student?.user?.first_name?.[0] || '') + (item.student?.user?.last_name?.[0] || '')}
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {item.student?.user?.first_name} {item.student?.user?.last_name}
            </div>
            <div className="text-xs text-gray-500">{item.student?.student_number}</div>
          </div>
        </div>
      )
    },
    {
      key: 'date',
      header: 'Date',
      render: (item) => item.date ? new Date(item.date).toLocaleDateString('fr-FR') : filters.date
    },
    {
      key: 'status',
      header: 'Statut',
      render: (item) => (
        <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => handleStatusChange(item.id, item, 'present')}
            className={`p-1.5 rounded-md transition-colors ${item.status === 'present' ? 'bg-white shadow text-green-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            title="Présent"
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleStatusChange(item.id, item, 'absent')}
            className={`p-1.5 rounded-md transition-colors ${item.status === 'absent' ? 'bg-white shadow text-red-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            title="Absent"
          >
            <XCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleStatusChange(item.id, item, 'late')}
            className={`p-1.5 rounded-md transition-colors ${item.status === 'late' ? 'bg-white shadow text-yellow-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            title="Retard"
          >
            <Clock className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleStatusChange(item.id, item, 'excused')}
            className={`p-1.5 rounded-md transition-colors ${item.status === 'excused' ? 'bg-white shadow text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            title="Excusé"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <NavbarEncadrant />
      <Header spaceName="Espace Chef de Service" notificationCount={3} />

      <div className="flex min-h-screen bg-white">
        <SidebarEncadrant />

        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Présences
              </h1>
              <p className="text-gray-600 mb-6">
                Marquez la présence quotidienne des stagiaires
              </p>

              <div className="flex gap-4 mb-8">
                <MiniCard
                  label="Présents aujourd'hui"
                  count={attendances.filter(a => a.status === 'present').length}
                />
                <MiniCard
                  label="Absents"
                  count={attendances.filter(a => a.status === 'absent').length}
                />
              </div>

              {/* Search & Refresh */}
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher un étudiant..."
                  />
                </div>
                <button
                  onClick={fetchAttendances}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Filters */}
            <FilterBar onClear={clearAllFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-600">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilter('date', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <FilterDropdown
                label="Statut"
                value={filters.status}
                onChange={(v) => setFilter('status', v)}
                options={[
                  { label: 'Présent', value: 'present' },
                  { label: 'Absent', value: 'absent' },
                  { label: 'Retard', value: 'late' },
                  { label: 'Excusé', value: 'excused' },
                ]}
              />
            </FilterBar>

            {/* Table */}
            <DataTable
              data={attendances}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucun étudiant trouvé pour cette date"
              pagination={{
                page: pagination.page,
                perPage: pagination.perPage,
                total: pagination.total,
                totalPages: pagination.totalPages,
                onPageChange: pagination.setPage,
                onPerPageChange: pagination.setPerPage,
              }}
            />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}