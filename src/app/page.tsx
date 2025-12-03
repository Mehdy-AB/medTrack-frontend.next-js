"use client";
import Navbar from './Components/Navbar';
import Header from './Components/HeaderProps';
import Footer from './Components/Footer';
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Header spaceName="Acceuil" notificationCount={5} />
      </main>
      <Footer/> 
    </>
  );
}
