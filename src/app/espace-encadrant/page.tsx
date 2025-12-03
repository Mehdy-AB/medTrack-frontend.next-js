"use client";
import Navbar from '../Components/Navbar';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
export default function EspaceEncadrant() {
  return (
    <>
      <Navbar />
      <main>
        <Header spaceName="Espace Encadrant" notificationCount={5} />
        <Sidebar />
        {/* Contenu spécifique à l'espace encadrant */}
      </main>
      <Footer/> 
    </>
  );
}