"use client";
import NavbarEtudiant from '../espace-etudiant/Components/NavbarEtudiant';
import Header from '../Components/HeaderProps';
import Footer from '../Components/Footer';
import SidebarEtudiant from './Components/SidebarEtudiant';
import { Bell, Calendar, MapPin, Stethoscope } from 'lucide-react';

export default function EspaceEtudiant() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Carte de bienvenue avec photo */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    👋 Bonjour SOFIA LAHNIN,
                  </div>
                  
                  <p className="text-gray-700 text-lg mb-6">
                    Bienvenue sur votre espace de suivi de stage en médecine.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">Aujourdhui :</span>
                      <span>Lundi 20 octobre 2025</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <Stethoscope className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">Stage :</span>
                      <span>Chirurgie Cardiaque</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      <span className="font-medium">Lieu :</span>
                      <span>Hôpital THENIA</span>
                    </div>
                  </div>
                </div>
                
                {/* Image des médecins */}
                <div className="ml-8">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop" 
                    alt="Équipe médicale"
                    className="w-64 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Rappels importants */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-teal-600" />
                Rappels Importants:
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    📄
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-semibold">Rapport à rendre :</span> Le rapport de stage à remettre avant 22/11/2025
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700">
                      <span className="font-semibold">Approximation évaluation :</span> évaluation de Dr. Bennett le 25/11
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer/> 
    </div>
  );
}