"use client";

import { useState } from 'react';
import NavbarEncadrant from '../components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEncadrant from '../components/Sidebar';
import Profile from '../../Components/Profile';
import { ProfileData } from '../../../types/profile.types';
import { useRouter } from 'next/navigation';

export default function EncadrantProfilePage() {
  const router = useRouter();
  
  const [phone, setPhone] = useState('0661234567');
  const [email, setEmail] = useState('ahmed.benali@hospital.dz');

  const handleLogout = () => {
    console.log('Déconnexion encadrant...');
    // router.push('/');
  };

  const handleUpdateField = (key: string, value: string) => {
    console.log(`Champ ${key} mis à jour:`, value);
    
    switch (key) {
      case 'phone':
        setPhone(value);
        // TODO: Appel API pour sauvegarder le téléphone
        break;
      case 'email':
        setEmail(value);
        // TODO: Appel API pour sauvegarder l'email
        break;
      default:
        console.log(`Champ ${key} mis à jour:`, value);
    }
  };

  // Données du profil - le rôle est défini par l'administration et non modifiable
  const encadrantData: ProfileData = {
    name: 'Dr. Ahmed Benali',
    email: email,
    photo: '/img/profil-encadrant.jpg',
    fields: [
      { label: 'Nom complet', value: 'Dr. Ahmed Benali', key: 'fullName', editable: false },
      { label: 'Matricule', value: 'ENC789456', key: 'matricule', editable: false },
      { label: 'Spécialité', value: 'Chirurgie générale', key: 'specialty', editable: false },
      { label: 'Service', value: 'Service de Chirurgie', key: 'service', editable: false },
      { label: 'Hôpital', value: 'CHU Mustapha Pacha', key: 'hospital', editable: false },
      { label: 'Rôle', value: 'Chef de service ', key: 'role', editable: false }, // Rôle non modifiable
      { label: 'Téléphone', value: phone, key: 'phone', editable: true },
      { label: 'Email', value: email, key: 'email', editable: true },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEncadrant />
      <Header spaceName="Espace Encadrant" notificationCount={5} />
      
      <div className="flex flex-1">
        <SidebarEncadrant />
        <Profile 
          data={encadrantData} 
          onLogout={handleLogout}
          onUpdateField={handleUpdateField}
        />
      </div>
      
      <Footer />
    </div>
  );
}