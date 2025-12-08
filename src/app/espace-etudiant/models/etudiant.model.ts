export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  email: string;
  photo?: string;
}

export interface StageActuel {
  id: string;
  nomStage: string;
  hopital: string;
  service: string;
  dateDebut: string;
  dateFin: string;
  encadrant: string;
  statut: 'En cours' | 'Terminé' | 'À venir';
}

export interface Notification {
  id: string;
  type: 'rapport' | 'evaluation' | 'presence' | 'info';
  titre: string;
  message: string;
  date: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface AccueilEtudiantData {
  etudiant: Etudiant;
  stageActuel: StageActuel | null;
  notifications: Notification[];
  dateActuelle: string;
}

// Données mockées (à remplacer par l'API)
export const mockAccueilData: AccueilEtudiantData = {
  etudiant: {
    id: '1',
    nom: 'LAHNIN',
    prenom: 'Sofia',
    matricule: '22253258862',
    email: 'sofialohnin@gmail.com',
    photo: '/img/Acceuil-etudiant.png'
  },
  stageActuel: {
    id: 'stage-1',
    nomStage: 'Chirurgie Cardiaque',
    hopital: 'Hôpital THENIA',
    service: 'Chirurgie',
    dateDebut: '01/10/2025',
    dateFin: '31/10/2025',
    encadrant: 'Dr. Lounès Ahmed',
    statut: 'En cours'
  },
  notifications: [
    {
      id: 'notif-1',
      type: 'rapport',
      titre: 'Rapport à rendre',
      message: 'Le rapport de stage à remettre avant 22/11/2025',
      date: '2025-11-15',
      isRead: false,
      priority: 'high'
    },
    {
      id: 'notif-2',
      type: 'evaluation',
      titre: 'Approximation évaluation',
      message: 'évaluation de Dr. Bennett le 25/11',
      date: '2025-11-18',
      isRead: false,
      priority: 'medium'
    }
  ],
  dateActuelle: new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
};