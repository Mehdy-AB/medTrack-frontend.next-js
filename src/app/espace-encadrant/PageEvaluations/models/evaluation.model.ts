// Encadrant/PageEvaluations/models/evaluation.model.ts

export interface Evaluation {
  id: string;
  photo: string;
  nom: string;
  matricule: string;
  stage: string;
  noteMoyenne: number | null;
  dateModification: string;
  dateDebut: string;
  dateFin: string;
  statut: 'À faire' | 'En cours' | 'Finalisée';
  criteres?: {
    assiduite: number | null;
    attitudePro: number | null;
    competencesCliniques: number | null;
  };
  commentaire?: string;
}

export const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    photo: '/img/avatar.png',
    nom: 'Sofia Lahnine',
    matricule: '222234567891',
    stage: 'Chirurgie Cardiaque',
    noteMoyenne: 15,
    dateModification: '05/11/2024',
    dateDebut: '01/01/2024',
    dateFin: '30/06/2024',
    statut: 'Finalisée',
    criteres: {
      assiduite: 13,
      attitudePro: 14,
      competencesCliniques: 16
    },
    commentaire: 'Très bon travail'
  },
  {
    id: '2',
    photo: '/img/avatar.png',
    nom: 'Ahmed Benali',
    matricule: '222234567892',
    stage: 'Pédiatrie',
    noteMoyenne: 13,
    dateModification: '10/11/2024',
    dateDebut: '15/09/2024',
    dateFin: '15/03/2025',
    statut: 'En cours',
    criteres: {
      assiduite: 13,
      attitudePro: null,
      competencesCliniques: null
    }
  },
  {
    id: '3',
    photo: '/img/avatar.png',
    nom: 'Fatima Zouaoui',
    matricule: '222234567893',
    stage: 'Cardiologie',
    noteMoyenne: null,
    dateModification: '-',
    dateDebut: '10/02/2024',
    dateFin: '10/08/2024',
    statut: 'À faire'
  },
  {
    id: '4',
    photo: '/img/avatar.png',
    nom: 'Karim Mansouri',
    matricule: '222234567894',
    stage: 'Urgences',
    noteMoyenne: 14,
    dateModification: '20/11/2024',
    dateDebut: '20/11/2024',
    dateFin: '20/05/2025',
    statut: 'Finalisée',
    criteres: {
      assiduite: 14,
      attitudePro: 15,
      competencesCliniques: 13
    }
  },
  {
    id: '5',
    photo: '/img/avatar.png',
    nom: 'Amina Khelifi',
    matricule: '222234567895',
    stage: 'Néonatologie',
    noteMoyenne: null,
    dateModification: '-',
    dateDebut: '05/01/2025',
    dateFin: '05/07/2025',
    statut: 'À faire'
  },
  {
    id: '6',
    photo: '/img/avatar.png',
    nom: 'Youcef Merabet',
    matricule: '222234567896',
    stage: 'Orthopédie',
    noteMoyenne: 16,
    dateModification: '03/09/2024',
    dateDebut: '03/03/2024',
    dateFin: '03/09/2024',
    statut: 'Finalisée',
    criteres: {
      assiduite: 16,
      attitudePro: 17,
      competencesCliniques: 15
    }
  },
  {
    id: '7',
    photo: '/img/avatar.png',
    nom: 'Lynda Bouzid',
    matricule: '222234567897',
    stage: 'Médecine interne',
    noteMoyenne: 14.5,
    dateModification: '12/11/2024',
    dateDebut: '12/01/2024',
    dateFin: '12/07/2024',
    statut: 'En cours',
    criteres: {
      assiduite: 14,
      attitudePro: 15,
      competencesCliniques: null
    }
  },
  {
    id: '8',
    photo: '/img/avatar.png',
    nom: 'Riadh Hamidi',
    matricule: '222234567898',
    stage: 'Neurochirurgie',
    noteMoyenne: null,
    dateModification: '-',
    dateDebut: '25/10/2024',
    dateFin: '25/04/2025',
    statut: 'À faire'
  },
  {
    id: '9',
    photo: '/img/avatar.png',
    nom: 'Samira Touati',
    matricule: '222234567899',
    stage: 'Pédiatrie générale',
    noteMoyenne: 17,
    dateModification: '08/08/2024',
    dateDebut: '08/02/2024',
    dateFin: '08/08/2024',
    statut: 'Finalisée',
    criteres: {
      assiduite: 17,
      attitudePro: 18,
      competencesCliniques: 16
    }
  },
  {
    id: '10',
    photo: '/img/avatar.png',
    nom: 'Mehdi Saadoun',
    matricule: '222234567800',
    stage: 'Chirurgie viscérale',
    noteMoyenne: 13,
    dateModification: '18/11/2024',
    dateDebut: '18/11/2024',
    dateFin: '18/05/2025',
    statut: 'En cours',
    criteres: {
      assiduite: 13,
      attitudePro: null,
      competencesCliniques: null
    }
  }
];