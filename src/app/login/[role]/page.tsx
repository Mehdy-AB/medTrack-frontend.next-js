// app/login/[role]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginForm from '@/app/Components/LoginForm';

const VALID_ROLES = ['etudiant', 'encadrant', 'admin', 'etablissement'];

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const role = params.role as string;

  useEffect(() => {
    // Vérifier si le rôle est valide
    if (!VALID_ROLES.includes(role)) {
      router.push('/choose-role');
    }
  }, [role, router]);

  // Si le rôle n'est pas valide, ne rien afficher (redirection en cours)
  if (!VALID_ROLES.includes(role)) {
    return null;
  }

  return <LoginForm role={role as 'etudiant' | 'encadrant' | 'admin' | 'etablissement'} />;
}