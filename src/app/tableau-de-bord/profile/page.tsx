"use client";

//import Navbar from '../../Components/Navbar';
import NavbarAdmin from '../Components/NavbarAdmin';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
//import Sidebar from '../../Components/Sidebar';
import SidebarAdmin from '../Components/SidebarAdmin';
import Profile from '../../Components/Profile';
import { ProfileData } from '../../../types/profile.types';
import { useRouter } from 'next/navigation';

export default function AdminProfilePage() {
  const router = useRouter();

  const adminData: ProfileData = {
    name: 'Mohammed Rahmoune',
    email: 'admin@university.dz',
    photo: '/img/profil-administrateur.jpg',
    fields: [
      { label: 'Nom complet', value: 'Mohammed Rahmoune', key: 'fullName' },
      { label: 'Matricule', value: 'ADM123456', key: 'matricule' },
      { label: 'Fonction', value: 'Administrateur système', key: 'function' },
      { label: 'Département', value: 'Administration', key: 'department' },
      { label: 'Établissement', value: 'Annexe de Médecine de Boumerdes', key: 'etablissement' },
      { label: 'Email', value: 'admin@university.dz', key: 'email' },
      { label: 'Téléphone', value: '0770123456', key: 'phone' },
    ]
  };

  const handleLogout = () => {
    console.log('Déconnexion admin...');
    // router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <Header spaceName="Tableau de Bord Admin" notificationCount={12} />

      <div className="flex flex-1">
        <SidebarAdmin />
        <Profile data={adminData} onLogout={handleLogout} />
      </div>

      <Footer />
    </div>
  );
}