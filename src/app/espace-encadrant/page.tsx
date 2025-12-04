"use client";
import Navbar from './components/Navbar';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import Sidebar from './components/Sidebar';
import { 
  Users,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function EspaceEncadrant() {
  return (
    <>
      <Navbar />
      <Header spaceName="Espace Encadrant" notificationCount={5} />
      
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        {/* Contenu principal */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Cartes statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Étudiants actifs</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">24</h3>
                    <p className="text-teal-600 text-sm mt-1 flex items-center">
                      <TrendingUp size={14} className="mr-1" />
                      +3 ce mois
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Users className="text-teal-600" size={28} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Stages en cours</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">18</h3>
                    <p className="text-blue-600 text-sm mt-1 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      8 services
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="text-blue-600" size={28} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Évaluations en attente</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-2">7</h3>
                    <p className="text-orange-600 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      À compléter
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                    <ClipboardList className="text-orange-600" size={28} />
                  </div>
                </div>
              </div>
            </div>

            {/* Activités récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Activités récentes</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { nom: "Sarah Benali", action: "a soumis son rapport de stage", time: "Il y a 2 heures", color: "teal" },
                    { nom: "Ahmed Krim", action: "a marqué sa présence", time: "Il y a 3 heures", color: "blue" },
                    { nom: "Fatima Zerrouki", action: "a demandé une évaluation", time: "Il y a 5 heures", color: "purple" },
                    { nom: "Karim Mansouri", action: "a terminé son stage", time: "Il y a 1 jour", color: "green" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center text-${activity.color}-600 font-semibold text-sm`}>
                        {activity.nom.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">
                          <span className="font-semibold">{activity.nom}</span> {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                        Voir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Actions rapides</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-teal-200 rounded-xl hover:bg-teal-50 hover:border-teal-300 transition-all text-left">
                    <ClipboardList className="text-teal-600 mb-2" size={24} />
                    <h4 className="font-semibold text-gray-800">Nouvelle évaluation</h4>
                    <p className="text-sm text-gray-500 mt-1">Évaluer un étudiant</p>
                  </button>
                  
                  <button className="p-4 border-2 border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all text-left">
                    <Users className="text-blue-600 mb-2" size={24} />
                    <h4 className="font-semibold text-gray-800">Voir les étudiants</h4>
                    <p className="text-sm text-gray-500 mt-1">Liste complète</p>
                  </button>
                  
                  <button className="p-4 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all text-left">
                    <BookOpen className="text-purple-600 mb-2" size={24} />
                    <h4 className="font-semibold text-gray-800">Gérer les stages</h4>
                    <p className="text-sm text-gray-500 mt-1">Suivre les stages</p>
                  </button>
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