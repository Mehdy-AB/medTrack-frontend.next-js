// Encadrant/PageStageActuel/models/stage.model.ts

export interface Student {
  id: string;
  nom: string;
  photo: string;
}

export interface Encadrant {
  id: string;
  nom: string;
  photo: string;
  isChefService: boolean; // true si c'est le chef de service de l'équipe
}

export interface StageInfo {
  titre: string;
  periode: {
    debut: string;
    fin: string;
  };
  service: string;
  hopital: string;
}

export interface Horaire {
  jour: string;
  heures: string;
}

export interface StageData {
  stageInfo: StageInfo;
  students: Student[];
  encadrants: Encadrant[];
  horaires: Horaire[];
}

// Mock data - à remplacer par les données du backend
export const mockStageData: StageData = {
  stageInfo: {
    titre: 'Stage actuel — Chirurgie générale',
    periode: {
      debut: '01/09/2025',
      fin: '30/09/2025'
    },
    service: 'Chirurgie générale',
    hopital: 'Thenla'
  },
  students: [
    { id: '1', nom: 'Sofia Lahnine', photo: '/img/avatar.png' },
    { id: '2', nom: 'Ahmed Benali', photo: '/img/avatar.png' },
    { id: '3', nom: 'Fatima Zouaoui', photo: '/img/avatar.png' },
    { id: '4', nom: 'Karim Mansouri', photo: '/img/avatar.png' },
    { id: '5', nom: 'Amina Khelifi', photo: '/img/avatar.png' },
    { id: '6', nom: 'Youcef Merabet', photo: '/img/avatar.png' }
  ],
  encadrants: [
    { id: '1', nom: 'Dr.Hamid Achoure', photo: '/img/doctor.jpg', isChefService: true },
    { id: '2', nom: 'Dr.Benslman Nour eddine', photo: '/img/doctor.jpg', isChefService: false }
  ],
  horaires: [
    { jour: 'Samedi', heures: '12:30am-16:30pm' },
    { jour: 'Dimanche', heures: '/' },
    { jour: 'Lundi', heures: '14:30pm-18:30pm' },
    { jour: 'Mardi', heures: '10am-13pm' }
  ]
};