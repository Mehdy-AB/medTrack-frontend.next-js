export interface ServiceData {
  id: string;
  nom: string;
  chefService: string;
  etudiantsActifs: number;
  capaciteMax: number;
  tauxOccupation: number;
  noteMoyenne: number;
  presenceMoyenne: number;
  candidaturesAttente: number;
  ancienneteMax: number;
  statut: 'optimal' | 'surcharge' | 'sous-utilise';
}

export interface KPI {
  id: string;
  label: string;
  valeur: number;
  evolution: number; // pourcentage
  unite?: string;
  couleur: 'vert' | 'orange' | 'rouge';
  icone: string;
}

export interface Tendance {
  mois: string;
  candidatures: number;
  acceptations: number;
  rejets: number;
}

export interface Alerte {
  id: string;
  type: 'urgent' | 'avertissement' | 'info';
  titre: string;
  description: string;
  service?: string;
  date: string;
  priorite: 1 | 2 | 3; // 1=urgent, 2=avertissement, 3=info
}

export const mockServices: ServiceData[] = [
  {
    id: '1',
    nom: 'Chirurgie Cardiaque',
    chefService: 'Dr. Ahmed Benali',
    etudiantsActifs: 8,
    capaciteMax: 10,
    tauxOccupation: 80,
    noteMoyenne: 15.2,
    presenceMoyenne: 94,
    candidaturesAttente: 5,
    ancienneteMax: 12,
    statut: 'optimal'
  },
  {
    id: '2',
    nom: 'Pédiatrie',
    chefService: 'Dr. Karima Bensaid',
    etudiantsActifs: 12,
    capaciteMax: 15,
    tauxOccupation: 80,
    noteMoyenne: 14.8,
    presenceMoyenne: 96,
    candidaturesAttente: 8,
    ancienneteMax: 15,
    statut: 'optimal'
  },
  {
    id: '3',
    nom: 'Cardiologie',
    chefService: 'Dr. Rachid Mansouri',
    etudiantsActifs: 14,
    capaciteMax: 12,
    tauxOccupation: 116,
    noteMoyenne: 13.5,
    presenceMoyenne: 89,
    candidaturesAttente: 12,
    ancienneteMax: 22,
    statut: 'surcharge'
  },
  {
    id: '4',
    nom: 'Urgences',
    chefService: 'Dr. Samira Touati',
    etudiantsActifs: 6,
    capaciteMax: 10,
    tauxOccupation: 60,
    noteMoyenne: 16.1,
    presenceMoyenne: 98,
    candidaturesAttente: 3,
    ancienneteMax: 8,
    statut: 'sous-utilise'
  },
  {
    id: '5',
    nom: 'Neurochirurgie',
    chefService: 'Dr. Mohamed Khelif',
    etudiantsActifs: 5,
    capaciteMax: 8,
    tauxOccupation: 62.5,
    noteMoyenne: 15.8,
    presenceMoyenne: 92,
    candidaturesAttente: 25,
    ancienneteMax: 30,
    statut: 'surcharge'
  },
  {
    id: '6',
    nom: 'Orthopédie',
    chefService: 'Dr. Fatima Zohra',
    etudiantsActifs: 9,
    capaciteMax: 10,
    tauxOccupation: 90,
    noteMoyenne: 14.2,
    presenceMoyenne: 95,
    candidaturesAttente: 7,
    ancienneteMax: 10,
    statut: 'optimal'
  }
];

export const mockKPIs: KPI[] = [
  {
    id: '1',
    label: 'Total Étudiants Actifs',
    valeur: 245,
    evolution: 12,
    icone: '👥',
    couleur: 'vert'
  },
  {
    id: '2',
    label: 'Services Actifs',
    valeur: 8,
    evolution: 0,
    icone: '🏥',
    couleur: 'vert'
  },
  {
    id: '3',
    label: 'Candidatures En Attente',
    valeur: 60,
    evolution: -5,
    icone: '📄',
    couleur: 'rouge'
  },
  {
    id: '4',
    label: 'Taux Occupation Moyen',
    valeur: 78,
    evolution: 3,
    icone: '📊',
    couleur: 'vert',
    unite: '%'
  },
  {
    id: '5',
    label: 'Note Moyenne Globale',
    valeur: 15.1,
    evolution: 0.5,
    icone: '⭐',
    couleur: 'vert',
    unite: '/20'
  },
  {
    id: '6',
    label: 'Presence Moyenne',
    valeur: 94,
    evolution: 1,
    icone: '✅',
    couleur: 'vert',
    unite: '%'
  }
];

export const mockTendances: Tendance[] = [
  { mois: 'Jan', candidatures: 85, acceptations: 65, rejets: 20 },
  { mois: 'Fév', candidatures: 92, acceptations: 70, rejets: 22 },
  { mois: 'Mar', candidatures: 78, acceptations: 60, rejets: 18 },
  { mois: 'Avr', candidatures: 105, acceptations: 75, rejets: 30 },
  { mois: 'Mai', candidatures: 88, acceptations: 68, rejets: 20 },
  { mois: 'Juin', candidatures: 120, acceptations: 85, rejets: 35 }
];

export const mockAlertes: Alerte[] = [
  {
    id: '1',
    type: 'urgent',
    titre: 'Candidatures non traitées > 7 jours',
    description: '25 candidatures en attente depuis plus de 7 jours en Neurochirurgie',
    service: 'Neurochirurgie',
    date: 'Il y a 2h',
    priorite: 1
  },
  {
    id: '2',
    type: 'avertissement',
    titre: 'Surcapacité en Cardiologie',
    description: 'Taux d\'occupation à 116%, nécessite réallocation',
    service: 'Cardiologie',
    date: 'Il y a 1 jour',
    priorite: 2
  },
  {
    id: '3',
    type: 'info',
    titre: 'Rapport mensuel disponible',
    description: 'Le rapport de performance du mois dernier est prêt',
    date: 'Il y a 3 jours',
    priorite: 3
  },
  {
    id: '4',
    type: 'urgent',
    titre: '3 évaluations en retard',
    description: 'Évaluations non soumises après la date limite',
    service: 'Urgences',
    date: 'Il y a 4h',
    priorite: 1
  }
];