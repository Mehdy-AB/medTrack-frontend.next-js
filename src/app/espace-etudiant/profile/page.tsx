"use client";

//import Navbar from '../../Components/Navbar';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
//import Sidebar from '../../Components/Sidebar';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import Profile from '../../Components/Profile';
import { ProfileData } from '../../../types/profile.types';
import { useRouter } from 'next/navigation';

export default function EtudiantProfilePage() {
  const router = useRouter();

  const studentData: ProfileData = {
    name: 'Sofia Lahnin',
    email: 'sofialohnin@gmail.com',
    photo: '/img/profil-etudiant.jpg',
    fields: [
      { label: 'Nom complet', value: 'Sofia Lahnin', key: 'fullName' },
      { label: 'Matricule', value: '22253258862', key: 'matricule' },
      { label: 'Année d\'étude', value: '3ème année', key: 'year' },
      { label: 'Spécialité', value: 'Médecine générale', key: 'specialty' },
      { label: 'Email', value: 'sofialohnin@gmail.com', key: 'email' },
      { label: 'Téléphone', value: '0552986633', key: 'phone' },
    ]
  };

  const handleLogout = () => {
    console.log('Déconnexion étudiant...');
    // router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        <Profile data={studentData} onLogout={handleLogout} />
      </div>
      
      <Footer />
    </div>
  );
}