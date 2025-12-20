"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../components/Sidebar';
import MiniCard from '../../Components/Cards/MiniCard';
import SearchInput from '../../Components/SearchInput';
import { FilterDropdown, FilterBar } from '../../Components/FilterDropdown';
import DataTable, { Column } from '../../Components/DataTable';
import Pagination from '../../Components/Pagination';
import { RefreshCw, Download, FileText } from 'lucide-react';
import { profileApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { StudentWithUser } from '@/types/api.types';

interface StudentFilters {
  promotion: string;
  specialite: string;
  statut: string;
  [key: string]: string; // Index signature for FilterValue constraint
}

export default function ListeEtudiantsPage() {
  // State
  const [students, setStudents] = useState<StudentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, sort, setSort, toQueryParams } = useFilters<StudentFilters>({
    promotion: '',
    specialite: '',
    statut: '',
  });

  // Fetch students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        ...toQueryParams(),
        page: pagination.page,
        limit: pagination.perPage,
      };

      const response = await profileApi.listStudents(params);
      const data = response.data;

      if (Array.isArray(data)) {
        setStudents(data);
        pagination.setTotal(data.length);
      } else if (data && 'data' in data) {
        setStudents(data.data || []);
        pagination.setTotal(data.total || 0);
      } else {
        setStudents([]);
        pagination.setTotal(0);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Erreur lors du chargement des étudiants');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.perPage, filters, search, sort]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Table columns
  const columns: Column<StudentWithUser>[] = useMemo(() => [
    {
      key: 'photo',
      header: 'Photo',
      width: '60px',
      render: (item) => (
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-teal-700 text-sm font-medium">
            {(item.user?.first_name?.[0] || '') + (item.user?.last_name?.[0] || '')}
          </span>
        </div>
      )
    },
    {
      key: 'name',
      header: 'Nom',
      sortable: true,
      render: (item) => (
        <div>
          <p className="font-medium">{item.user?.first_name} {item.user?.last_name}</p>
          <p className="text-xs text-gray-500">{item.student_number || '-'}</p>
        </div>
      )
    },
    {
      key: 'university',
      header: 'Université',
      sortable: true,
      render: (item) => item.university || '-'
    },
    {
      key: 'program',
      header: 'Programme',
      sortable: true,
      render: (item) => item.program || '-'
    },
    {
      key: 'year_level',
      header: 'Année',
      sortable: true,
      render: (item) => item.year_level ? `${item.year_level}ème année` : '-'
    },
    {
      key: 'email',
      header: 'Email',
      render: (item) => (
        <a href={`mailto:${item.user?.email}`} className="text-teal-600 hover:underline text-sm">
          {item.user?.email || '-'}
        </a>
      )
    },
  ], []);

  // Export function
  const handleExport = (format: 'pdf' | 'excel') => {
    let exportContent = '';
    let mimeType = 'text/plain';
    let filename = `etudiants_${new Date().toISOString().split('T')[0]}`;

    if (format === 'excel') {
      mimeType = 'text/csv';
      exportContent = 'Nom,Prénom,Matricule,Université,Programme,Année,Email\n';
      students.forEach(s => {
        exportContent += `"${s.user?.last_name || ''}","${s.user?.first_name || ''}","${s.student_number || ''}",`;
        exportContent += `"${s.university || ''}","${s.program || ''}","${s.year_level || ''}","${s.user?.email || ''}"\n`;
      });
      filename += '.csv';
    } else {
      exportContent = '=== LISTE DES ÉTUDIANTS ===\n\n';
      exportContent += `Date d'export: ${new Date().toLocaleDateString('fr-FR')}\n`;
      exportContent += `Nombre d'étudiants: ${students.length}\n\n`;
      students.forEach((s, i) => {
        exportContent += `${i + 1}. ${s.user?.first_name} ${s.user?.last_name}\n`;
        exportContent += `   Matricule: ${s.student_number || '-'}\n`;
        exportContent += `   Email: ${s.user?.email || '-'}\n\n`;
      });
      filename += '.txt';
    }

    const blob = new Blob([exportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={5} />

      <div className="flex min-h-screen bg-white">
        <Sidebar />

        <main className="flex-1 bg-white overflow-x-hidden">
          <div className="w-full p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Étudiants du service
                  </h1>
                  <p className="text-gray-600">
                    Liste des étudiants en stage actuellement sous votre encadrement
                  </p>
                </div>

                <MiniCard
                  label="Total étudiants"
                  count={pagination.total}
                />
              </div>

              {/* Search and actions */}
              <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher un étudiant..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchStudents}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="Actualiser"
                  >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Download className="w-4 h-4" />
                    Excel
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <FilterBar onClear={clearAllFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
              <FilterDropdown
                label="Programme"
                value={filters.specialite}
                onChange={(v) => setFilter('specialite', v)}
                options={[
                  { label: 'Médecine Générale', value: 'medecine' },
                  { label: 'Pharmacie', value: 'pharmacie' },
                  { label: 'Chirurgie Dentaire', value: 'dentaire' },
                ]}
              />
              <FilterDropdown
                label="Année"
                value={filters.promotion}
                onChange={(v) => setFilter('promotion', v)}
                options={[
                  { label: '1ère année', value: '1' },
                  { label: '2ème année', value: '2' },
                  { label: '3ème année', value: '3' },
                  { label: '4ème année', value: '4' },
                  { label: '5ème année', value: '5' },
                ]}
              />
            </FilterBar>

            {/* Data Table */}
            <DataTable
              data={students}
              columns={columns}
              keyExtractor={(item) => item.id}
              loading={loading}
              error={error}
              emptyMessage="Aucun étudiant trouvé"
              sortField={sort.field}
              sortDirection={sort.direction}
              onSort={setSort}
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