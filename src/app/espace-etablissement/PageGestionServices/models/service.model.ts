// models/service.model.ts

export interface ServiceHospitalier {
  id: string;
  nom: string;
  code: string;
  description: string;
  chefService?: string;
  chefServiceId?: string;
  capaciteMax: number;
  etudiantsActifs: number;
  tauxOccupation: number;
  statut: 'actif' | 'inactif' | 'suspendu';
  typeStages: string[];
  specialitesAssociees: string[];
  dateCreation: string;
  dateModification: string;
  performance: {
    noteMoyenne: number;
    tauxPresence: number;
    tauxSatisfaction: number;
  };
  alertes: string[];
  
  // Ajouter les propriétés manquantes pour compatibilité avec ServiceData
  noteMoyenne?: number;
  presenceMoyenne?: number;
  candidaturesAttente?: number;
  ancienneteMax?: number;
}

// Garder le reste du fichier inchangé...
export interface ChefService {
  id: string;
  nom: string;
  matricule: string;
  specialite: string;
  email: string;
  telephone: string;
  serviceActuel?: string;
}

export interface ConfigService {
  nom: string;
  code: string;
  description: string;
  chefServiceId?: string;
  capaciteMax: number;
  typeStages: string[];
  specialitesAssociees: string[];
}

export const mockServices: ServiceHospitalier[] = [
  {
    id: '1',
    nom: 'Chirurgie Cardiaque',
    code: 'CHIR-CARD',
    description: 'Service spécialisé en chirurgie cardiaque et thoracique',
    chefService: 'Dr. Ahmed Benali',
    chefServiceId: 'CS001',
    capaciteMax: 10,
    etudiantsActifs: 8,
    tauxOccupation: 80,
    statut: 'actif',
    typeStages: ['Chirurgie', 'Cardiologie', 'Réanimation'],
    specialitesAssociees: ['Chirurgie Cardiaque', 'Cardiologie', 'Anesthésie'],
    dateCreation: '2023-01-15',
    dateModification: '2024-01-10',
    performance: {
      noteMoyenne: 15.2,
      tauxPresence: 94,
      tauxSatisfaction: 92
    },
    alertes: []
  },
  {
    id: '2',
    nom: 'Pédiatrie',
    code: 'PED',
    description: 'Service de pédiatrie générale et spécialisée',
    chefService: 'Dr. Karima Bensaid',
    chefServiceId: 'CS002',
    capaciteMax: 15,
    etudiantsActifs: 12,
    tauxOccupation: 80,
    statut: 'actif',
    typeStages: ['Pédiatrie Générale', 'Néonatologie', 'Urgences Pédiatriques'],
    specialitesAssociees: ['Pédiatrie', 'Néonatologie', 'Pédopsychiatrie'],
    dateCreation: '2023-02-20',
    dateModification: '2024-01-12',
    performance: {
      noteMoyenne: 14.8,
      tauxPresence: 96,
      tauxSatisfaction: 95
    },
    alertes: []
  },
  {
    id: '3',
    nom: 'Cardiologie',
    code: 'CARDIO',
    description: 'Service de cardiologie médicale et interventionnelle',
    chefService: 'Dr. Rachid Mansouri',
    chefServiceId: 'CS003',
    capaciteMax: 12,
    etudiantsActifs: 14,
    tauxOccupation: 116,
    statut: 'actif',
    typeStages: ['Cardiologie', 'Échographie', 'Rythmologie'],
    specialitesAssociees: ['Cardiologie', 'Rythmologie', 'Échocardiographie'],
    dateCreation: '2023-03-10',
    dateModification: '2024-01-08',
    performance: {
      noteMoyenne: 13.5,
      tauxPresence: 89,
      tauxSatisfaction: 85
    },
    alertes: ['Surcharge de capacité']
  },
  {
    id: '4',
    nom: 'Urgences',
    code: 'URG',
    description: 'Service des urgences médicales et chirurgicales',
    // Pas de chef de service - badge orange
    capaciteMax: 10,
    etudiantsActifs: 6,
    tauxOccupation: 60,
    statut: 'actif',
    typeStages: ['Urgences', 'Traumatologie', 'Réanimation'],
    specialitesAssociees: ['Urgentologie', 'Traumatologie', 'Médecine d\'Urgence'],
    dateCreation: '2023-04-05',
    dateModification: '2024-01-15',
    performance: {
      noteMoyenne: 16.1,
      tauxPresence: 98,
      tauxSatisfaction: 96
    },
    alertes: ['Chef de service manquant']
  },
  {
    id: '5',
    nom: 'Neurochirurgie',
    code: 'NEURO-CHIR',
    description: 'Service de neurochirurgie et chirurgie du rachis',
    chefService: 'Dr. Mohamed Khelif',
    chefServiceId: 'CS005',
    capaciteMax: 8,
    etudiantsActifs: 5,
    tauxOccupation: 62.5,
    statut: 'inactif',
    typeStages: ['Neurochirurgie', 'Chirurgie du Rachis', 'Chirurgie Crânienne'],
    specialitesAssociees: ['Neurochirurgie', 'Neurologie', 'Radiologie Interventionnelle'],
    dateCreation: '2023-05-18',
    dateModification: '2024-01-05',
    performance: {
      noteMoyenne: 15.8,
      tauxPresence: 92,
      tauxSatisfaction: 90
    },
    alertes: ['Service inactif', 'Candidatures suspendues']
  },
  {
    id: '6',
    nom: 'Orthopédie',
    code: 'ORTHO',
    description: 'Service d\'orthopédie et traumatologie ostéo-articulaire',
    chefService: 'Dr. Fatima Zohra',
    chefServiceId: 'CS006',
    capaciteMax: 10,
    etudiantsActifs: 9,
    tauxOccupation: 90,
    statut: 'actif',
    typeStages: ['Orthopédie', 'Traumatologie', 'Chirurgie de la Main'],
    specialitesAssociees: ['Orthopédie', 'Traumatologie', 'Chirurgie Orthopédique'],
    dateCreation: '2023-06-22',
    dateModification: '2024-01-14',
    performance: {
      noteMoyenne: 14.2,
      tauxPresence: 95,
      tauxSatisfaction: 93
    },
    alertes: []
  }
];

export const mockChefsService: ChefService[] = [
  {
    id: 'CS001',
    nom: 'Dr. Ahmed Benali',
    matricule: 'MED001',
    specialite: 'Chirurgie Cardiaque',
    email: 'ahmed.benali@hospital.dz',
    telephone: '0661234567',
    serviceActuel: 'Chirurgie Cardiaque'
  },
  {
    id: 'CS002',
    nom: 'Dr. Karima Bensaid',
    matricule: 'MED002',
    specialite: 'Pédiatrie',
    email: 'karima.bensaid@hospital.dz',
    telephone: '0662345678',
    serviceActuel: 'Pédiatrie'
  },
  {
    id: 'CS003',
    nom: 'Dr. Rachid Mansouri',
    matricule: 'MED003',
    specialite: 'Cardiologie',
    email: 'rachid.mansouri@hospital.dz',
    telephone: '0663456789',
    serviceActuel: 'Cardiologie'
  },
  {
    id: 'CS005',
    nom: 'Dr. Mohamed Khelif',
    matricule: 'MED005',
    specialite: 'Neurochirurgie',
    email: 'mohamed.khelif@hospital.dz',
    telephone: '0665678901',
    serviceActuel: 'Neurochirurgie'
  },
  {
    id: 'CS006',
    nom: 'Dr. Fatima Zohra',
    matricule: 'MED006',
    specialite: 'Orthopédie',
    email: 'fatima.zohra@hospital.dz',
    telephone: '0666789012',
    serviceActuel: 'Orthopédie'
  },
  // Chefs disponibles sans affectation
  {
    id: 'CS007',
    nom: 'Dr. Samira Touati',
    matricule: 'MED007',
    specialite: 'Urgentologie',
    email: 'samira.touati@hospital.dz',
    telephone: '0667890123'
  },
  {
    id: 'CS008',
    nom: 'Dr. Youcef Merabet',
    matricule: 'MED008',
    specialite: 'Chirurgie Générale',
    email: 'youcef.merabet@hospital.dz',
    telephone: '0668901234'
  }
];

export const typeStagesOptions = [
  'Chirurgie',
  'Cardiologie',
  'Pédiatrie',
  'Urgences',
  'Neurologie',
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
  'Chirurgie Thoracique',
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
  'Gynécologie',
  'Néonatologie',
  'Pédopsychiatrie',
  'Rythmologie',
  'Échocardiographie'
];