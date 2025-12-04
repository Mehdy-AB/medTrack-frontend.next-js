"use client";
import Navbar from './components/Navbar';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import Sidebar from './components/Sidebar';
import { 
  Users,
  BookOpen,
  ClipboardList,
  Calendar,
  Hospital,
  Bell,
  UserPlus,
  MessageSquare,
  UserCheck
} from 'lucide-react';

export default function EspaceEncadrant() {
  // Données mockées - à remplacer par les données de la base de données
  const encadrantInfo = {
    nom: "Dr.Hamid Achoure",
    role: "Chef de Service Interne",
    photo: "/img/doctor.jpg", // Photo depuis public/img
    dateAujourdhui: "Lundi 20 octobre 2025",
    service: "Médecine Interne",
    hopital: "Thenla"
  };

  const stats = {
    etudiantsActifs: 24,
    stagesEnCours: 6,
    evaluationsAFaire: 4,
    absencesAujourdhui: 2
  };

  const notifications = [
    { id: 1, icon: <UserPlus className="text-teal-600" size={20} />, text: "2 nouveaux étudiants", time: "Il y a 1 heure" },
    { id: 2, icon: <MessageSquare className="text-blue-600" size={20} />, text: "3 messages non lus", time: "Il y a 2 heures" },
    { id: 3, icon: <UserCheck className="text-green-600" size={20} />, text: "Présence marquée pour 4 étudiants", time: "Il y a 3 heures" }
  ];

  return (
    <>
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={5} />
      
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 bg-white p-8">
          <div className="max-w-7xl mx-auto">
            
           {/* Carte de bienvenue avec info du médecin */}
            <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="flex">
                <div className="flex-1 max-w-[70%]">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-4xl">👋</span>
                    <div>
                      <span className="inline-block px-4 py-1 bg-teal-600 text-white rounded-full text-sm font-medium mb-2 inline-block">
                        {encadrantInfo.role}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Bonjour {encadrantInfo.nom},
                      </h2>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg mb-6">
                    Bienvenue sur votre espace de suivi de stage en médecine.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="text-teal-600" size={20} />
                      <span className="text-gray-700 font-medium">
                        Aujourd'hui : {encadrantInfo.dateAujourdhui}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <ClipboardList className="text-teal-600" size={20} />
                      <span className="text-gray-700 font-medium">
                        Service : {encadrantInfo.service}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Hospital className="text-teal-600" size={20} />
                      <span className="text-gray-700 font-medium">
                        Hôpital : {encadrantInfo.hopital}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Photo - Position absolue à droite */}
                <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end pr-8">
                  <img 
                    src="/img/grpmedcin.png" 
                    alt={encadrantInfo.nom}
                    className="h-full max-h-[300px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Cartes statistiques - 4 cartes en ligne */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
                    <Users className="text-teal-600" size={24} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Étudiants actifs</p>
                  <h3 className="text-3xl font-bold text-teal-600">{stats.etudiantsActifs}</h3>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Stages en cours</p>
                  <h3 className="text-3xl font-bold text-blue-600">{stats.stagesEnCours}</h3>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-3">
                    <ClipboardList className="text-orange-600" size={24} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Évaluations à faire</p>
                  <h3 className="text-3xl font-bold text-orange-600">{stats.evaluationsAFaire}</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-3">
                    <UserCheck className="text-red-600" size={24} />
                  </div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Absences aujourd'hui</p>
                  <h3 className="text-3xl font-bold text-red-600">{stats.absencesAujourdhui}</h3>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center space-x-2">
                <Bell className="text-teal-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{notification.text}</p>
                        <p className="text-sm text-gray-500">{notification.time}</p>
                      </div>
                      <button className="text-teal-600 hover:text-teal-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-teal-50 transition-colors">
                        Voir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </>
  );
}