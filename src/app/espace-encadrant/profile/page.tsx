"use client";

import Navbar from '../../Components/Navbar';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import Sidebar from '../../Components/Sidebar'; 
import Profile from '../../Components/Profile';
import { ProfileData } from '../../../types/profile.types';
import { useRouter } from 'next/navigation';

export default function EncadrantProfilePage() {
  const router = useRouter();

  const encadrantData: ProfileData = {
    name: 'Dr. Ahmed Benali',
    email: 'ahmed.benali@hospital.dz',
    photo: '/img/profil-encadrant.jpg',
    fields: [
      { label: 'Nom complet', value: 'Dr. Ahmed Benali', key: 'fullName' },
      { label: 'Matricule', value: 'ENC789456', key: 'matricule' },
      { label: 'Spécialité', value: 'Chirurgie générale', key: 'specialty' },
      { label: 'Service', value: 'Service de Chirurgie', key: 'service' },
      { label: 'Hôpital', value: 'CHU Mustapha Pacha', key: 'hospital' },
      { label: 'Email', value: 'ahmed.benali@hospital.dz', key: 'email' },
      { label: 'Téléphone', value: '0661234567', key: 'phone' },
    ]
  };

  const handleLogout = () => {
    console.log('Déconnexion encadrant...');
    // router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={5} />
      
      <div className="flex flex-1">
        <Sidebar />
        <Profile data={encadrantData} onLogout={handleLogout} />
      </div>
      
      <Footer />
    </div>
  );
}