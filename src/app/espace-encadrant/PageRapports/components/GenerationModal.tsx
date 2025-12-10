"use client";

import { useState, useRef } from 'react';
import { X, Check, Calendar, FileText, Upload, File } from 'lucide-react';
import { ConfigRapport, mockRapportsEtudiants } from '../models/rapport.model';

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (config: ConfigRapport) => void;
}

const GenerationModal = ({ isOpen, onClose, onSubmit }: GenerationModalProps) => {
  const [config, setConfig] = useState<ConfigRapport>({
    typeRapport: 'individuel',
    periodeDebut: '',
    periodeFin: '',
    informations: {
      nom: true,
      matricule: true,
      stage: true,
      periode: true,
      competences: true,
      noteGenerale: true,
      commentaires: true,
      documents: true
    },
    formatExport: 'pdf'
  });

  const [selectedEtudiants, setSelectedEtudiants] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Validation
    if (!config.periodeDebut || !config.periodeFin) {
      alert('Veuillez sélectionner une période');
      return;
    }

    if (config.typeRapport === 'individuel' && selectedEtudiants.length === 0) {
      alert('Veuillez sélectionner au moins un étudiant');
      return;
    }

    // Ajouter le fichier uploadé à la config
    const finalConfig = {
      ...config,
      fichierJoint: uploadedFile || undefined,
      etudiantsInclus: selectedEtudiants
    };

    onSubmit(finalConfig);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
    }
  };

  const handleInformationToggle = (info: keyof typeof config.informations) => {
    setConfig(prev => ({
      ...prev,
      informations: {
        ...prev.informations,
        [info]: !prev.informations[info]
      }
    }));
  };

  const handleEtudiantToggle = (etudiantId: string) => {
    setSelectedEtudiants(prev => 
      prev.includes(etudiantId)
        ? prev.filter(id => id !== etudiantId)
        : [...prev, etudiantId]
    );
  };

  const getInformationLabel = (key: string): string => {
    const labels: Record<string, string> = {
      nom: 'Nom de l\'étudiant',
      matricule: 'Numéro de matricule',
      stage: 'Stage effectué',
      periode: 'Période de stage',
      competences: 'Compétences acquises',
      noteGenerale: 'Note générale',
      commentaires: 'Commentaires',
      documents: 'Documents joints'
    };
    return labels[key] || key;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Générer un rapport personnalisé</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Type de rapport */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Type de rapport *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['individuel', 'groupe', 'activité'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setConfig(prev => ({ ...prev, typeRapport: type }))}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    config.typeRapport === type
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Période */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={config.periodeDebut}
                  onChange={(e) => setConfig(prev => ({ ...prev, periodeDebut: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={config.periodeFin}
                  onChange={(e) => setConfig(prev => ({ ...prev, periodeFin: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sélection des étudiants (si type individuel) */}
          {config.typeRapport === 'individuel' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Sélectionner les étudiants *
              </label>
              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                {mockRapportsEtudiants.map((etudiant) => (
                  <div key={etudiant.id} className="flex items-center p-3 border-b border-gray-100 last:border-0">
                    <input
                      type="checkbox"
                      id={`etudiant-${etudiant.id}`}
                      checked={selectedEtudiants.includes(etudiant.id)}
                      onChange={() => handleEtudiantToggle(etudiant.id)}
                      className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor={`etudiant-${etudiant.id}`} className="ml-3 flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <img
                          src={etudiant.photo}
                          alt={etudiant.nom}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{etudiant.nom}</p>
                          <p className="text-xs text-gray-500">{etudiant.matricule} - {etudiant.stage}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Informations à inclure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Informations à inclure *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(config.informations).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleInformationToggle(key as keyof typeof config.informations)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {getInformationLabel(key)}
                </button>
              ))}
            </div>
          </div>

          {/* Upload de fichier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Joindre un fichier (optionnel)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                uploadedFile
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-gray-50'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
              />
              
              {uploadedFile ? (
                <div className="space-y-2">
                  <File className="w-12 h-12 text-primary mx-auto" />
                  <p className="text-sm font-medium text-gray-900">{fileName}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedFile.size / 1024).toFixed(2)} KB - Cliquez pour changer
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <p className="text-sm font-medium text-gray-700">Cliquez pour uploader un fichier</p>
                  <p className="text-xs text-gray-500">PDF, Word, Excel, TXT (Max 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Format d'export */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Format d'export *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['pdf', 'excel', 'word'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setConfig(prev => ({ ...prev, formatExport: format }))}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${
                    config.formatExport === format
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Générer le rapport
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationModal;