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
  note?: number;
}