"use client";

import { useState } from 'react';
import NavbarEncadrant from '../components/Navbar';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEncadrant from '../components/Sidebar';
import { MessageSquare, Clock, Users, Calendar, ChevronRight, Mail, Send, Inbox, Archive, AlertCircle, Stethoscope, FileText } from 'lucide-react';

export default function MessagerieEncadrant() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'archived'>('inbox');

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEncadrant />
      <Header spaceName="Messagerie Médicale" notificationCount={0} />

      <div className="flex flex-1">
        <SidebarEncadrant />
        
        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            
            {/* En-tête spécifique encadrant */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Plateforme de Communication Médicale
                  </h1>
                  <p className="text-gray-600">
                    Interface sécurisée pour les échanges professionnels avec les étudiants en stage
                  </p>
                </div>
                
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                  <Stethoscope className="w-5 h-5" />
                  <span className="font-medium">Module en cours d&apos;implémentation</span>
                </div>
              </div>
            </div>

            {/* Section principale */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Barre d'onglets professionnelle */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${
                      activeTab === 'inbox'
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Inbox className="w-5 h-5" />
                    Messages reçus
                    <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      0
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('sent')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${
                      activeTab === 'sent'
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    Communications envoyées
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('archived')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${
                      activeTab === 'archived'
                        ? 'text-teal-600 border-b-2 border-teal-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Archive className="w-5 h-5" />
                    Dossiers archivés
                  </button>
                </div>
              </div>

              {/* Contenu principal adapté aux encadrants */}
              <div className="p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  
                  {/* Icône médicale */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-12 h-12 text-teal-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  {/* Titre et description adaptés */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Système de Communication Médicale en Développement
                  </h2>
                  
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Nous mettons en place une plateforme de communication sécurisée et conforme 
                    aux standards médicaux pour vos échanges professionnels avec les étudiants 
                    en stage sous votre supervision.
                  </p>

                  {/* Boîte d'information spécifique aux encadrants */}
                  <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left border border-blue-100">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Fonctionnalités dédiées aux encadrants médicaux
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Communication sécurisée HIPAA/confidentialité médicale</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Partage sécurisé de dossiers patients (anonymisés)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Évaluation en ligne et feedback structuré</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Gestion des urgences et contacts prioritaires</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Intégration avec les plannings de garde et supervision</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Timeline médicale */}
                  <div className="mb-10">
                    <h3 className="font-semibold text-gray-900 mb-6 text-center">
                      Calendrier de validation médicale
                    </h3>
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200"></div>
                        
                        <div className="flex gap-10 relative">
                          {/* Phase 1 */}
                          <div className="text-center">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold text-sm">✓</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Analyse besoins</div>
                            <div className="text-xs text-gray-500">Nov 2025</div>
                          </div>
                          
                          {/* Phase 2 */}
                          <div className="text-center">
                            <div className={`w-8 h-8 ${activeTab === 'inbox' ? 'border-2 border-teal-500' : 'border-2 border-gray-300'} rounded-full flex items-center justify-center mx-auto mb-2 bg-white`}>
                              <span className={`font-bold text-sm ${activeTab === 'inbox' ? 'text-teal-500' : 'text-gray-400'}`}>2</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Conformité RGPD</div>
                            <div className="text-xs text-gray-500">Déc 2025</div>
                          </div>
                          
                          {/* Phase 3 */}
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 bg-white">
                              <span className="font-bold text-sm text-gray-400">3</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Tests cliniques</div>
                            <div className="text-xs text-gray-500">Jan 2026</div>
                          </div>
                          
                          {/* Phase 4 */}
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 bg-white">
                              <span className="font-bold text-sm text-gray-400">4</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Déploiement</div>
                            <div className="text-xs text-gray-500">Fév 2026</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Protocole temporaire pour encadrants */}
                  <div className="bg-teal-50 rounded-xl p-6 border border-teal-100 mb-8">
                    <div className="flex items-start gap-4">
                      <FileText className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Protocole de communication temporaire
                        </h4>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500 font-bold">•</span>
                            <span>Utiliser les emails institutionnels pour les échanges officiels</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500 font-bold">•</span>
                            <span>Conserver une trace écrite de tous les feedbacks aux étudiants</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500 font-bold">•</span>
                            <span>Respecter la confidentialité des données médicales</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-teal-500 font-bold">•</span>
                            <span>Documenter les évaluations dans le dossier de suivi de stage</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                    <a
                      href="/espace-encadrant/suivi-stages"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      Accéder au suivi des stages
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    
                    <a
                      href="mailto:support-medical@medtrack.edu"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Support technique
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* Sections informatives pour encadrants */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Documentation</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Guides et protocoles de communication disponibles dans votre espace
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Disponibilité</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Prévue pour le début du semestre clinique 2026
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Support Médical</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Assistance dédiée : support-medical@medtrack.edu
                </p>
              </div>
            </div>

            {/* Note importante pour les encadrants */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    Information importante pour les encadrants
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    En attendant la mise en service de la plateforme, veillez à conserver 
                    toutes les communications importantes avec les étudiants dans vos archives 
                    professionnelles, conformément aux exigences de traçabilité médicale.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}