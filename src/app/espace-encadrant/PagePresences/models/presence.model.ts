// src/app/espace-encadrant/PagePresences/models/presence.model.ts

export type PresenceStatus = 'Non marqué' | 'Présent' | 'Absent justifié' | 'Absent non justifié' | 'Retard';

export interface Presence {
  id: string;
  photo: string;
  nom: string;
  matricule: string;
  stage: string;
  date: string;
  statut: PresenceStatus;
}

export const mockPresences: Presence[] = [
  {
    id: '1',
    photo: '/img/avatar.png',
    nom: 'Sofia Lahnine',
    matricule: '222234567891',
    stage: 'Chirurgie Cardiaque',
    date: '12/09/2025',
    statut: 'Présent'
  },
  {
    id: '2',
    photo: '/img/avatar.png',
    nom: 'Ahmed Benali',
    matricule: '222234567892',
    stage: 'Pédiatrie',
    date: '12/09/2025',
    statut: 'Non marqué'
  },
  {
    id: '3',
    photo: '/img/avatar.png',
    nom: 'Fatima Zouaoui',
    matricule: '222234567893',
    stage: 'Cardiologie',
    date: '12/09/2025',
    statut: 'Absent justifié'
  },
  {
    id: '4',
    photo: '/img/avatar.png',
    nom: 'Karim Mansouri',
    matricule: '222234567894',
    stage: 'Urgences',
    date: '12/09/2025',
    statut: 'Retard'
  },
  {
    id: '5',
    photo: '/img/avatar.png',
    nom: 'Amina Khelifi',
    matricule: '222234567895',
    stage: 'Néonatologie',
    date: '12/09/2025',
    statut: 'Présent'
  },
  {
    id: '6',
    photo: '/img/avatar.png',
    nom: 'Youcef Merabet',
    matricule: '222234567896',
    stage: 'Orthopédie',
    date: '12/09/2025',
    statut: 'Non marqué'
  },
  {
    id: '7',
    photo: '/img/avatar.png',
    nom: 'Lynda Bouzid',
    matricule: '222234567897',
    stage: 'Médecine interne',
    date: '12/09/2025',
    statut: 'Présent'
  },
  {
    id: '8',
    photo: '/img/avatar.png',
    nom: 'Riadh Hamidi',
    matricule: '222234567898',
    stage: 'Neurochirurgie',
    date: '12/09/2025',
    statut: 'Absent non justifié'
  }
];