export interface ProfileField {
  label: string;
  value: string;
  key: string;
  editable?: boolean; // Add this optional property
}

export interface ProfileData {
  name: string;
  email: string;
  photo?: string;
  fields: ProfileField[];
}

export type UserRole = 'etudiant' | 'encadrant' | 'admin';