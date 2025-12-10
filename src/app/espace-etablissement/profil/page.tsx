"use client";

import { useState } from 'react';
import NavbarEtablissement from '../components/NavbarEtablissement';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtablissement from '../components/SidebarEtablissement';
import { Building, Mail, Phone, MapPin, Hash, Save, Upload } from 'lucide-react';

export default function ParametresEtablissementPage() {
  // Données de l'établissement
  const [etablissement, setEtablissement] = useState({
    nom: 'CHU Mustapha',
    matricule: 'CHU-MUS-2024-001',
    adresse: 'Rue des Frères Zioua, Alger, Algérie',
    email: 'contact@chumustapha.dz',
    telephone: '023 45 67 89',
    logo: null as File | null,
    logoPreview: '/logos/default-hospital.png'
  });

  // États pour la sauvegarde
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Gestion du téléchargement du logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation: max 2MB
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Le fichier est trop volumineux (max 2MB)' });
      return;
    }

    // Validation: format
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ type: 'error', text: 'Format non supporté. Utilisez JPG ou PNG.' });
      return;
    }

    // Créer une prévisualisation
    const reader = new FileReader();
    reader.onloadend = () => {
      setEtablissement(prev => ({
        ...prev,
        logo: file,
        logoPreview: reader.result as string
      }));
      setMessage({ type: 'success', text: 'Logo téléchargé avec succès' });
    };
    reader.readAsDataURL(file);
  };

  // Gestion des changements de champs
  const handleChange = (field: keyof typeof etablissement, value: string) => {
    setEtablissement(prev => ({ ...prev, [field]: value }));
  };

  // Sauvegarde des paramètres
  const handleSave = () => {
    setSaving(true);
    setMessage(null);

    // Simuler un appel API
    setTimeout(() => {
      console.log('Paramètres sauvegardés:', etablissement);
      setSaving(false);
      setMessage({ type: 'success', text: 'Paramètres sauvegardés avec succès !' });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtablissement />
      <Header spaceName="Paramètres de l'Établissement" notificationCount={0} />
      
      <div className="flex flex-1">
        <SidebarEtablissement />
        
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-teal-100 rounded-xl">
                  <Building className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Paramètres de l'Établissement
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Gérez les informations de votre établissement
                  </p>
                </div>
              </div>

              {/* Message de feedback */}
              {message && (
                <div className={`p-4 rounded-xl mb-6 ${
                  message.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {message.type === 'success' ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )}
                    <span>{message.text}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Logo */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Logo de l'Établissement
                </h2>
                
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden">
                        <img
                          src={etablissement.logoPreview}
                          alt="Logo de l'établissement"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-4">
                      Téléchargez le logo officiel de votre établissement. 
                      Il sera affiché sur tous les documents et interfaces.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Format accepté
                        </label>
                        <p className="text-sm text-gray-600">
                          JPG, PNG (max 2MB)
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recommandations
                        </label>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            <span>Format carré recommandé</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            <span>Fond transparent pour PNG</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            <span>Haute résolution (min 200x200px)</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <label className="block">
                          <div className="mt-2">
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleLogoUpload}
                              className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-medium
                                file:bg-teal-50 file:text-teal-700
                                hover:file:bg-teal-100"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations de l'établissement */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Informations de l'Établissement
                </h2>
                
                <div className="space-y-6">
                  {/* Nom de l'établissement */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      Nom de l'Établissement
                    </label>
                    <div className="p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900">
                      {etablissement.nom}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Ce champ est défini à la création et ne peut pas être modifié
                    </p>
                  </div>

                  {/* Matricule */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Matricule
                    </label>
                    <div className="p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900">
                      {etablissement.matricule}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Identifiant unique de l'établissement
                    </p>
                  </div>

                  {/* Adresse */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Adresse
                    </label>
                    <div className="p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900">
                      {etablissement.adresse}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Adresse officielle de l'établissement
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={etablissement.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="contact@etablissement.dz"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Utilisé pour les communications officielles
                    </p>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      value={etablissement.telephone}
                      onChange={(e) => handleChange('telephone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="023 45 67 89"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Numéro de contact principal
                    </p>
                  </div>
                </div>
              </div>

              {/* Bouton de sauvegarde */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                      saving
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm hover:shadow'
                    }`}
                  >
                    <Save className="w-5 h-5" />
                    {saving ? 'Sauvegarde en cours...' : 'Sauvegarder les modifications'}
                  </button>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Champs non modifiables</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span>Nom de l'établissement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span>Matricule</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                    <span>Adresse</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Champs modifiables</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Email de contact</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Numéro de téléphone</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Logo de l'établissement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}