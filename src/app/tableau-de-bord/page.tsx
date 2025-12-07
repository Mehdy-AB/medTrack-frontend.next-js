"use client";
//import Navbar from '../Components/Navbar';
import NavbarAdmin from './Components/NavbarAdmin';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
//import Sidebar from '../Components/Sidebar';
import SidebarAdmin from './Components/SidebarAdmin';
export default function EspaceEtudiant() {
  return (
    <>
      <NavbarAdmin />
      <main>
        <Header spaceName="Tableau de Bord" notificationCount={2} />
        <SidebarAdmin/>
        {/* Contenu spécifique à l'espace tableau de bord */}
      </main>
      <Footer/> 
    </>
  );
}