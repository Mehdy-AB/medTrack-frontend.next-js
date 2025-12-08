"use client";

import NavbarEtudiant from '../Components/NavbarEtudiant';
import Header from '@/app/Components/HeaderProps';
import Footer from '@/app/Components/Footer';
import SidebarEtudiant from '../Components/SidebarEtudiant';
import TableRapportsHistorique, { RapportHistorique } from './Components/TableRapportsHistorique';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function RapportStagePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [rapportsHistorique, setRapportsHistorique] = useState<RapportHistorique[]>([]);

  // TODO BACKEND: Récupérer l'ID de l'étudiant connecté depuis le contexte/session
  const etudiantId = 'ETU123'; // À remplacer par l'ID réel de l'étudiant connecté

  // TODO BACKEND: Récupérer l'ID du stage en cours depuis la base de données
  const stageId = 'STAGE456'; // À remplacer par l'ID du stage actuel

  // Charger l'historique des rapports au montage du composant
  useEffect(() => {
    fetchRapportsHistorique();
  }, []);

  // TODO BACKEND: Créer l'endpoint GET /api/rapports/historique?etudiantId=XXX
  const fetchRapportsHistorique = async () => {
    try {
      const response = await fetch(`/api/rapports/historique?etudiantId=${etudiantId}`);
      
      if (response.ok) {
        const data = await response.json();
        setRapportsHistorique(data.rapports || []);
      } else {
        console.error('Erreur lors de la récupération de l\'historique');
        // Utiliser des données d'exemple en cas d'erreur (pour le développement)
        setRapportsHistorique([
          {
            date: '12/05/2025',
            nomFichier: 'rapportPediatrie.pdf',
            statut: 'accepté'
          },
          {
            date: '5/01/2025',
            nomFichier: 'rapportCardiologie.pdf',
            statut: 'en attente'
          }
        ]);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      // Données d'exemple pour le développement
      setRapportsHistorique([
        {
          date: '12/05/2025',
          nomFichier: 'rapportPediatrie.pdf',
          statut: 'accepté'
        },
        {
          date: '5/01/2025',
          nomFichier: 'rapportCardiologie.pdf',
          statut: 'en attente'
        }
      ]);
    }
  };

  // Gérer la sélection de fichier
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier que c'est un PDF
      if (file.type === 'application/pdf') {
        // Vérifier la taille (max 10MB)
        if (file.size <= 10 * 1024 * 1024) {
          setSelectedFile(file);
        } else {
          alert('Le fichier est trop volumineux. Taille maximum : 10 MB');
        }
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  // Gérer le drag & drop
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      if (file.size <= 10 * 1024 * 1024) {
        setSelectedFile(file);
      } else {
        alert('Le fichier est trop volumineux. Taille maximum : 10 MB');
      }
    } else {
      alert('Veuillez déposer un fichier PDF');
    }
  };

  /**
   * TODO BACKEND: Créer l'endpoint POST /api/rapports/soumettre
   * 
   * DONNÉES ENVOYÉES (FormData):
   * - rapport: File (PDF)
   * - etudiantId: string
   * - stageId: string
   * - dateSubmission: string (ISO date)
   * 
   * L'API DOIT:
   * 1. Recevoir et valider le fichier PDF
   * 2. Sauvegarder le fichier sur le serveur ou cloud (S3, Cloudinary, etc.)
   * 3. Récupérer l'encadrant_id associé au stageId
   * 4. Créer un enregistrement en base de données:
   *    {
   *      etudiant_id: string,
   *      stage_id: string,
   *      encadrant_id: string,
   *      fichier_url: string,
   *      fichier_nom: string,
   *      date_soumission: Date,
   *      statut: 'en_attente' | 'accepté' | 'refusé',
   *      taille_fichier: number
   *    }
   * 5. Créer une notification pour l'encadrant
   * 6. (Optionnel) Envoyer un email à l'encadrant
   * 
   * RÉPONSE ATTENDUE (succès):
   * {
   *   success: true,
   *   message: "Rapport soumis avec succès",
   *   data: {
   *     rapportId: string,
   *     fileName: string,
   *     fileUrl: string,
   *     uploadedAt: string
   *   }
   * }
   * 
   * RÉPONSE ATTENDUE (erreur):
   * {
   *   success: false,
   *   error: string
   * }
   */
  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // Créer un FormData pour envoyer le fichier
      const formData = new FormData();
      formData.append('rapport', selectedFile);
      formData.append('etudiantId', etudiantId);
      formData.append('stageId', stageId);
      formData.append('dateSubmission', new Date().toISOString());

      // Appel API pour soumettre le rapport
      const response = await fetch('/api/rapports/soumettre', {
        method: 'POST',
        body: formData,
        // Ne pas mettre Content-Type avec FormData, le navigateur le gère automatiquement
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la soumission du rapport');
      }

      // Succès
      alert(`✅ Rapport "${selectedFile.name}" soumis avec succès !
      
Le rapport a été envoyé à votre encadrant pour validation.
Vous recevrez une notification une fois qu'il sera évalué.`);
      
      setSelectedFile(null);
      
      // Recharger l'historique des rapports
      await fetchRapportsHistorique();
      
    } catch (error) {
      console.error('Erreur:', error);
      alert(`❌ Erreur lors de la soumission du rapport.
      
${error instanceof Error ? error.message : 'Veuillez réessayer plus tard.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarEtudiant />
      <Header spaceName="Espace Étudiant" notificationCount={2} />
      
      <div className="flex flex-1">
        <SidebarEtudiant />
        
        <main className="flex-1 ml-6 rounded-2xl p-8 bg-gray-50">
          <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Rapport de stage</h1>

            {/* Bloc de soumission de rapport */}
            <div className="bg-white rounded-lg shadow-md p-8 border-2 border-teal-100">
              {/* Titre avec emoji */}
              <div className="text-center mb-6">
                <p className="text-lg text-gray-700">
                  🩺 Votre rapport est prêt ? Envoyez-le à votre encadrant pour validation.
                </p>
              </div>

              {/* Zone de drag & drop */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 transition-all ${
                  isDragging
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-300 bg-gray-50'
                } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Icône */}
                  <div className={`mb-4 p-4 rounded-full ${
                    selectedFile ? 'bg-green-100' : 'bg-teal-100'
                  }`}>
                    {isUploading ? (
                      <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
                    ) : selectedFile ? (
                      <FileText className="w-12 h-12 text-green-600" />
                    ) : (
                      <Upload className="w-12 h-12 text-teal-600" />
                    )}
                  </div>

                  {/* Texte */}
                  {isUploading ? (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        Envoi en cours...
                      </p>
                      <p className="text-sm text-gray-500">
                        Veuillez patienter
                      </p>
                    </div>
                  ) : selectedFile ? (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-800 mb-2">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-700 font-medium mb-2">
                        Glissez votre rapport ici ou
                      </p>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-teal-600 hover:text-teal-700 font-semibold underline">
                          Browse Files
                        </span>
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Format accepté : PDF uniquement (max 10 MB)
                      </p>
                    </div>
                  )}

                  {/* Input file caché */}
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="mt-6 flex justify-center gap-4">
                {selectedFile && !isUploading && (
                  <>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium shadow-md flex items-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Soumettre
                    </button>
                  </>
                )}
              </div>

              {/* Message d'aide */}
              <div className="mt-6 text-center">
                <p className="text-sm text-teal-600">
                  📎 Glissez votre rapport et soumettez-le pour validation
                </p>
              </div>
            </div>

            {/* Section Historique des rapports */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Historique des rapports soumis
                </h2>
                <span className="text-sm text-gray-500">
                  Aujourd&apos;hui : {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              {/* Tableau d'historique */}
              <TableRapportsHistorique rapports={rapportsHistorique} />

              {/* Message conseil */}
              <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Conseil :</span> Vous pouvez soumettre un nouveau rapport si votre version précédente a été refusée.
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