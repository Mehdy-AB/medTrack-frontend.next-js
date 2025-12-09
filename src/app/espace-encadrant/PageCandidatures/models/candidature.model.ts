export interface Candidature {
  id: string;
  photo: string;
  nom: string;
  matricule: string;
  universite: string;
  specialite: string;
  anneeEtude: string;
  dateCandidature: string;
  anciennete: number; // en jours
  statut: 'en_attente' | 'acceptee' | 'refusee';
  documents: string[]; // liste des documents
  motivation: string;
  periodeStage: string;
  disponibilites: string;
  medecinAffecte?: string;
  motifRefus?: string;
  emailEnvoye?: boolean;
  prioritaire: boolean;
}

export interface MedecinEncadrant {
  id: string;
  nom: string;
  specialite: string;
  disponibilite: boolean;
}

export interface Decision {
  id: string;
  candidatureId: string;
  dateDecision: string;
  statut: 'acceptee' | 'refusee';
  motif?: string;
  medecinAffecte?: string;
  emailEnvoye: boolean;
}

export const mockMedecins: MedecinEncadrant[] = [
  { id: '1', nom: 'Dr. Benali Ahmed', specialite: 'Chirurgie Cardiaque', disponibilite: true },
  { id: '2', nom: 'Dr. Bensaid Karima', specialite: 'Pédiatrie', disponibilite: true },
  { id: '3', nom: 'Dr. Mansouri Rachid', specialite: 'Cardiologie', disponibilite: false },
  { id: '4', nom: 'Dr. Touati Samira', specialite: 'Urgences', disponibilite: true },
  { id: '5', nom: 'Dr. Khelif Mohamed', specialite: 'Neurochirurgie', disponibilite: true },
];

export const mockCandidatures: Candidature[] = [
  {
    id: '1',
    photo: '/img/avatar.png',
    nom: 'Sofia Lahnine',
    matricule: '222234567891',
    universite: 'Université d\'Alger',
    specialite: 'Médecine Générale',
    anneeEtude: '6ème année',
    dateCandidature: '2024-01-15',
    anciennete: 12,
    statut: 'en_attente',
    documents: ['CV.pdf', 'Lettre motivation.pdf', 'Relevés notes.pdf'],
    motivation: 'Passionné par la chirurgie cardiaque depuis mon stage en 4ème année. Je souhaite approfondir mes connaissances...',
    periodeStage: '01/03/2024 - 30/08/2024',
    disponibilites: 'Temps plein',
    prioritaire: true,
  },
  {
    id: '2',
    photo: '/img/avatar.png',
    nom: 'Ahmed Benali',
    matricule: '222234567892',
    universite: 'Université de Blida',
    specialite: 'Chirurgie',
    anneeEtude: '5ème année',
    dateCandidature: '2024-01-18',
    anciennete: 9,
    statut: 'en_attente',
    documents: ['CV.pdf', 'Lettre motivation.pdf'],
    motivation: 'Intéressé par la pédiatrie et le suivi des jeunes patients.',
    periodeStage: '15/02/2024 - 15/08/2024',
    disponibilites: 'Temps plein',
    prioritaire: false,
  },
  {
    id: '3',
    photo: '/img/avatar.png',
    nom: 'Fatima Zouaoui',
    matricule: '222234567893',
    universite: 'Université d\'Oran',
    specialite: 'Cardiologie',
    anneeEtude: '6ème année',
    dateCandidature: '2024-01-05',
    anciennete: 22,
    statut: 'en_attente',
    documents: ['CV.pdf', 'Lettre motivation.pdf', 'Recommandation.pdf'],
    motivation: 'Expérience en cardiologie pendant mon stage de 5ème année.',
    periodeStage: '01/04/2024 - 30/09/2024',
    disponibilites: 'Temps plein',
    prioritaire: true,
  },
  {
    id: '4',
    photo: '/img/avatar.png',
    nom: 'Karim Mansouri',
    matricule: '222234567894',
    universite: 'Université de Constantine',
    specialite: 'Médecine Générale',
    anneeEtude: '5ème année',
    dateCandidature: '2024-01-20',
    anciennete: 7,
    statut: 'en_attente',
    documents: ['CV.pdf', 'Lettre motivation.pdf'],
    motivation: 'Souhaite me spécialiser en neurochirurgie.',
    periodeStage: '10/03/2024 - 10/09/2024',
    disponibilites: 'Temps plein',
    prioritaire: false,
  },
  {
    id: '5',
    photo: '/img/avatar.png',
    nom: 'Amina Khelifi',
    matricule: '222234567895',
    universite: 'Université d\'Alger',
    specialite: 'Pédiatrie',
    anneeEtude: '6ème année',
    dateCandidature: '2024-01-10',
    anciennete: 17,
    statut: 'en_attente',
    documents: ['CV.pdf', 'Lettre motivation.pdf', 'Certificat anglais.pdf'],
    motivation: 'Passion pour la pédiatrie et expérience en pédiatrie générale.',
    periodeStage: '01/05/2024 - 31/10/2024',
    disponibilites: 'Temps plein',
    prioritaire: true,
  },
];

export const mockHistorique: Decision[] = [
  {
    id: 'h1',
    candidatureId: 'c1',
    dateDecision: '2024-01-10',
    statut: 'acceptee',
    medecinAffecte: 'Dr. Benali Ahmed',
    emailEnvoye: true,
  },
  {
    id: 'h2',
    candidatureId: 'c2',
    dateDecision: '2024-01-12',
    statut: 'refusee',
    motif: 'Pas de places disponibles dans le service demandé',
    emailEnvoye: true,
  },
  {
    id: 'h3',
    candidatureId: 'c3',
    dateDecision: '2024-01-15',
    statut: 'acceptee',
    medecinAffecte: 'Dr. Bensaid Karima',
    emailEnvoye: true,
  },
];