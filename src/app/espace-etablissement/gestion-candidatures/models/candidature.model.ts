"use client";

export interface Document {
  id: string;
  type: 'cv' | 'lettre_motivation' | 'releve_notes' | 'attestation_inscription' | 'certificat_scolarite';
  nom: string;
  url: string;
  dateUpload: string;
  statut: 'valide' | 'invalide' | 'en_attente';
}

export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  universite: string;
  specialite: string;
  anneeEtude: number;
  moyenneGenerale: number;
  dateInscription: string;
}

export interface Candidature {
  id: string;
  etudiant: Etudiant;
  annonceId: string;
  annonceTitre: string;
  serviceNom: string;
  hopitalNom: string;
  dateSoumission: string;
  statut: 'en_attente' | 'pre_validee' | 'transmise_service' | 'acceptee_chef' | 'refusee_chef' | 'annulee';
  documents: Document[];
  niveauEtude: 'L2' | 'L3' | 'M1' | 'M2' | 'D1' | 'D2';
  specialiteDemandee: string;
  datePreValidation?: string;
  preValidateurId?: string;
  dateTransmission?: string;
  transmissionId?: string;
  commentairePreValidation?: string;
  dateDecisionChef?: string;
  commentaireChef?: string;
  historique: {
    date: string;
    action: string;
    utilisateur: string;
    details?: string;
  }[];
  scoreEligibilite: number; // Score calculé basé sur les critères
}

export interface FiltresCandidatures {
  statut: string;
  service: string;
  hopital: string;
  niveauEtude: string;
  dateDebut: string;
  dateFin: string;
}

export interface Service {
  id: string;
  nom: string;
  hopitalId: string;
  hopitalNom: string;
  chefServiceId: string;
  chefServiceNom: string;
}

// Données mockées
export const mockServices: Service[] = [
  { id: 'S1', nom: 'Chirurgie Cardiaque', hopitalId: 'H1', hopitalNom: 'CHU Mustapha', chefServiceId: 'C1', chefServiceNom: 'Dr. Ahmed Benali' },
  { id: 'S2', nom: 'Pédiatrie', hopitalId: 'H2', hopitalNom: 'CHU Beni Messous', chefServiceId: 'C2', chefServiceNom: 'Dr. Karima Bensaid' },
  { id: 'S3', nom: 'Cardiologie', hopitalId: 'H1', hopitalNom: 'CHU Mustapha', chefServiceId: 'C3', chefServiceNom: 'Dr. Rachid Mansouri' },
  { id: 'S4', nom: 'Urgences', hopitalId: 'H3', hopitalNom: 'CHU Bab El Oued', chefServiceId: 'C4', chefServiceNom: 'Dr. Samira Touati' },
  { id: 'S5', nom: 'Neurochirurgie', hopitalId: 'H2', hopitalNom: 'CHU Beni Messous', chefServiceId: 'C5', chefServiceNom: 'Dr. Leila Boukhemis' },
];

export const mockEtudiants: Etudiant[] = [
  {
    id: 'ET1',
    nom: 'Dahmani',
    prenom: 'Mohamed',
    email: 'mohamed.dahmani@univ.dz',
    telephone: '0661122334',
    universite: 'Université d',
    specialite: 'Médecine',
    anneeEtude: 6,
    moyenneGenerale: 15.5,
    dateInscription: '2023-09-15'
  },
  {
    id: 'ET2',
    nom: 'Benamara',
    prenom: 'Fatima',
    email: 'fatima.benamara@univ.dz',
    telephone: '0662233445',
    universite: 'Université de Constantine',
    specialite: 'Médecine',
    anneeEtude: 5,
    moyenneGenerale: 16.2,
    dateInscription: '2023-09-20'
  },
  {
    id: 'ET3',
    nom: 'Khelifi',
    prenom: 'Karim',
    email: 'karim.khelifi@univ.dz',
    telephone: '0663344556',
    universite: 'Université d',
    specialite: 'Médecine',
    anneeEtude: 6,
    moyenneGenerale: 14.8,
    dateInscription: '2023-09-10'
  },
  {
    id: 'ET4',
    nom: 'Zerrouki',
    prenom: 'Samira',
    email: 'samira.zerrouki@univ.dz',
    telephone: '0664455667',
    universite: 'Université de Blida',
    specialite: 'Médecine',
    anneeEtude: 4,
    moyenneGenerale: 15.9,
    dateInscription: '2023-09-25'
  },
  {
    id: 'ET5',
    nom: 'Bouziane',
    prenom: 'Youssef',
    email: 'youssef.bouziane@univ.dz',
    telephone: '0665566778',
    universite: 'Université d',
    specialite: 'Médecine',
    anneeEtude: 6,
    moyenneGenerale: 17.1,
    dateInscription: '2023-09-05'
  },
];

export const mockCandidatures: Candidature[] = [
  {
    id: 'CAND1',
    etudiant: mockEtudiants[0],
    annonceId: 'A1',
    annonceTitre: 'Stage en Chirurgie Cardiaque',
    serviceNom: 'Chirurgie Cardiaque',
    hopitalNom: 'CHU Mustapha',
    dateSoumission: '2024-02-01',
    statut: 'en_attente',
    niveauEtude: 'M2',
    specialiteDemandee: 'Chirurgie Cardiaque',
    scoreEligibilite: 85,
    documents: [
      { id: 'D1', type: 'cv', nom: 'CV_Mohamed_Dahmani.pdf', url: '#', dateUpload: '2024-02-01', statut: 'valide' },
      { id: 'D2', type: 'lettre_motivation', nom: 'Lettre_Motivation.pdf', url: '#', dateUpload: '2024-02-01', statut: 'valide' },
      { id: 'D3', type: 'releve_notes', nom: 'Releve_Notes.pdf', url: '#', dateUpload: '2024-02-01', statut: 'valide' },
      { id: 'D4', type: 'attestation_inscription', nom: 'Attestation_Inscription.pdf', url: '#', dateUpload: '2024-02-01', statut: 'en_attente' },
    ],
    historique: [
      { date: '2024-02-01 10:30:00', action: 'Candidature soumise', utilisateur: 'Système' },
    ]
  },
  {
    id: 'CAND2',
    etudiant: mockEtudiants[1],
    annonceId: 'A1',
    annonceTitre: 'Stage en Chirurgie Cardiaque',
    serviceNom: 'Chirurgie Cardiaque',
    hopitalNom: 'CHU Mustapha',
    dateSoumission: '2024-02-02',
    statut: 'pre_validee',
    datePreValidation: '2024-02-03',
    preValidateurId: 'ADMIN1',
    niveauEtude: 'M1',
    specialiteDemandee: 'Chirurgie Cardiaque',
    commentairePreValidation: 'Documents complets, éligible niveau M2',
    scoreEligibilite: 92,
    documents: [
      { id: 'D5', type: 'cv', nom: 'CV_Fatima_Benamara.pdf', url: '#', dateUpload: '2024-02-02', statut: 'valide' },
      { id: 'D6', type: 'lettre_motivation', nom: 'Lettre_Motivation.pdf', url: '#', dateUpload: '2024-02-02', statut: 'valide' },
      { id: 'D7', type: 'releve_notes', nom: 'Releve_Notes.pdf', url: '#', dateUpload: '2024-02-02', statut: 'valide' },
      { id: 'D8', type: 'certificat_scolarite', nom: 'Certificat_Scolarite.pdf', url: '#', dateUpload: '2024-02-02', statut: 'valide' },
    ],
    historique: [
      { date: '2024-02-02 14:15:00', action: 'Candidature soumise', utilisateur: 'Système' },
      { date: '2024-02-03 09:45:00', action: 'Pré-validation', utilisateur: 'Admin Établissement', details: 'Documents complets, éligible' },
    ]
  },
  {
    id: 'CAND3',
    etudiant: mockEtudiants[2],
    annonceId: 'A2',
    annonceTitre: 'Stage en Pédiatrie Générale',
    serviceNom: 'Pédiatrie',
    hopitalNom: 'CHU Beni Messous',
    dateSoumission: '2024-02-03',
    statut: 'transmise_service',
    datePreValidation: '2024-02-04',
    preValidateurId: 'ADMIN1',
    dateTransmission: '2024-02-05',
    transmissionId: 'ADMIN1',
    niveauEtude: 'M2',
    specialiteDemandee: 'Pédiatrie',
    scoreEligibilite: 88,
    documents: [
      { id: 'D9', type: 'cv', nom: 'CV_Karim_Khelifi.pdf', url: '#', dateUpload: '2024-02-03', statut: 'valide' },
      { id: 'D10', type: 'lettre_motivation', nom: 'Lettre_Motivation.pdf', url: '#', dateUpload: '2024-02-03', statut: 'valide' },
      { id: 'D11', type: 'releve_notes', nom: 'Releve_Notes.pdf', url: '#', dateUpload: '2024-02-03', statut: 'valide' },
    ],
    historique: [
      { date: '2024-02-03 11:20:00', action: 'Candidature soumise', utilisateur: 'Système' },
      { date: '2024-02-04 10:30:00', action: 'Pré-validation', utilisateur: 'Admin Établissement' },
      { date: '2024-02-05 14:00:00', action: 'Transmise au service', utilisateur: 'Admin Établissement' },
    ]
  },
  {
    id: 'CAND4',
    etudiant: mockEtudiants[3],
    annonceId: 'A3',
    annonceTitre: 'Stage en Cardiologie Interventionnelle',
    serviceNom: 'Cardiologie',
    hopitalNom: 'CHU Mustapha',
    dateSoumission: '2024-02-04',
    statut: 'acceptee_chef',
    datePreValidation: '2024-02-05',
    preValidateurId: 'ADMIN1',
    dateTransmission: '2024-02-06',
    transmissionId: 'ADMIN1',
    dateDecisionChef: '2024-02-10',
    commentaireChef: 'Profil excellent, bonne motivation',
    niveauEtude: 'M2',
    specialiteDemandee: 'Cardiologie',
    scoreEligibilite: 95,
    documents: [
      { id: 'D12', type: 'cv', nom: 'CV_Samira_Zerrouki.pdf', url: '#', dateUpload: '2024-02-04', statut: 'valide' },
      { id: 'D13', type: 'lettre_motivation', nom: 'Lettre_Motivation.pdf', url: '#', dateUpload: '2024-02-04', statut: 'valide' },
      { id: 'D14', type: 'releve_notes', nom: 'Releve_Notes.pdf', url: '#', dateUpload: '2024-02-04', statut: 'valide' },
    ],
    historique: [
      { date: '2024-02-04 16:45:00', action: 'Candidature soumise', utilisateur: 'Système' },
      { date: '2024-02-05 11:15:00', action: 'Pré-validation', utilisateur: 'Admin Établissement' },
      { date: '2024-02-06 09:30:00', action: 'Transmise au service', utilisateur: 'Admin Établissement' },
      { date: '2024-02-10 15:20:00', action: 'Acceptée par chef de service', utilisateur: 'Dr. Rachid Mansouri' },
    ]
  },
  {
    id: 'CAND5',
    etudiant: mockEtudiants[4],
    annonceId: 'A2',
    annonceTitre: 'Stage en Pédiatrie Générale',
    serviceNom: 'Pédiatrie',
    hopitalNom: 'CHU Beni Messous',
    dateSoumission: '2024-02-05',
    statut: 'refusee_chef',
    datePreValidation: '2024-02-06',
    preValidateurId: 'ADMIN1',
    dateTransmission: '2024-02-07',
    transmissionId: 'ADMIN1',
    dateDecisionChef: '2024-02-11',
    commentaireChef: 'Profil ne correspond pas aux besoins du service',
    niveauEtude: 'M2',
    specialiteDemandee: 'Pédiatrie',
    scoreEligibilite: 78,
    documents: [
      { id: 'D15', type: 'cv', nom: 'CV_Youssef_Bouziane.pdf', url: '#', dateUpload: '2024-02-05', statut: 'valide' },
      { id: 'D16', type: 'lettre_motivation', nom: 'Lettre_Motivation.pdf', url: '#', dateUpload: '2024-02-05', statut: 'valide' },
      { id: 'D17', type: 'releve_notes', nom: 'Releve_Notes.pdf', url: '#', dateUpload: '2024-02-05', statut: 'invalide' },
    ],
    historique: [
      { date: '2024-02-05 13:10:00', action: 'Candidature soumise', utilisateur: 'Système' },
      { date: '2024-02-06 10:45:00', action: 'Pré-validation', utilisateur: 'Admin Établissement' },
      { date: '2024-02-07 14:30:00', action: 'Transmise au service', utilisateur: 'Admin Établissement' },
      { date: '2024-02-11 11:15:00', action: 'Refusée par chef de service', utilisateur: 'Dr. Karima Bensaid' },
    ]
  },
];