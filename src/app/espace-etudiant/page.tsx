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
        <Header spaceName="Espace Étudiant" notificationCount={2} />
        <Sidebar />
        {/* Contenu spécifique à l'espace étudiant */}
      </main>
      <Footer/> 
    </>
  );
}