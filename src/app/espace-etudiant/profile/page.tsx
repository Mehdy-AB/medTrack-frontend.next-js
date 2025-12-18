// ============================================
// app/espace-etudiant/profile/page.tsx
// ============================================
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '../../Components/HeaderProps';
import Footer from '../../Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import Image from 'next/image';
import { Edit2, Upload, FileText, X, Check, Download, Loader2 } from 'lucide-react';
import { profileApi } from '@/services';

interface Document {
  id: string;
  nom: string;
  type: 'CV' | 'Relevé' | 'Attestation' | 'Autre';
  dateUpload: string;
  url: string;
}

export default function EtudiantProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    matricule: '', // From student profile
    year: '',
    specialty: '',
  });

  const [originalData, setOriginalData] = useState(formData);

  const [documents, setDocuments] = useState<Document[]>([]);

  // Fetch user data on mount
  useEffect(() => {
    if (session?.user) {
      const user = session.user as any;

      const userData = {
        first_name: user.first_name || user.name?.split(' ')[0] || '',
        last_name: user.last_name || user.name?.split(' ')[1] || '',
        email: user.email || '',
        phone: user.phone || '',
        matricule: user.id?.substring(0, 8) || '',
        year: '3ème année',
        specialty: 'Médecine générale',
      };

      setFormData(userData);
      setOriginalData(userData);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await profileApi.updateMyProfile({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      });

      setOriginalData(formData);
      setIsEditing(false);
      alert('✅ Profil mis à jour avec succès!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('❌ Erreur lors de la mise à jour du profil');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload du fichier vers le serveur
      const newDoc: Document = {
        id: Date.now().toString(),
        nom: file.name,
        type: 'Autre', // À déterminer selon le type de fichier
        dateUpload: new Date().toLocaleDateString('fr-FR'),
        url: URL.createObjectURL(file)
      };
      setDocuments([...documents, newDoc]);
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="text-teal-500" size={20} />;
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />

      <div className="flex flex-1">
        <SidebarEtudiant />

        <div className="flex-1 ml-6 rounded-2xl p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Section Informations Personnelles */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Mon Profil</h1>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    <Edit2 size={18} />
                    Modifier
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <X size={18} />
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      <Check size={18} />
                      Sauvegarder
                    </button>
                  </div>
                )}
              </div>

              {/* Photo et infos de base */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image
                    src="/img/profil-etudiant.jpg"
                    alt="Sofia Lahnin"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {formData.first_name} {formData.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">{formData.email}</p>
                </div>
              </div>

              {/* Champs du formulaire - DISPOSITION VERTICALE */}
              <div className="space-y-6">
                {/* Nom complet */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Nom complet
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      {formData.fullName}
                    </div>
                  )}
                </div>

                {/* Matricule (non modifiable) */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Matricule
                  </label>
                  <div className="text-base text-gray-800 py-3 px-4 bg-gray-100 rounded-lg border border-gray-200 cursor-not-allowed">
                    {formData.matricule}
                  </div>
                </div>

                {/* Année d'étude */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Année d&apos;étude
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      {formData.year}
                    </div>
                  )}
                </div>

                {/* Spécialité */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Spécialité
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      {formData.specialty}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      {formData.email}
                    </div>
                  )}
                </div>

                {/* Téléphone */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                      {formData.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section Documents */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Pièces justificatives</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Relevés de notes, attestations, CV, etc.
                  </p>
                </div>
                <label className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer">
                  <Upload size={18} />
                  Ajouter un document
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </label>
              </div>

              {/* Liste des documents */}
              {documents.length > 0 ? (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getDocumentIcon(doc.type)}
                        <div>
                          <p className="font-medium text-gray-900">{doc.nom}</p>
                          <p className="text-sm text-gray-500">
                            {doc.type} • Ajouté le {doc.dateUpload}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(doc.url, '_blank')}
                          className="p-2 text-teal-500 hover:bg-teal-50 rounded-lg transition-colors"
                          title="Télécharger"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                  <p>Aucun document ajouté</p>
                  <p className="text-sm mt-1">Cliquez sur &ldquo;Ajouter un document&ldquo; pour commencer</p>
                </div>
              )}
            </div>

            {/* Bouton Déconnexion */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <button
                onClick={handleLogout}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Se déconnecter
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}