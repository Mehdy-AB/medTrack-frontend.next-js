"use client";

import { useState } from 'react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import { MessageSquare, Clock, Bell, Calendar, ChevronRight, Mail, Send, Inbox, Archive, AlertCircle } from 'lucide-react';

export default function MessagerieEtudiant() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'archived'>('inbox');

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Messagerie" notificationCount={0} />

      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            
            {/* En-tête de la page */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Messagerie Étudiante
                  </h1>
                  <p className="text-gray-600">
                    Communication avec les encadrants et l&apos;administration
                  </p>
                </div>
                
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Fonctionnalité en préparation</span>
                </div>
              </div>
            </div>

            {/* Section principale avec message d'information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Barre d'onglets (simulée) */}
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
                    Boîte de réception
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
                    Messages envoyés
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
                    Archivés
                  </button>
                </div>
              </div>

              {/* Contenu principal - Message d'information */}
              <div className="p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  
                  {/* Icône principale */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-12 h-12 text-teal-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>

                  {/* Titre et description */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Module de Messagerie en Cours de Développement
                  </h2>
                  
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Nous travaillons actuellement à la mise en place d&apos;un système de messagerie 
                    sécurisé et performant pour faciliter vos échanges avec les encadrants de stage 
                    et l&apos;administration universitaire.
                  </p>

                  {/* Boîte d'information détaillée */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-200">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Fonctionnalités prévues
                        </h3>
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Messagerie interne sécurisée avec vos encadrants</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Notifications en temps réel des réponses</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Partage de documents et rapports de stage</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Historique complet des conversations</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <span>Intégration avec votre calendrier de stages</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Timeline de développement */}
                  <div className="mb-10">
                    <h3 className="font-semibold text-gray-900 mb-6 text-center">
                      Calendrier de déploiement
                    </h3>
                    <div className="flex justify-center">
                      <div className="relative">
                        {/* Ligne de timeline */}
                        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200"></div>
                        
                        <div className="flex gap-12 relative">
                          {/* Étape 1 */}
                          <div className="text-center">
                            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold text-sm">✓</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Analyse des besoins</div>
                            <div className="text-xs text-gray-500">Novembre 2025</div>
                          </div>
                          
                          {/* Étape 2 */}
                          <div className="text-center">
                            <div className={`w-8 h-8 ${activeTab === 'inbox' ? 'border-2 border-teal-500' : 'border-2 border-gray-300'} rounded-full flex items-center justify-center mx-auto mb-2 bg-white`}>
                              <span className={`font-bold text-sm ${activeTab === 'inbox' ? 'text-teal-500' : 'text-gray-400'}`}>2</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Développement</div>
                            <div className="text-xs text-gray-500">Decembre 2025</div>
                          </div>
                          
                          {/* Étape 3 */}
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 bg-white">
                              <span className="font-bold text-sm text-gray-400">3</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Tests & Validation</div>
                            <div className="text-xs text-gray-500">Decembre 2025</div>
                          </div>
                          
                          {/* Étape 4 */}
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 bg-white">
                              <span className="font-bold text-sm text-gray-400">4</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Déploiement</div>
                            <div className="text-xs text-gray-500">Janvier 2026</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact alternatif */}
                  <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                    <div className="flex items-center justify-center gap-4">
                      <Mail className="w-6 h-6 text-teal-600" />
                      <div>
                        <p className="text-gray-700">
                          <span className="font-semibold">Solution temporaire : </span>
                          Veuillez contacter vos encadrants directement par email institutionnel
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Les adresses email sont disponibles dans votre espace &apos;Mon Stage&apos;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bouton de retour */}
                  <div className="mt-10">
                    <a
                      href="/espace-etudiant/mon-stage"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium transition-colors"
                    >
                      Retourner à mon espace stage
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* Section informative bas de page */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Vous serez notifié par email lorsque la messagerie sera disponible
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
                  Prévue pour le début du semestre de printemps 2026
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Support</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Questions ? Contactez le support technique à support@medtrack.edu
                </p>
              </div>
            </div>

          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}