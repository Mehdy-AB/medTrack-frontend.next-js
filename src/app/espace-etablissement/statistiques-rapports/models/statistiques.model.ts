"use client";

export interface Periode {
  id: string;
  label: string;
  dateDebut: string;
  dateFin: string;
}

export interface KPI {
  id: string;
  nom: string;
  valeur: number;
  unite: string;
  variation: number; // en %
  tendance: 'hausse' | 'baisse' | 'stable';
  seuilCible: number;
  performance: 'excellente' | 'bonne' | 'moyenne' | 'faible';
  historique: {
    date: string;
    valeur: number;
  }[];
}

export interface ServiceStat {
  id: string;
  nom: string;
  hopital: string;
  chefService: string;
  annoncesTotal: number;
  annoncesActives: number;
  candidaturesTotal: number;
  candidaturesAcceptees: number;
  tauxAcceptation: number;
  tauxOccupation: number;
  satisfactionMoyenne: number;
  vuesMoyennes: number;
  kpis: KPI[];
}

export interface Rapport {
  id: string;
  titre: string;
  type: 'hebdomadaire' | 'mensuel' | 'trimestriel' | 'annuel' | 'personnalise';
  periode: Periode;
  dateGeneration: string;
  generateur: string;
  format: 'pdf' | 'excel' | 'ppt';
  taille: string;
  url: string;
  statsResume: {
    annoncesTotal: number;
    candidaturesTotal: number;
    tauxConversion: number;
    serviceMeilleur: string;
    kpiPrincipal: string;
  };
}

export interface DonneesChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[]; // Modifiez cette ligne
    borderColor: string | string[];     // Modifiez cette ligne
  }[];
}

export interface FilterStats {
  periode: Periode;
  services: string[];
  hopitaux: string[];
  typeStage: string[];
  niveauEtude: string[];
}

// Données mockées
export const periodesDisponibles: Periode[] = [
  { id: 'P1', label: 'Cette semaine', dateDebut: '2024-02-19', dateFin: '2024-02-25' },
  { id: 'P2', label: 'Mois en cours', dateDebut: '2024-02-01', dateFin: '2024-02-29' },
  { id: 'P3', label: 'Trimestre en cours', dateDebut: '2024-01-01', dateFin: '2024-03-31' },
  { id: 'P4', label: 'Année en cours', dateDebut: '2024-01-01', dateFin: '2024-12-31' },
  { id: 'P5', label: 'Mois précédent', dateDebut: '2024-01-01', dateFin: '2024-01-31' },
  { id: 'P6', label: 'Trimestre précédent', dateDebut: '2023-10-01', dateFin: '2023-12-31' },
  { id: 'P7', label: 'Année précédente', dateDebut: '2023-01-01', dateFin: '2023-12-31' },
];

export const mockServicesStats: ServiceStat[] = [
  {
    id: 'S1',
    nom: 'Chirurgie Cardiaque',
    hopital: 'CHU Mustapha',
    chefService: 'Dr. Ahmed Benali',
    annoncesTotal: 12,
    annoncesActives: 8,
    candidaturesTotal: 245,
    candidaturesAcceptees: 156,
    tauxAcceptation: 63.7,
    tauxOccupation: 92.5,
    satisfactionMoyenne: 4.3,
    vuesMoyennes: 187,
    kpis: [
      {
        id: 'K1',
        nom: 'Taux de conversion',
        valeur: 63.7,
        unite: '%',
        variation: 5.2,
        tendance: 'hausse',
        seuilCible: 60,
        performance: 'excellente',
        historique: [
          { date: '2024-01', valeur: 58.5 },
          { date: '2024-02', valeur: 63.7 },
        ]
      },
      {
        id: 'K2',
        nom: 'Temps moyen réponse',
        valeur: 2.3,
        unite: 'jours',
        variation: -0.8,
        tendance: 'baisse',
        seuilCible: 3,
        performance: 'excellente',
        historique: [
          { date: '2024-01', valeur: 3.1 },
          { date: '2024-02', valeur: 2.3 },
        ]
      }
    ]
  },
  {
    id: 'S2',
    nom: 'Pédiatrie',
    hopital: 'CHU Beni Messous',
    chefService: 'Dr. Karima Bensaid',
    annoncesTotal: 8,
    annoncesActives: 6,
    candidaturesTotal: 189,
    candidaturesAcceptees: 112,
    tauxAcceptation: 59.3,
    tauxOccupation: 85.2,
    satisfactionMoyenne: 4.1,
    vuesMoyennes: 156,
    kpis: [
      {
        id: 'K3',
        nom: 'Taux de conversion',
        valeur: 59.3,
        unite: '%',
        variation: -1.5,
        tendance: 'baisse',
        seuilCible: 60,
        performance: 'moyenne',
        historique: [
          { date: '2024-01', valeur: 60.8 },
          { date: '2024-02', valeur: 59.3 },
        ]
      },
      {
        id: 'K4',
        nom: 'Taux d\'abandon',
        valeur: 12.4,
        unite: '%',
        variation: 2.1,
        tendance: 'hausse',
        seuilCible: 10,
        performance: 'faible',
        historique: [
          { date: '2024-01', valeur: 10.3 },
          { date: '2024-02', valeur: 12.4 },
        ]
      }
    ]
  },
  {
    id: 'S3',
    nom: 'Cardiologie',
    hopital: 'CHU Mustapha',
    chefService: 'Dr. Rachid Mansouri',
    annoncesTotal: 10,
    annoncesActives: 7,
    candidaturesTotal: 203,
    candidaturesAcceptees: 145,
    tauxAcceptation: 71.4,
    tauxOccupation: 94.8,
    satisfactionMoyenne: 4.5,
    vuesMoyennes: 194,
    kpis: [
      {
        id: 'K5',
        nom: 'Taux de conversion',
        valeur: 71.4,
        unite: '%',
        variation: 8.7,
        tendance: 'hausse',
        seuilCible: 65,
        performance: 'excellente',
        historique: [
          { date: '2024-01', valeur: 62.7 },
          { date: '2024-02', valeur: 71.4 },
        ]
      },
      {
        id: 'K6',
        nom: 'Satisfaction moyenne',
        valeur: 4.5,
        unite: '/5',
        variation: 0.3,
        tendance: 'hausse',
        seuilCible: 4,
        performance: 'excellente',
        historique: [
          { date: '2024-01', valeur: 4.2 },
          { date: '2024-02', valeur: 4.5 },
        ]
      }
    ]
  },
  {
    id: 'S4',
    nom: 'Urgences',
    hopital: 'CHU Bab El Oued',
    chefService: 'Dr. Samira Touati',
    annoncesTotal: 6,
    annoncesActives: 4,
    candidaturesTotal: 167,
    candidaturesAcceptees: 98,
    tauxAcceptation: 58.7,
    tauxOccupation: 81.3,
    satisfactionMoyenne: 3.8,
    vuesMoyennes: 142,
    kpis: [
      {
        id: 'K7',
        nom: 'Taux de conversion',
        valeur: 58.7,
        unite: '%',
        variation: -3.2,
        tendance: 'baisse',
        seuilCible: 60,
        performance: 'moyenne',
        historique: [
          { date: '2024-01', valeur: 61.9 },
          { date: '2024-02', valeur: 58.7 },
        ]
      },
      {
        id: 'K8',
        nom: 'Temps de réponse',
        valeur: 4.1,
        unite: 'jours',
        variation: 0.5,
        tendance: 'hausse',
        seuilCible: 3,
        performance: 'faible',
        historique: [
          { date: '2024-01', valeur: 3.6 },
          { date: '2024-02', valeur: 4.1 },
        ]
      }
    ]
  },
  {
    id: 'S5',
    nom: 'Neurochirurgie',
    hopital: 'CHU Beni Messous',
    chefService: 'Dr. Leila Boukhemis',
    annoncesTotal: 7,
    annoncesActives: 5,
    candidaturesTotal: 132,
    candidaturesAcceptees: 89,
    tauxAcceptation: 67.4,
    tauxOccupation: 91.2,
    satisfactionMoyenne: 4.4,
    vuesMoyennes: 178,
    kpis: [
      {
        id: 'K9',
        nom: 'Taux de conversion',
        valeur: 67.4,
        unite: '%',
        variation: 4.8,
        tendance: 'hausse',
        seuilCible: 65,
        performance: 'excellente',
        historique: [
          { date: '2024-01', valeur: 62.6 },
          { date: '2024-02', valeur: 67.4 },
        ]
      },
      {
        id: 'K10',
        nom: 'Taux de complétion',
        valeur: 96.7,
        unite: '%',
        variation: 1.2,
        tendance: 'hausse',
        seuilCible: 95,
        performance: 'excellente',
        historique: [
          { date: '2024-01', valeur: 95.5 },
          { date: '2024-02', valeur: 96.7 },
        ]
      }
    ]
  }
];

export const mockHistoriqueRapports: Rapport[] = [
  {
    id: 'R1',
    titre: 'Rapport Mensuel Février 2024',
    type: 'mensuel',
    periode: periodesDisponibles[1],
    dateGeneration: '2024-02-29',
    generateur: 'Admin Établissement',
    format: 'pdf',
    taille: '2.4 MB',
    url: '/rapports/mensuel-fevrier-2024.pdf',
    statsResume: {
      annoncesTotal: 43,
      candidaturesTotal: 936,
      tauxConversion: 64.1,
      serviceMeilleur: 'Cardiologie',
      kpiPrincipal: 'Taux de conversion +8.7%'
    }
  },
  {
    id: 'R2',
    titre: 'Analyse Trimestrielle Q1 2024',
    type: 'trimestriel',
    periode: periodesDisponibles[2],
    dateGeneration: '2024-03-31',
    generateur: 'Admin Établissement',
    format: 'excel',
    taille: '4.1 MB',
    url: '/rapports/trimestriel-q1-2024.xlsx',
    statsResume: {
      annoncesTotal: 128,
      candidaturesTotal: 2789,
      tauxConversion: 62.8,
      serviceMeilleur: 'Chirurgie Cardiaque',
      kpiPrincipal: 'Satisfaction +15%'
    }
  },
  {
    id: 'R3',
    titre: 'Performance Services - Analyse comparative',
    type: 'personnalise',
    periode: periodesDisponibles[3],
    dateGeneration: '2024-02-25',
    generateur: 'Admin Établissement',
    format: 'ppt',
    taille: '5.2 MB',
    url: '/rapports/performance-services.ppt',
    statsResume: {
      annoncesTotal: 43,
      candidaturesTotal: 936,
      tauxConversion: 64.1,
      serviceMeilleur: 'Cardiologie',
      kpiPrincipal: 'KPI multiples'
    }
  },
  {
    id: 'R4',
    titre: 'Rapport Hebdomadaire 19-25 Février',
    type: 'hebdomadaire',
    periode: periodesDisponibles[0],
    dateGeneration: '2024-02-25',
    generateur: 'Système Automatique',
    format: 'pdf',
    taille: '1.2 MB',
    url: '/rapports/hebdomadaire-19-25-fevrier.pdf',
    statsResume: {
      annoncesTotal: 12,
      candidaturesTotal: 245,
      tauxConversion: 65.3,
      serviceMeilleur: 'Neurochirurgie',
      kpiPrincipal: 'Taux conversion +4.8%'
    }
  }
];

// Données pour les graphiques
export const mockDonneesAnnonces: DonneesChart = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Annonces publiées',
      data: [15, 22, 18, 25, 30, 28],
      backgroundColor: 'rgba(56, 178, 172, 0.2)',
      borderColor: 'rgba(56, 178, 172, 1)',
    },
    {
      label: 'Annonces actives',
      data: [12, 18, 15, 22, 26, 24],
      backgroundColor: 'rgba(66, 153, 225, 0.2)',
      borderColor: 'rgba(66, 153, 225, 1)',
    }
  ]
};

export const mockDonneesCandidatures: DonneesChart = {
  labels: ['Chir. Cardiaque', 'Pédiatrie', 'Cardiologie', 'Urgences', 'Neurochirurgie'],
  datasets: [
    {
      label: 'Candidatures totales',
      data: [245, 189, 203, 167, 132],
      backgroundColor: 'rgba(72, 187, 120, 0.2)',
      borderColor: 'rgba(72, 187, 120, 1)',
    },
    {
      label: 'Candidatures acceptées',
      data: [156, 112, 145, 98, 89],
      backgroundColor: 'rgba(237, 137, 54, 0.2)',
      borderColor: 'rgba(237, 137, 54, 1)',
    }
  ]
};

export const mockDonneesPerformance: DonneesChart = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [
    {
      label: 'Taux de conversion (%)',
      data: [62, 65, 63, 68, 70, 58, 52],
      backgroundColor: 'rgba(159, 122, 234, 0.2)',
      borderColor: 'rgba(159, 122, 234, 1)',
    }
  ]
};

export const mockDonneesSatisfaction: DonneesChart = {
  labels: ['Chir. Cardiaque', 'Pédiatrie', 'Cardiologie', 'Urgences', 'Neurochirurgie'],
  datasets: [
    {
      label: 'Satisfaction moyenne (/5)',
      data: [4.3, 4.1, 4.5, 3.8, 4.4],
      backgroundColor: [  // Tableau au lieu de chaîne
        'rgba(56, 178, 172, 0.7)',
        'rgba(66, 153, 225, 0.7)',
        'rgba(72, 187, 120, 0.7)',
        'rgba(237, 137, 54, 0.7)',
        'rgba(159, 122, 234, 0.7)'
      ],
      borderColor: [  // Tableau au lieu de chaîne
        'rgba(56, 178, 172, 1)',
        'rgba(66, 153, 225, 1)',
        'rgba(72, 187, 120, 1)',
        'rgba(237, 137, 54, 1)',
        'rgba(159, 122, 234, 1)'
      ],
    }
  ]
};
