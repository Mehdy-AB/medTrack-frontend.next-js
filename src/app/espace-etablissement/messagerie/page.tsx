"use client";

import { useState } from 'react';
import NavbarEtablissement from '../Components/NavbarEtablissement';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtablissement from '../Components/SidebarEtablissement';
import { MessageSquare, Clock, Building2, Calendar, ChevronRight, Mail, Send, Inbox, Archive, AlertCircle, Users, FileText, Bell } from 'lucide-react';

export default function MessagerieEtablissement() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'archived'>('inbox');

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtablissement />
      <Header spaceName="Centre de Communication" notificationCount={0} />

      <div className="flex flex-1">
        <SidebarEtablissement />

        <main className="flex-1 rounded-3xl ml-5 p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">

            {/* En-tête spécifique établissement */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Centre de Communication Institutionnelle
                  </h1>
                  <p className="text-gray-600">
                    Plateforme d&apos;échanges professionnels avec étudiants, encadrants et administration
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">Module en développement</span>
                </div>
              </div>
            </div>

            {/* Section principale */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

              {/* Barre d'onglets institutionnelle */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'inbox'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    <Inbox className="w-5 h-5" />
                    Messages institutionnels
                    <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      0
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('sent')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'sent'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    <Send className="w-5 h-5" />
                    Communications officielles
                  </button>

                  <button
                    onClick={() => setActiveTab('archived')}
                    className={`flex items-center gap-2 px-6 py-4 font-medium ${activeTab === 'archived'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    <Archive className="w-5 h-5" />
                    Archives institutionnelles
                  </button>
                </div>
              </div>

              {/* Contenu principal adapté aux établissements */}
              <div className="p-12 text-center">
                <div className="max-w-2xl mx-auto">

                  {/* Icône institutionnelle */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-teal-50 rounded-full flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-teal-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>

                  {/* Titre et description institutionnels */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Système de Communication Hospitalo-Universitaire en Développement
                  </h2>

                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Nous mettons en place une plateforme de communication centralisée
                    pour optimiser les échanges entre votre établissement, les étudiants
                    en stage, les encadrants médicaux et l&apos;administration universitaire.
                  </p>

                  {/* Boîte d'information spécifique aux établissements */}
                  <div className="bg-teal-50 rounded-xl p-6 mb-8 text-left border border-teal-100">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Fonctionnalités dédiées aux établissements de santé
                        </h3>
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Communication multi-niveaux (direction, services, encadrants)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Gestion centralisée des annonces de stages</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Tableau de bord de suivi des stagiaires par service</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Alertes et notifications institutionnelles</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Archivage automatique des communications officielles</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>Coordination avec l&apos;administration universitaire</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Timeline institutionnelle */}
                  <div className="mb-10">
                    <h3 className="font-semibold text-gray-900 mb-6 text-center">
                      Calendrier de déploiement institutionnel
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
                            <div className="text-sm font-medium text-gray-900">Intégration SI</div>
                            <div className="text-xs text-gray-500">Déc 2025</div>
                          </div>

                          {/* Phase 3 */}
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 bg-white">
                              <span className="font-bold text-sm text-gray-400">3</span>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Tests pilote</div>
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

                  {/* Procédure temporaire pour établissements */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-8">
                    <div className="flex items-start gap-4">
                      <FileText className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Procédure de communication temporaire
                        </h4>
                        <ul className="text-gray-700 space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Utiliser les canaux de communication institutionnels existants</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Coordonner avec le chef de service pour les affectations de stage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Conserver les échanges officiels dans les archives administratives</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Transmettre les annonces de stages via l&apos;interface dédiée</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Suivre les validations de candidatures dans le tableau de bord</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Tableau des interlocuteurs */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 text-center">
                      Interlocuteurs clés pour la gestion des stages
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">Administration centrale</div>
                        <div className="text-gray-600">coordination-stages@universite.dz</div>
                        <div className="text-gray-500 text-xs mt-1">Validation des conventions</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">Chefs de service</div>
                        <div className="text-gray-600">chef-service@etablissement.dz</div>
                        <div className="text-gray-500 text-xs mt-1">Supervision des stagiaires</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="font-medium text-gray-900 mb-1">Support technique</div>
                        <div className="text-gray-600">support-etablissement@medtrack.edu</div>
                        <div className="text-gray-500 text-xs mt-1">Assistance plateforme</div>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action institutionnels */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                    <a
                      href="/espace-etablissement"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium transition-colors"
                    >
                      <Building2 className="w-4 h-4" />
                      Tableau de bord établissement
                      <ChevronRight className="w-4 h-4" />
                    </a>

                    <a
                      href="/espace-etablissement/PageGestionAnnonces"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 font-medium transition-colors"
                    >
                      <Bell className="w-4 h-4" />
                      Gérer les annonces
                    </a>

                    <a
                      href="mailto:support-etablissement@medtrack.edu"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Support administratif
                    </a>
                  </div>

                </div>
              </div>
            </div>

            {/* Sections informatives pour établissements */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Documents institutionnels</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Conventions, procédures et guides administratifs disponibles
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Calendrier académique</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Dates clés des stages et périodes d&apos;évaluation
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Coordination</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Interface avec l&apos;administration universitaire
                </p>
              </div>
            </div>

            {/* Note importante pour les établissements */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    Information administrative importante
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    Toutes les communications relatives aux conventions de stage, aux évaluations
                    et aux validations administratives doivent être conservées dans les archives
                    officielles de l'établissement conformément aux règlements en vigueur.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistiques de communication (simulées) */}
            <div className="mt-6 bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">
                Statistiques de communication (simulation)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">0</div>
                  <div className="text-sm text-gray-600">Messages reçus</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Messages envoyés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">Services actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">Encadrants</div>
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