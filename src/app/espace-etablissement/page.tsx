"use client";

import NavbarEtablissement from './Components/NavbarEtablissement';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import SidebarEtablissement from './Components/SidebarEtablissement';
export default function EspaceEtudiant() {
  return (
    <>
      <NavbarEtablissement />
      <main>
        <Header spaceName="Espace Établissement" notificationCount={2} />
        <SidebarEtablissement/>
        {/* Contenu spécifique à l'espace établissement */}
      </main>
      <Footer/> 
    </>
  );
}