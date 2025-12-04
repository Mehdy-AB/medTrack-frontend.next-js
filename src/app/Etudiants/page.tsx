"use client";

import { useState } from 'react';
import Table from '../Components/Table/TableColumn';
import  {StudentDetailsModal}  from '../Components/Table/BaseModalProps'
import { studentTableConfig, studentsData } from './tableConfig';

export default function EtudiantsPage() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (row: any) => {
    setSelectedStudent(row);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Liste des Étudiants
        </h1>

        <Table
          columns={studentTableConfig.columns}
          data={studentsData}
          onRowClick={handleRowClick}
        />

        <StudentDetailsModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          student={selectedStudent}
        />
      </div>
    </div>
  );
}