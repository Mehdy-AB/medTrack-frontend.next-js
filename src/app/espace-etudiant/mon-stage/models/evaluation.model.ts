export interface Evaluation {
  encadrant: string;
  date: string;
  note: string;
  appreciation: string;
}

export const mockEvaluations: Evaluation[] = [
  {
    encadrant: 'Dr. Lounès Ahmed',
    date: '15/10/2025',
    note: '18/20',
    appreciation: 'Excellent engagement'
  },
  {
    encadrant: 'Dr. Saadi Karima',
    date: '18/10/2025',
    note: '17/20',
    appreciation: 'Bonne maîtrise technique'
  },
  {
    encadrant: 'Dr. Amara Sofiane',
    date: '20/10/2025',
    note: '16/20',
    appreciation: 'Participation active'
  }
];
