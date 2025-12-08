export interface Candidature {
  id: string;
  stageId: string;
  titreStage: string;
  hopital: string;
  service: string;
  datePostulation: string;
  statut: 'En attente' | 'Acceptée' | 'Refusée' | 'En cours d\'examen';
  dateReponse?: string;
  commentaire?: string;
  priorite: number; // 1 = premier choix, 2 = deuxième choix, etc.
}

export const mockCandidatures: Candidature[] = [
  {
    id: 'cand-1',
    stageId: 'stage-1',
    titreStage: 'Stage en Chirurgie Cardiaque',
    hopital: 'CHU Mustapha Pacha',
    service: 'Chirurgie Cardiaque',
    datePostulation: '18/10/2025',
    statut: 'En cours d\'examen',
    priorite: 1
  },
  {
    id: 'cand-2',
    stageId: 'stage-2',
    titreStage: 'Stage en Pédiatrie',
    hopital: 'Hôpital DELLES',
    service: 'Pédiatrie',
    datePostulation: '22/10/2025',
    statut: 'Acceptée',
    dateReponse: '25/10/2025',
    commentaire: 'Félicitations ! Votre candidature a été retenue. Merci de vous présenter le premier jour avec vos documents.',
    priorite: 2
  },
  {
    id: 'cand-3',
    stageId: 'stage-5',
    titreStage: 'Stage en Cardiologie',
    hopital: 'CHU Bab El Oued',
    service: 'Cardiologie',
    datePostulation: '05/10/2025',
    statut: 'Refusée',
    dateReponse: '12/10/2025',
    commentaire: 'Malheureusement, toutes les places ont été attribuées. Nous vous encourageons à postuler pour les prochaines sessions.',
    priorite: 3
  }
];