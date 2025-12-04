export interface ProfileField {
  label: string;
  value: string;
  key: string;
}

export interface ProfileData {
  name: string;
  email: string;
  photo?: string;
  fields: ProfileField[];
}

export type UserRole = 'etudiant' | 'encadrant' | 'admin';