import Navbar from './Components/Navbar';
import Header from './Components/HeaderProps';
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Header spaceName="Espace Encadrant" notificationCount={5} />
      </main>
       
    </>
  );
}
