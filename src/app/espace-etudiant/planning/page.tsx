"use client";

import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import PlanningCalendar from '@/app/Components/Planning/PlanningCalendar';

export default function PlanningPage() {
  // Exemple de stages de l'étudiant
  const stages = [
    {
      id: '1',
      titre: 'Stage Chirurgie Cardiaque',
      service: 'Chirurgie Cardiaque',
      hopital: 'Hôpital THENIA',
      dateDebut: '2025-10-20',
      dateFin: '2025-11-20',
      encadrant: 'Dr. Bennett',
      color: 'bg-teal-500'
    },
    {
      id: '2',
      titre: 'Stage Pédiatrie',
      service: 'Pédiatrie',
      hopital: 'CHU Blida',
      dateDebut: '2025-12-01',
      dateFin: '2025-12-31',
      encadrant: 'Dr. Martin',
      color: 'bg-blue-500'
    },
    {
      id: '3',
      titre: 'Stage Urgences',
      service: 'Médecine d\'urgence',
      hopital: 'Hôpital Central',
      dateDebut: '2026-01-15',
      dateFin: '2026-02-15',
      encadrant: 'Dr. Dubois',
      color: 'bg-red-500'
    },
    {
      id: '4',
      titre: 'Stage Radiologie',
      service: 'Imagerie Médicale',
      hopital: 'Centre de Radiologie',
      dateDebut: '2026-03-01',
      dateFin: '2026-03-31',
      encadrant: 'Dr. Lambert',
      color: 'bg-purple-500'
    }
  ];

  // Fonction appelée quand on clique sur un stage
  const handleStageClick = (stage: any) => {
    console.log('Stage sélectionné:', stage);
    // Tu peux ajouter ici :
    // - Afficher un modal avec les détails complets du stage
    // - Rediriger vers une page de détails
    // - Afficher une notification
    alert(`Stage: ${stage.titre}\nHôpital: ${stage.hopital}\nDu ${new Date(stage.dateDebut).toLocaleDateString('fr-FR')} au ${new Date(stage.dateFin).toLocaleDateString('fr-FR')}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <PlanningCalendar 
              year={2025}
              stages={stages}
              onStageClick={handleStageClick}
            />
          </div>
        </main>
      </div>
      
      <Footer /> 
    </div>
  );
}