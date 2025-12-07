export interface EvaluationHistorique {
  encadrant: string;
  hopitalService: string;
  dateEvaluation: string;
  note: number;
  commentaire: string;
  statut: 'En cours' | 'Terminé'; // Pour distinguer stage actuel vs passé
  periodeStage: string; // Ex: "01/09/2025 - 30/09/2025"
}

export const mockEvaluationsHistorique: EvaluationHistorique[] = [
  // Stage ACTUEL (en cours)
  {
    encadrant: 'Dr. Lounès Ahmed',
    hopitalService: 'THENIA\nChirurgie Cardiaque',
    dateEvaluation: '15/10/2025',
    note: 18,
    commentaire: 'Excellent engagement',
    statut: 'En cours',
    periodeStage: '01/10/2025 - 31/10/2025'
  },
  
  // Stages PASSÉS (terminés)
  {
    encadrant: 'Dr. Bensalem Yacine',
    hopitalService: 'CHU Mustapha\nMédecine Interne',
    dateEvaluation: '28/09/2025',
    note: 17,
    commentaire: 'Très bonne maîtrise technique',
    statut: 'Terminé',
    periodeStage: '01/09/2025 - 30/09/2025'
  },
  {
    encadrant: 'Dr. Saadi Karima',
    hopitalService: 'DELLES\nPédiatrie',
    dateEvaluation: '30/08/2025',
    note: 16.5,
    commentaire: 'Bonne implication auprès des patients',
    statut: 'Terminé',
    periodeStage: '01/08/2025 - 31/08/2025'
  },
  {
    encadrant: 'Dr. Amara Sofiane',
    hopitalService: 'BORDJ MENAL\nUrgences',
    dateEvaluation: '29/07/2025',
    note: 15.5,
    commentaire: 'Participation active, ponctuel',
    statut: 'Terminé',
    periodeStage: '01/07/2025 - 31/07/2025'
  },
  {
    encadrant: 'Dr. Mekki Farid',
    hopitalService: 'Hôpital Parnet\nCardiologie',
    dateEvaluation: '25/06/2025',
    note: 17.5,
    commentaire: 'Excellente progression',
    statut: 'Terminé',
    periodeStage: '01/06/2025 - 30/06/2025'
  }
];