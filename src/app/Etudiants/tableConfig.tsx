// Le JSX nécessite React
import React from 'react';

export const studentTableConfig = {
  columns: [
    {
      key: 'photo',
      label: 'Photo',
      render: (value: string) => (
        <img 
          src={value || '/img/avatar-default.png'} 
          alt="Student" 
          className="w-10 h-10 rounded-full object-cover" 
        />
      )
    },
    { key: 'nom', label: 'Nom complet' },
    { key: 'matricule', label: 'Matricul' },
    { key: 'specialite', label: 'Spécialité' },
    { key: 'stageActuel', label: 'Stage actuel' },
    { key: 'dates', label: 'Dates (début - fin)' },
    {
      key: 'statut',
      label: 'Statut',
      render: (value: string) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === 'En cours' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'note', label: 'Note' }
  ]
};

// Données d'exemple pour le test
export const studentsData = [
  {
    photo: '/img/avatar.png',
    nom: 'Sofia Lahnine',
    matricule: '222234567891',
    specialite: 'Médecine générale',
    stageActuel: 'Chirurgie Cardiaque(5/h-4/2)',
    dates: '01/01/2024 - 30/06/2024',
    statut: 'En cours',
    note: 15
  },
  {
    photo: '/img/avatar.png',
    nom: 'Ahmed Benali',
    matricule: '222234567892',
    specialite: 'Chirurgie',
    stageActuel: 'Pédiatrie',
    dates: '15/09/2024 - 15/03/2025',
    statut: 'En cours',
    note: 17
  }
];