export interface RapportEtudiant {
  id: string;
  etudiantId: string;
  photo: string;
  nom: string;
  matricule: string;
  stage: string;
  periode: string;
  dateSoumission: string;
  typeRapport: 'présence' | 'évaluation' | 'attestation' | 'activité';
  statut: 'complet' | 'incomplet' | 'en_attente';
  documents: string[];
  noteGenerale?: number;
  competences: string[];
  commentaires?: string;
}

export interface RapportGenere {
  id: string;
  nom: string;
  type: 'individuel' | 'groupe' | 'activité';
  dateGeneration: string;
  periodeCouverte: string;
  nbEtudiants: number;
  tailleFichier: string;
  statut: 'généré' | 'en_cours' | 'erreur';
  fichier?: File; // Fichier uploadé par l'utilisateur
  contenu?: string; // Contenu généré
}

export interface ConfigRapport {
  typeRapport: 'individuel' | 'groupe' | 'activité';
  periodeDebut: string;
  periodeFin: string;
  informations: {
    nom: boolean;
    matricule: boolean;
    stage: boolean;
    periode: boolean;
    competences: boolean;
    noteGenerale: boolean;
    commentaires: boolean;
    documents: boolean;
  };
  fichierJoint?: File; // Fichier uploadé
  formatExport: 'pdf' | 'excel' | 'word';
  etudiantsInclus?: string[];
}

export const mockRapportsEtudiants: RapportEtudiant[] = [
  {
    id: '1',
    etudiantId: 'E001',
    photo: '/img/avatar.png',
    nom: 'Sofia Lahnine',
    matricule: '222234567891',
    stage: 'Chirurgie Cardiaque',
    periode: '01/01/2024 - 30/06/2024',
    dateSoumission: '28/06/2024',
    typeRapport: 'évaluation',
    statut: 'complet',
    documents: ['Rapport final.pdf', 'Fiche présence.pdf'],
    noteGenerale: 15,
    competences: ['Chirurgie assistée', 'Diagnostic pré-op', 'Suivi post-op'],
    commentaires: 'Excellent travail, très autonome'
  },
  {
    id: '2',
    etudiantId: 'E002',
    photo: '/img/avatar.png',
    nom: 'Ahmed Benali',
    matricule: '222234567892',
    stage: 'Pédiatrie',
    periode: '15/09/2024 - 15/03/2025',
    dateSoumission: '14/03/2025',
    typeRapport: 'présence',
    statut: 'incomplet',
    documents: ['Fiche présence.pdf'],
    competences: ['Soins pédiatriques', 'Communication parents'],
    commentaires: 'Bon relationnel avec les enfants'
  },
  {
    id: '3',
    etudiantId: 'E003',
    photo: '/img/avatar.png',
    nom: 'Fatima Zouaoui',
    matricule: '222234567893',
    stage: 'Cardiologie',
    periode: '10/02/2024 - 10/08/2024',
    dateSoumission: '09/08/2024',
    typeRapport: 'attestation',
    statut: 'complet',
    documents: ['Attestation.pdf', 'Fiche présence.pdf'],
    noteGenerale: 14,
    competences: ['ECG', 'Suivi tension', 'Éducation patient'],
    commentaires: 'Très rigoureuse dans les procédures'
  },
  {
    id: '4',
    etudiantId: 'E004',
    photo: '/img/avatar.png',
    nom: 'Karim Mansouri',
    matricule: '222234567894',
    stage: 'Urgences',
    periode: '20/11/2024 - 20/05/2025',
    dateSoumission: '19/05/2025',
    typeRapport: 'activité',
    statut: 'en_attente',
    documents: [],
    competences: ['Triage', 'Gestes d\'urgence', 'Rédaction rapports'],
    commentaires: 'Très réactif en situation de crise'
  },
  {
    id: '5',
    etudiantId: 'E005',
    photo: '/img/avatar.png',
    nom: 'Amina Khelifi',
    matricule: '222234567895',
    stage: 'Néonatologie',
    periode: '05/01/2025 - 05/07/2025',
    dateSoumission: '04/07/2025',
    typeRapport: 'évaluation',
    statut: 'complet',
    documents: ['Rapport final.pdf', 'Grille évaluation.pdf'],
    noteGenerale: 16,
    competences: ['Soins néonatals', 'Monitoring', 'Support parental'],
    commentaires: 'Excellente avec les nouveau-nés'
  }
];

export const mockRapportsGeneres: RapportGenere[] = [
  {
    id: 'RG001',
    nom: 'Rapport trimestriel Chirurgie',
    type: 'groupe',
    dateGeneration: '30/06/2024',
    periodeCouverte: '01/04/2024 - 30/06/2024',
    nbEtudiants: 5,
    tailleFichier: '2.4 MB',
    statut: 'généré'
  }
];