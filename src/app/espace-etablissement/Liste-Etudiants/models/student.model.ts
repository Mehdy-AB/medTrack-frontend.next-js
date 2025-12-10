// Encadrant/PageListe/models/student.model.ts

export interface Student {
  id: string;
  photo: string;
  nom: string;
  matricule: string;
  promotion: string;
  specialite: string;
  stageActuel: string;
  dateDebut: string;
  dateFin: string;
  statut: 'En cours' | 'Terminé' | 'À venir';
  note: number | null;
}

export const mockStudents: Student[] = [
  {
    id: '1',
    photo: '/img/avatar.png',
    nom: 'Sofia Lahnine',
    matricule: '222234567891',
    promotion: 'M1',
    specialite: 'Médecine générale',
    stageActuel: 'Chirurgie Cardiaque(5/h-4/2)',
    dateDebut: '01/01/2024',
    dateFin: '30/06/2024',
    statut: 'En cours',
    note: 15
  },
  {
    id: '2',
    photo: '/img/avatar.png',
    nom: 'Ahmed Benali',
    matricule: '222234567892',
    promotion: 'M2',
    specialite: 'Chirurgie',
    stageActuel: 'Pédiatrie',
    dateDebut: '15/09/2024',
    dateFin: '15/03/2025',
    statut: 'En cours',
    note: 17
  },
  {
    id: '3',
    photo: '/img/avatar.png',
    nom: 'Fatima Zouaoui',
    matricule: '222234567893',
    promotion: 'L3',
    specialite: 'Médecine générale',
    stageActuel: 'Cardiologie',
    dateDebut: '10/02/2024',
    dateFin: '10/08/2024',
    statut: 'Terminé',
    note: 16
  },
  {
    id: '4',
    photo: '/img/avatar.png',
    nom: 'Karim Mansouri',
    matricule: '222234567894',
    promotion: 'M1',
    specialite: 'Neurologie',
    stageActuel: 'Urgences',
    dateDebut: '20/11/2024',
    dateFin: '20/05/2025',
    statut: 'En cours',
    note: null
  },
  {
    id: '5',
    photo: '/img/avatar.png',
    nom: 'Amina Khelifi',
    matricule: '222234567895',
    promotion: 'M2',
    specialite: 'Pédiatrie',
    stageActuel: 'Néonatologie',
    dateDebut: '05/01/2025',
    dateFin: '05/07/2025',
    statut: 'À venir',
    note: null
  },
  {
    id: '6',
    photo: '/img/avatar.png',
    nom: 'Youcef Merabet',
    matricule: '222234567896',
    promotion: 'L3',
    specialite: 'Chirurgie',
    stageActuel: 'Orthopédie',
    dateDebut: '03/03/2024',
    dateFin: '03/09/2024',
    statut: 'Terminé',
    note: 14
  },
  {
    id: '7',
    photo: '/img/avatar.png',
    nom: 'Lynda Bouzid',
    matricule: '222234567897',
    promotion: 'M1',
    specialite: 'Médecine générale',
    stageActuel: 'Médecine interne',
    dateDebut: '12/01/2024',
    dateFin: '12/07/2024',
    statut: 'En cours',
    note: 18
  },
  {
    id: '8',
    photo: '/img/avatar.png',
    nom: 'Riadh Hamidi',
    matricule: '222234567898',
    promotion: 'M2',
    specialite: 'Neurologie',
    stageActuel: 'Neurochirurgie',
    dateDebut: '25/10/2024',
    dateFin: '25/04/2025',
    statut: 'En cours',
    note: 15
  },
  {
    id: '9',
    photo: '/img/avatar.png',
    nom: 'Samira Touati',
    matricule: '222234567899',
    promotion: 'L3',
    specialite: 'Pédiatrie',
    stageActuel: 'Pédiatrie générale',
    dateDebut: '08/02/2024',
    dateFin: '08/08/2024',
    statut: 'Terminé',
    note: 17
  },
  {
    id: '10',
    photo: '/img/avatar.png',
    nom: 'Mehdi Saadoun',
    matricule: '222234567800',
    promotion: 'M1',
    specialite: 'Chirurgie',
    stageActuel: 'Chirurgie viscérale',
    dateDebut: '18/11/2024',
    dateFin: '18/05/2025',
    statut: 'En cours',
    note: null
  },
  {
    id: '11',
    photo: '/img/avatar.png',
    nom: 'Naima Belkacem',
    matricule: '222234567801',
    promotion: 'M2',
    specialite: 'Médecine générale',
    stageActuel: 'Gériatrie',
    dateDebut: '01/12/2024',
    dateFin: '01/06/2025',
    statut: 'En cours',
    note: 16
  },
  {
    id: '12',
    photo: '/img/avatar.png',
    nom: 'Rachid Ferhat',
    matricule: '222234567802',
    promotion: 'L3',
    specialite: 'Neurologie',
    stageActuel: 'Neurologie',
    dateDebut: '15/03/2024',
    dateFin: '15/09/2024',
    statut: 'Terminé',
    note: 13
  }
];