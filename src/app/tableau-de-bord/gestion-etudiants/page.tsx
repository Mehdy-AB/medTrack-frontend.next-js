"use client";

import { useState, useEffect, useCallback } from 'react';
import NavbarAdmin from '../Components/NavbarAdmin';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarAdmin from '../Components/SidebarAdmin';
import SearchInput from '@/app/Components/SearchInput';
import { FilterDropdown, FilterBar } from '@/app/Components/FilterDropdown';
import DataTable, { Column } from '@/app/Components/DataTable';
import FormModal from '../Components/FormModal';
import DeleteModal from '../Components/DeleteModal';
import { Plus, GraduationCap, RefreshCw } from 'lucide-react';
import { profileApi } from '@/services';
import { usePagination, useFilters } from '@/hooks';
import type { StudentWithUser } from '@/types/api.types';

interface StudentFilters {
  university: string;
  program: string;
  year_level: string;
}

export default function GestionEtudiants() {
  // State
  const [students, setStudents] = useState<StudentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentWithUser | null>(null);

  // Hooks
  const pagination = usePagination(10);
  const { filters, search, setSearch, setFilter, clearAllFilters, hasActiveFilters, toQueryParams } = useFilters<StudentFilters>({
    university: '',
    program: '',
    year_level: '',
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

      // Handle both paginated and array responses
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
  }, [pagination.page, pagination.perPage, toQueryParams]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Table columns
  const columns: Column<StudentWithUser>[] = [
    {
      key: 'student_number',
      header: 'Matricule',
      sortable: true,
      render: (item) => item.student_number || '-'
    },
    {
      key: 'name',
      header: 'Nom complet',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-teal-700 text-sm font-medium">
              {(item.user?.first_name?.[0] || '') + (item.user?.last_name?.[0] || '')}
            </span>
          </div>
          <div>
            <p className="font-medium">{item.user?.first_name} {item.user?.last_name}</p>
            <p className="text-xs text-gray-500">{item.user?.email}</p>
          </div>
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
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (item) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(item);
              setShowEditModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="Modifier"
          >
            <GraduationCap className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStudent(item);
              setShowDeleteModal(true);
            }}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            title="Supprimer"
          >
            ✕
          </button>
        </div>
      )
    }
  ];

  // Form fields
  const formFields = [
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'password', label: 'Mot de passe', type: 'password' as const, required: true },
    { name: 'first_name', label: 'Prénom', type: 'text' as const, required: true },
    { name: 'last_name', label: 'Nom', type: 'text' as const, required: true },
    { name: 'student_number', label: 'Matricule', type: 'text' as const, required: false },
    { name: 'university', label: 'Université', type: 'text' as const, required: false },
    { name: 'program', label: 'Programme', type: 'text' as const, required: false },
    { name: 'year_level', label: 'Année d\'études', type: 'number' as const, required: false },
  ];

  // Handlers
  const handleAdd = async (data: Record<string, unknown>) => {
    try {
      await profileApi.createStudent({
        email: data.email as string,
        password: data.password as string,
        first_name: data.first_name as string,
        last_name: data.last_name as string,
        user_id: '', // Will be set by backend
        student_number: data.student_number as string,
        university: data.university as string,
        program: data.program as string,
        year_level: data.year_level ? Number(data.year_level) : undefined,
      });
      setShowAddModal(false);
      fetchStudents();
    } catch (err) {
      console.error('Error creating student:', err);
      alert('Erreur lors de la création de l\'étudiant');
    }
  };

  const handleEdit = async (data: Record<string, unknown>) => {
    if (!selectedStudent) return;

    try {
      await profileApi.updateStudent(selectedStudent.id, {
        student_number: data.student_number as string,
        university: data.university as string,
        program: data.program as string,
        year_level: data.year_level ? Number(data.year_level) : undefined,
      });
      setShowEditModal(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Erreur lors de la mise à jour');
    }
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      await profileApi.deleteStudent(selectedStudent.id);
      setShowDeleteModal(false);
      setSelectedStudent(null);
      fetchStudents();
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Gestion des étudiants" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarAdmin />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">

            {/* Header with search and actions */}
            <div className="flex items-center justify-between mb-6">
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
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Nouveau Étudiant
                </button>
              </div>
            </div>

            {/* Filters */}
            <FilterBar onClear={clearAllFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
              <FilterDropdown
                label="Université"
                value={filters.university}
                onChange={(v) => setFilter('university', v)}
                options={[
                  { label: 'Université de Boumerdès', value: 'boumerdes' },
                  { label: 'Université d\'Alger', value: 'alger' },
                ]}
              />
              <FilterDropdown
                label="Programme"
                value={filters.program}
                onChange={(v) => setFilter('program', v)}
                options={[
                  { label: 'Médecine Générale', value: 'medecine_generale' },
                  { label: 'Pharmacie', value: 'pharmacie' },
                  { label: 'Chirurgie Dentaire', value: 'chirurgie_dentaire' },
                ]}
              />
              <FilterDropdown
                label="Année"
                value={filters.year_level}
                onChange={(v) => setFilter('year_level', v)}
                options={[
                  { label: '1ère année', value: '1' },
                  { label: '2ème année', value: '2' },
                  { label: '3ème année', value: '3' },
                  { label: '4ème année', value: '4' },
                  { label: '5ème année', value: '5' },
                  { label: '6ème année', value: '6' },
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
              pagination={{
                page: pagination.page,
                perPage: pagination.perPage,
                total: pagination.total,
                totalPages: pagination.totalPages,
                onPageChange: pagination.setPage,
                onPerPageChange: pagination.setPerPage,
              }}
            />

            {/* Modals */}
            <FormModal
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAdd}
              title="Ajouter un nouvel étudiant"
              icon={<Plus className="w-6 h-6 text-white" />}
              fields={formFields}
              submitLabel="Ajouter Étudiant"
            />

            <FormModal
              isOpen={showEditModal}
              onClose={() => {
                setShowEditModal(false);
                setSelectedStudent(null);
              }}
              onSubmit={handleEdit}
              title="Modifier Étudiant"
              icon={<GraduationCap className="w-6 h-6 text-white" />}
              fields={formFields.filter(f => !['email', 'password'].includes(f.name))}
              initialData={selectedStudent ? {
                student_number: selectedStudent.student_number,
                university: selectedStudent.university,
                program: selectedStudent.program,
                year_level: selectedStudent.year_level,
              } : undefined}
              submitLabel="Sauvegarder"
              showCancel={true}
            />

            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false);
                setSelectedStudent(null);
              }}
              onConfirm={handleDelete}
              title="Supprimer Étudiant ?"
              message={`Êtes-vous sûr de vouloir supprimer l'étudiant ${selectedStudent?.user?.first_name} ${selectedStudent?.user?.last_name} ?`}
            />

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}