// espace-chef-service/PageVueGlobale/models/dashboard.model.ts

export interface KPI {
  label: string;
  value: number;
  evolution: number; // Pourcentage d'évolution
  icon: string;
  color: string;
}

export interface MedecinCharge {
  id: string;
  nom: string;
  nbEtudiants: number;
  chargeRecommandee: number;
  pourcentageCharge: number;
}

export interface EvolutionData {
  mois: string;
  etudiants: number;
  candidatures: number;
}

export interface EvaluationEnCours {
  id: string;
  medecinNom: string;
  etudiantNom: string;
  stage: string;
  dateDebut: string;
  joursRestants: number;
  statut: 'En cours' | 'En retard' | 'À venir';
}

export interface Alerte {
  id: string;
  type: 'urgent' | 'important' | 'info';
  titre: string;
  description: string;
  date: string;
  action?: string;
}

// Données mockées pour le KPI
export const mockKPIs: KPI[] = [
  {
    label: 'Étudiants actifs',
    value: 45,
    evolution: 12,
    icon: '👥',
    color: 'bg-blue-500'
  },
  {
    label: 'Candidatures en attente',
    value: 18,
    evolution: -5,
    icon: '📋',
    color: 'bg-orange-500'
  },
  {
    label: 'Médecins encadrants',
    value: 12,
    evolution: 0,
    icon: '👨‍⚕️',
    color: 'bg-green-500'
  },
  {
    label: 'Évaluations complétées',
    value: 38,
    evolution: 8,
    icon: '✅',
    color: 'bg-purple-500'
  },
  {
    label: 'Note moyenne service',
    value: 15.2,
    evolution: 3,
    icon: '⭐',
    color: 'bg-yellow-500'
  },
  {
    label: 'Taux d\'acceptation',
    value: 87,
    evolution: 5,
    icon: '📈',
    color: 'bg-teal-500'
  }
];

// Charge des médecins
export const mockMedecinsCharge: MedecinCharge[] = [
  { id: '1', nom: 'Dr. Benali', nbEtudiants: 7, chargeRecommandee: 5, pourcentageCharge: 140 },
  { id: '2', nom: 'Dr. Kaddour', nbEtudiants: 5, chargeRecommandee: 5, pourcentageCharge: 100 },
  { id: '3', nom: 'Dr. Meziane', nbEtudiants: 4, chargeRecommandee: 5, pourcentageCharge: 80 },
  { id: '4', nom: 'Dr. Hamidi', nbEtudiants: 3, chargeRecommandee: 5, pourcentageCharge: 60 },
  { id: '5', nom: 'Dr. Lahnine', nbEtudiants: 6, chargeRecommandee: 5, pourcentageCharge: 120 },
  { id: '6', nom: 'Dr. Boudiaf', nbEtudiants: 2, chargeRecommandee: 5, pourcentageCharge: 40 }
];

// Évolution temporelle
export const mockEvolutionData: EvolutionData[] = [
  { mois: 'Jan', etudiants: 35, candidatures: 45 },
  { mois: 'Fév', etudiants: 38, candidatures: 52 },
  { mois: 'Mar', etudiants: 42, candidatures: 48 },
  { mois: 'Avr', etudiants: 40, candidatures: 55 },
  { mois: 'Mai', etudiants: 45, candidatures: 60 },
  { mois: 'Juin', etudiants: 43, candidatures: 58 }
];

// Évaluations en cours
export const mockEvaluationsEnCours: EvaluationEnCours[] = [
  {
    id: '1',
    medecinNom: 'Dr. Benali',
    etudiantNom: 'Sofia Lahnine',
    stage: 'Chirurgie Cardiaque',
    dateDebut: '01/01/2025',
    joursRestants: 15,
    statut: 'En cours'
  },
  {
    id: '2',
    medecinNom: 'Dr. Kaddour',
    etudiantNom: 'Ahmed Benali',
    stage: 'Pédiatrie',
    dateDebut: '15/12/2024',
    joursRestants: -3,
    statut: 'En retard'
  },
  {
    id: '3',
    medecinNom: 'Dr. Meziane',
    etudiantNom: 'Amina Khelifi',
    stage: 'Urgences',
    dateDebut: '10/01/2025',
    joursRestants: 25,
    statut: 'À venir'
  }
];

// Alertes
export const mockAlertes: Alerte[] = [
  {
    id: '1',
    type: 'urgent',
    titre: '12 candidatures en attente depuis +7 jours',
    description: '12 étudiants attendent une réponse depuis plus de 7 jours',
    date: '08/12/2024',
    action: 'Traiter les candidatures'
  },
  {
    id: '2',
    type: 'important',
    titre: 'Dr. Benali surcharge (140%)',
    description: 'Le médecin a 7 étudiants (recommandé: 5)',
    date: '08/12/2024',
    action: 'Rééquilibrer'
  },
  {
    id: '3',
    type: 'info',
    titre: '5 évaluations à finaliser',
    description: 'Des évaluations sont en attente de validation',
    date: '07/12/2024',
    action: 'Relancer'
  }
];