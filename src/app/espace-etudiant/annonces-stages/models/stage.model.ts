export interface AnnonceStage {
  id: string;
  titre: string;
  hopital: string;
  service: string; // Service concerné
  specialite: string;
  dateDebut: string;
  dateFin: string;
  duree: string; // Durée
  description: string; // Description
  prerequis: string[];
  nombrePlaces: number; // Nombre de places
  placesRestantes: number;
  datePublication: string;
  dateLimite: string;
  statut: 'Ouvert' | 'Fermé' | 'Bientôt';
  // Pas besoin de postulants ici, on gère ça côté backend
}

export const mockAnnoncesStages: AnnonceStage[] = [
  {
    id: 'stage-1',
    titre: 'Stage en Chirurgie Cardiaque',
    hopital: 'Hôpital THENIA',
    service: 'Chirurgie Cardiaque',
    specialite: 'Chirurgie',
    dateDebut: '01/12/2025',
    dateFin: '31/12/2025',
    duree: '1 mois',
    description: 'Stage d\'observation et d\'apprentissage en chirurgie cardiaque. Participation aux consultations et aux interventions sous supervision.',
    prerequis: ['3ème année médecine', 'Carnet de vaccination à jour', 'Assurance responsabilité civile'],
    nombrePlaces: 5,
    placesRestantes: 2,
    datePublication: '15/10/2025',
    dateLimite: '25/11/2025',
    statut: 'Ouvert'
  },
  {
    id: 'stage-2',
    titre: 'Stage en Pédiatrie',
    hopital: 'Hôpital DELLES',
    service: 'Pédiatrie',
    specialite: 'Pédiatrie',
    dateDebut: '15/01/2026',
    dateFin: '15/02/2026',
    duree: '1 mois',
    description: 'Stage clinique en pédiatrie générale. Suivi des consultations, garde aux urgences pédiatriques.',
    prerequis: ['4ème année médecine', 'Stage en médecine générale validé'],
    nombrePlaces: 8,
    placesRestantes: 5,
    datePublication: '20/10/2025',
    dateLimite: '10/12/2025',
    statut: 'Ouvert'
  },
  {
    id: 'stage-3',
    titre: 'Stage aux Urgences',
    hopital: 'Hôpital BORDJ MENAIL',
    service: 'Médecine d\'Urgence',
    specialite: 'Urgences',
    dateDebut: '01/01/2026',
    dateFin: '31/01/2026',
    duree: '1 mois',
    description: 'Stage intensif aux urgences. Gestion des cas urgents, triage, premiers soins.',
    prerequis: ['5ème année médecine', 'Formation AFGSU niveau 2'],
    nombrePlaces: 6,
    placesRestantes: 0,
    datePublication: '10/10/2025',
    dateLimite: '15/11/2025',
    statut: 'Fermé'
  },
  {
    id: 'stage-4',
    titre: 'Stage en Médecine Interne',
    hopital: 'Hôpital BORDJ MENAIL',
    service: 'Médecine Interne',
    specialite: 'Médecine Interne',
    dateDebut: '01/03/2026',
    dateFin: '31/03/2026',
    duree: '1 mois',
    description: 'Stage en médecine interne avec focus sur les pathologies complexes et chroniques.',
    prerequis: ['4ème année médecine'],
    nombrePlaces: 10,
    placesRestantes: 10,
    datePublication: '25/10/2025',
    dateLimite: '15/02/2026',
    statut: 'Bientôt'
  }
];

// Interface simplifiée pour les postulations
export interface Postulation {
  id: string;
  stageId: string;
  etudiantId: string;
  datePostulation: string;
}