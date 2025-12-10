export interface AnnonceStage {
  id: string;
  titre: string;
  description: string;
  serviceId: string;
  serviceNom: string;
  hopitalId: string;
  hopitalNom: string;
  
  // Période
  dateDebut: string;
  dateFin: string;
  dureeSemaines: number;
  dateLimiteCandidature: string;
  
  // Capacité
  placesDisponibles: number;
  placesTotal: number;
  candidaturesEnAttente: number;
  candidaturesAcceptees: number;
  candidaturesRefusees: number;
  
  // Encadrement
  chefServiceId: string;
  chefServiceNom: string;
  encadrants: Encadrant[];
  
  // Horaire quotidien (NOUVEAU)
  horaireQuotidien: {
    heureDebut: string; // "08:00"
    heureFin: string;   // "17:00"
    pauseDejeuner: {
      heureDebut: string; // "12:00"
      heureFin: string;   // "13:00"
    };
    joursTravail: ('lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche')[]; // AJOUT dimanche
  };
  
  // État
  statut: 'brouillon' | 'publiée' | 'active' | 'clôturée' | 'archivée';
  datePublication: string | null;
  dateCloture: string | null;
  
  // Validation à deux niveaux (NOUVEAU)
  validationChef: boolean;
  validationEtablissement: boolean;
  
  // Étudiants acceptés (NOUVEAU)
  etudiantsAcceptes: string[]; // IDs des étudiants
  
  // Statut du stage (NOUVEAU)
  statutStage?: 'non_debute' | 'en_cours' | 'termine';
  dateDebutReelle?: string;
  notes?: (number | null)[]; // Notes des étudiants
  
  // Badge "New" pendant 3 jours
  isNew: boolean;
  
  // Tags et catégories
  tags: string[];
  typeStage: string;
  specialitesRequerues: string[];
  prerequis: string[];
  
  // Métriques
  vues: number;
  favoris: number;
}

export interface Encadrant {
  id: string;
  nom: string;
  matricule: string;
  specialite: string;
  email: string;
  telephone: string;
  role: 'chef' | 'encadrant' | 'superviseur';
}

export interface Hopital {
  id: string;
  nom: string;
  ville: string;
  adresse: string;
  telephone: string;
  email: string;
}

export interface ConfigAnnonce {
  titre: string;
  description: string;
  serviceId: string;
  hopitalId: string;
  dateDebut: string;
  dateFin: string;
  dateLimiteCandidature: string;
  placesTotal: number;
  chefServiceId: string;
  encadrantsIds: string[];
  tags: string[];
  typeStage: string;
  specialitesRequerues: string[];
  prerequis: string[];
  publierImmediatement: boolean;
  // NOUVEAU: Horaire quotidien
  horaireQuotidien: {
    heureDebut: string;
    heureFin: string;
    pauseDejeuner: {
      heureDebut: string;
      heureFin: string;
    };
    joursTravail: ('lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche')[]; // AJOUT dimanche
  };
}

// Données mockées
export const mockHopitaux: Hopital[] = [
  {
    id: 'H1',
    nom: 'CHU Mustapha',
    ville: 'Alger',
    adresse: 'Rue des Frères Zioua, Alger',
    telephone: '023 45 67 89',
    email: 'contact@chumustapha.dz'
  },
  {
    id: 'H2',
    nom: 'CHU Beni Messous',
    ville: 'Alger',
    adresse: 'Route de Beni Messous, Alger',
    telephone: '023 56 78 90',
    email: 'contact@chubenimessous.dz'
  },
  {
    id: 'H3',
    nom: 'CHU Bab El Oued',
    ville: 'Alger',
    adresse: 'Boulevard Krim Belkacem, Alger',
    telephone: '023 67 89 01',
    email: 'contact@chubabeloued.dz'
  },
  {
    id: 'H4',
    nom: 'CHU Oran',
    ville: 'Oran',
    adresse: 'Boulevard Ahmed Zabana, Oran',
    telephone: '041 23 45 67',
    email: 'contact@chuoran.dz'
  }
];

export const mockEncadrants: Encadrant[] = [
  {
    id: 'E1',
    nom: 'Dr. Ahmed Benali',
    matricule: 'MED001',
    specialite: 'Chirurgie Cardiaque',
    email: 'ahmed.benali@hospital.dz',
    telephone: '0661234567',
    role: 'chef'
  },
  {
    id: 'E2',
    nom: 'Dr. Karima Bensaid',
    matricule: 'MED002',
    specialite: 'Pédiatrie',
    email: 'karima.bensaid@hospital.dz',
    telephone: '0662345678',
    role: 'chef'
  },
  {
    id: 'E3',
    nom: 'Dr. Rachid Mansouri',
    matricule: 'MED003',
    specialite: 'Cardiologie',
    email: 'rachid.mansouri@hospital.dz',
    telephone: '0663456789',
    role: 'chef'
  },
  {
    id: 'E4',
    nom: 'Dr. Samira Touati',
    matricule: 'MED007',
    specialite: 'Urgentologie',
    email: 'samira.touati@hospital.dz',
    telephone: '0667890123',
    role: 'encadrant'
  },
  {
    id: 'E5',
    nom: 'Dr. Youcef Merabet',
    matricule: 'MED008',
    specialite: 'Chirurgie Générale',
    email: 'youcef.merabet@hospital.dz',
    telephone: '0668901234',
    role: 'encadrant'
  },
  {
    id: 'E6',
    nom: 'Dr. Leila Boukhemis',
    matricule: 'MED009',
    specialite: 'Neurologie',
    email: 'leila.boukhemis@hospital.dz',
    telephone: '0669012345',
    role: 'encadrant'
  }
];

export const mockServices = [
  { id: '1', nom: 'Chirurgie Cardiaque', chefId: 'E1' },
  { id: '2', nom: 'Pédiatrie', chefId: 'E2' },
  { id: '3', nom: 'Cardiologie', chefId: 'E3' },
  { id: '4', nom: 'Urgences', chefId: 'E4' },
  { id: '5', nom: 'Neurochirurgie', chefId: 'E6' },
  { id: '6', nom: 'Orthopédie', chefId: null }
];

export const mockAnnonces: AnnonceStage[] = [
  {
    id: 'A1',
    titre: 'Stage en Chirurgie Cardiaque',
    description: 'Stage approfondi en chirurgie cardiaque avec participation aux interventions et suivi post-opératoire.',
    serviceId: '1',
    serviceNom: 'Chirurgie Cardiaque',
    hopitalId: 'H1',
    hopitalNom: 'CHU Mustapha',
    dateDebut: '2024-03-01',
    dateFin: '2024-06-30',
    dureeSemaines: 16,
    dateLimiteCandidature: '2024-02-15',
    placesDisponibles: 0,
    placesTotal: 5,
    candidaturesEnAttente: 12,
    candidaturesAcceptees: 5,
    candidaturesRefusees: 2,
    chefServiceId: 'E1',
    chefServiceNom: 'Dr. Ahmed Benali',
    encadrants: [mockEncadrants[0], mockEncadrants[4]],
    horaireQuotidien: {
      heureDebut: '08:00',
      heureFin: '17:00',
      pauseDejeuner: {
        heureDebut: '12:00',
        heureFin: '13:00'
      },
      joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'] // 6 jours
    },
    statut: 'active',
    validationChef: true,
    validationEtablissement: true,
    etudiantsAcceptes: ['ET1', 'ET2', 'ET3', 'ET4', 'ET5'],
    statutStage: 'en_cours',
    dateDebutReelle: '2024-03-01',
    notes: [16, 15, 17, 14, null],
    datePublication: '2024-01-10',
    dateCloture: null,
    isNew: false,
    tags: ['Chirurgie', 'Cardiaque', 'Stage Long'],
    typeStage: 'Chirurgie Cardiaque',
    specialitesRequerues: ['Chirurgie Cardiaque', 'Cardiologie'],
    prerequis: ['6ème année médecine', 'Stage en chirurgie'],
    vues: 245,
    favoris: 34
  },
  {
    id: 'A2',
    titre: 'Stage en Pédiatrie Générale',
    description: 'Stage en pédiatrie avec rotation dans les différents services pédiatriques.',
    serviceId: '2',
    serviceNom: 'Pédiatrie',
    hopitalId: 'H2',
    hopitalNom: 'CHU Beni Messous',
    dateDebut: '2024-04-01',
    dateFin: '2024-05-31',
    dureeSemaines: 8,
    dateLimiteCandidature: '2024-03-20',
    placesDisponibles: 3,
    placesTotal: 8,
    candidaturesEnAttente: 15,
    candidaturesAcceptees: 5,
    candidaturesRefusees: 3,
    chefServiceId: 'E2',
    chefServiceNom: 'Dr. Karima Bensaid',
    encadrants: [mockEncadrants[1]],
    horaireQuotidien: {
      heureDebut: '08:30',
      heureFin: '16:30',
      pauseDejeuner: {
        heureDebut: '12:30',
        heureFin: '13:30'
      },
      joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'dimanche'] // Inclut dimanche
    },
    statut: 'publiée',
    validationChef: true,
    validationEtablissement: false,
    etudiantsAcceptes: ['ET6', 'ET7', 'ET8', 'ET9', 'ET10'],
    statutStage: 'non_debute',
    datePublication: '2024-01-12',
    dateCloture: null,
    isNew: true,
    tags: ['Pédiatrie', 'Générale', 'Stage Moyen'],
    typeStage: 'Pédiatrie Générale',
    specialitesRequerues: ['Pédiatrie'],
    prerequis: ['5ème année médecine'],
    vues: 189,
    favoris: 28
  },
  {
    id: 'A3',
    titre: 'Stage en Cardiologie Interventionnelle',
    description: 'Stage spécialisé en cardiologie interventionnelle avec initiation aux techniques modernes.',
    serviceId: '3',
    serviceNom: 'Cardiologie',
    hopitalId: 'H1',
    hopitalNom: 'CHU Mustapha',
    dateDebut: '2024-05-01',
    dateFin: '2024-07-31',
    dureeSemaines: 12,
    dateLimiteCandidature: '2024-04-15',
    placesDisponibles: 4,
    placesTotal: 4,
    candidaturesEnAttente: 8,
    candidaturesAcceptees: 2,
    candidaturesRefusees: 1,
    chefServiceId: 'E3',
    chefServiceNom: 'Dr. Rachid Mansouri',
    encadrants: [mockEncadrants[2]],
    horaireQuotidien: {
      heureDebut: '09:00',
      heureFin: '18:00',
      pauseDejeuner: {
        heureDebut: '13:00',
        heureFin: '14:00'
      },
      joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] // 7 jours
    },
    statut: 'brouillon',
    validationChef: false,
    validationEtablissement: false,
    etudiantsAcceptes: [],
    statutStage: 'non_debute',
    datePublication: null,
    dateCloture: null,
    isNew: false,
    tags: ['Cardiologie', 'Interventionnelle', 'Spécialisé'],
    typeStage: 'Cardiologie',
    specialitesRequerues: ['Cardiologie', 'Médecine Interne'],
    prerequis: ['6ème année médecine', 'Stage en cardiologie'],
    vues: 0,
    favoris: 0
  },
  {
    id: 'A4',
    titre: 'Stage aux Urgences',
    description: 'Stage intensif au service des urgences avec rotation de nuit.',
    serviceId: '4',
    serviceNom: 'Urgences',
    hopitalId: 'H3',
    hopitalNom: 'CHU Bab El Oued',
    dateDebut: '2024-06-01',
    dateFin: '2024-08-31',
    dureeSemaines: 12,
    dateLimiteCandidature: '2024-05-20',
    placesDisponibles: 6,
    placesTotal: 6,
    candidaturesEnAttente: 0,
    candidaturesAcceptees: 0,
    candidaturesRefusees: 0,
    chefServiceId: 'E4',
    chefServiceNom: 'Dr. Samira Touati',
    encadrants: [mockEncadrants[3]],
    horaireQuotidien: {
      heureDebut: '20:00',
      heureFin: '08:00', // Nuit
      pauseDejeuner: {
        heureDebut: '02:00',
        heureFin: '03:00'
      },
      joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] // 7 jours pour urgences
    },
    statut: 'clôturée',
    validationChef: true,
    validationEtablissement: true,
    etudiantsAcceptes: [],
    statutStage: 'termine',
    notes: [15, 16, 14, 17, 15, 16],
    datePublication: '2023-12-01',
    dateCloture: '2024-05-31',
    isNew: false,
    tags: ['Urgences', 'Intensif', 'Rotation Nuit'],
    typeStage: 'Urgences',
    specialitesRequerues: ['Urgentologie', 'Médecine d\'Urgence'],
    prerequis: ['5ème année médecine', 'Formation SAMU'],
    vues: 312,
    favoris: 45
  },
  {
    id: 'A5',
    titre: 'Stage en Neurochirurgie',
    description: 'Stage en neurochirurgie avec focus sur la chirurgie du rachis.',
    serviceId: '5',
    serviceNom: 'Neurochirurgie',
    hopitalId: 'H2',
    hopitalNom: 'CHU Beni Messous',
    dateDebut: '2024-07-01',
    dateFin: '2024-12-31',
    dureeSemaines: 24,
    dateLimiteCandidature: '2024-06-15',
    placesDisponibles: 3,
    placesTotal: 3,
    candidaturesEnAttente: 5,
    candidaturesAcceptees: 1,
    candidaturesRefusees: 0,
    chefServiceId: 'E6',
    chefServiceNom: 'Dr. Leila Boukhemis',
    encadrants: [mockEncadrants[5]],
    horaireQuotidien: {
      heureDebut: '07:30',
      heureFin: '19:30',
      pauseDejeuner: {
        heureDebut: '12:00',
        heureFin: '13:00'
      },
      joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'] // 5 jours
    },
    statut: 'active',
    validationChef: true,
    validationEtablissement: true,
    etudiantsAcceptes: ['ET11'],
    statutStage: 'en_cours',
    notes: [16],
    datePublication: '2024-01-05',
    dateCloture: null,
    isNew: false,
    tags: ['Neurochirurgie', 'Rachis', 'Stage Long'],
    typeStage: 'Neurochirurgie',
    specialitesRequerues: ['Neurochirurgie', 'Neurologie'],
    prerequis: ['6ème année médecine', 'Stage en chirurgie'],
    vues: 167,
    favoris: 22
  }
];

export const typeStageOptions = [
  'Chirurgie Cardiaque',
  'Pédiatrie Générale',
  'Cardiologie',
  'Urgences',
  'Neurochirurgie',
  'Orthopédie',
  'Radiologie',
  'Anesthésie',
  'Réanimation',
  'Médecine Interne',
  'Dermatologie',
  'Ophtalmologie',
  'ORL',
  'Gynécologie',
  'Traumatologie'
];

export const specialitesOptions = [
  'Chirurgie Cardiaque',
  'Chirurgie Générale',
  'Cardiologie',
  'Pédiatrie',
  'Urgentologie',
  'Neurologie',
  'Neurochirurgie',
  'Orthopédie',
  'Traumatologie',
  'Radiologie',
  'Anesthésie',
  'Réanimation',
  'Médecine Interne',
  'Dermatologie',
  'Ophtalmologie',
  'ORL',
  'Gynécologie'
];

export const tagOptions = [
  'Stage Long',
  'Stage Court',
  'Stage Moyen',
  'Intensif',
  'Rotation Nuit',
  'Rotation Jour',
  'Spécialisé',
  'Général',
  'Chirurgie',
  'Médecine',
  'Recherche',
  'Urgent',
  'Planifié',
  'Nouveau',
  'Week-end',
  'Nuit'
];