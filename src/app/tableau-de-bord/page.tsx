"use client";
import Navbar from '../Components/Navbar';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';

export default function EspaceEtudiant() {
  return (
    <>
      <Navbar />
      <main>
        <Header spaceName="Tableau de Bord" notificationCount={2} />
        <Sidebar/>
        {/* Contenu spécifique à l'espace tableau de bord */}
      </main>
      <Footer/> 
    </>
  );
}