export interface Presence {
  date: string;
  heureArrivee: string;
  heureDepart: string;
  statut: 'Présent' | 'Retard' | 'Absent';
  remarques?: string;
}

export const mockPresences: Presence[] = [
  {
    date: '10/10/2025',
    heureArrivee: '08:00',
    heureDepart: '16:30',
    statut: 'Présent',
    remarques: ''
  },
  {
    date: '11/10/2025',
    heureArrivee: '08:15',
    heureDepart: '16:00',
    statut: 'Retard',
    remarques: ''
  },
  {
    date: '12/10/2025',
    heureArrivee: '-',
    heureDepart: '-',
    statut: 'Absent',
    remarques: 'Justifié'
  }
];
