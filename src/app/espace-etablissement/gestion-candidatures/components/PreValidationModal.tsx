"use client";

import { X, CheckCircle, AlertCircle, FileText, User, Award, Calendar, Building } from 'lucide-react';
import { Candidature } from '../models/candidature.model';
import { useState } from 'react';

interface PreValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidature: Candidature | null;
  onValidate: (id: string, commentaire: string) => void;
}

const PreValidationModal = ({ isOpen, onClose, candidature, onValidate }: PreValidationModalProps) => {
  const [commentaire, setCommentaire] = useState('');
  const [validationReussie, setValidationReussie] = useState(true);

  if (!isOpen || !candidature) return null;

  const handleSubmit = () => {
    if (!validationReussie) {
      alert('La pré-validation ne peut être enregistrée que si tous les critères sont valides.');
      return;
    }
    onValidate(candidature.id, commentaire);
    onClose();
  };

  const verifierDocumentsComplets = () => {
    return candidature.documents.every(doc => doc.statut === 'valide');
  };

  const verifierNiveauEligible = () => {
    // Logique de vérification du niveau
    const niveauValide = ['M1', 'M2', 'D1', 'D2'].includes(candidature.niveauEtude);
    return niveauValide;
  };

  const verifierMoyenne = () => {
    return candidature.etudiant.moyenneGenerale >= 12;
  };

  const calculerScore = () => {
    let score = 0;
    if (verifierDocumentsComplets()) score += 40;
    if (verifierNiveauEligible()) score += 40;
    if (verifierMoyenne()) score += 20;
    return score;
  };

  const criteres = [
    {
      label: 'Documents complets',
      valide: verifierDocumentsComplets(),
      details: `${candidature.documents.filter(d => d.statut === 'valide').length}/${candidature.documents.length} documents valides`,
      poids: 40
    },
    {
      label: 'Niveau d\'étude éligible',
      valide: verifierNiveauEligible(),
      details: `Niveau ${candidature.niveauEtude} ${verifierNiveauEligible() ? 'éligible' : 'non éligible'}`,
      poids: 40
    },
    {
      label: 'Moyenne générale acceptable',
      valide: verifierMoyenne(),
      details: `Moyenne: ${candidature.etudiant.moyenneGenerale}/20 ${verifierMoyenne() ? '✓' : '✗'}`,
      poids: 20
    }
  ];

  const scoreTotal = calculerScore();
  const tousCriteresValides = criteres.every(c => c.valide);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-teal-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Pré-validation Administrative</h3>
              <p className="text-sm text-gray-500">{candidature.etudiant.prenom} {candidature.etudiant.nom}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations candidature */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Stage demandé</div>
              <div className="font-medium text-gray-900">{candidature.annonceTitre}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Service/Hôpital</div>
              <div className="font-medium text-gray-900">
                {candidature.serviceNom} - {candidature.hopitalNom}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Niveau demandé</div>
              <div className="font-medium text-gray-900">{candidature.niveauEtude}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Date soumission</div>
              <div className="font-medium text-gray-900">
                {new Date(candidature.dateSoumission).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>

          {/* Score éligibilité */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium text-blue-800">Score d'Éligibilité</h4>
                  <p className="text-sm text-blue-600">Calculé automatiquement</p>
                </div>
              </div>
              <div className={`text-2xl font-bold ${scoreTotal >= 100 ? 'text-green-600' : 'text-orange-600'}`}>
                {scoreTotal}%
              </div>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${scoreTotal >= 100 ? 'bg-green-500' : 'bg-orange-500'}`}
                style={{ width: `${scoreTotal}%` }}
              />
            </div>
            <div className="text-xs text-blue-600 mt-2">
              Minimum requis: 100% pour pré-valider
            </div>
          </div>

          {/* Critères de validation */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Critères de Pré-validation</h4>
            <div className="space-y-3">
              {criteres.map((critere, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    critere.valide ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {critere.valide ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="font-medium text-gray-900">{critere.label}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {critere.poids} points
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 ml-8">
                    {critere.details}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Documents vérifiés</h4>
            <div className="space-y-2">
              {candidature.documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">{doc.nom}</div>
                      <div className="text-xs text-gray-500">
                        Uploadé le {new Date(doc.dateUpload).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.statut === 'valide' ? 'bg-green-100 text-green-800' :
                    doc.statut === 'invalide' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {doc.statut === 'valide' ? 'Valide' :
                     doc.statut === 'invalide' ? 'Invalide' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commentaire de pré-validation
            </label>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Ajouter un commentaire sur la pré-validation..."
            />
          </div>

          {/* Résultat */}
          <div className={`p-4 rounded-xl ${tousCriteresValides ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-3">
              {tousCriteresValides ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h5 className="font-medium text-green-800">Éligible pour pré-validation</h5>
                    <p className="text-sm text-green-600">
                      Tous les critères sont validés. Vous pouvez pré-valider cette candidature.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <div>
                    <h5 className="font-medium text-red-800">Non éligible</h5>
                    <p className="text-sm text-red-600">
                      Certains critères ne sont pas validés. Corrigez-les avant de pré-valider.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={!tousCriteresValides}
              className={`flex-1 px-6 py-3 text-white rounded-xl transition-colors flex items-center justify-center gap-2 ${
                tousCriteresValides
                  ? 'bg-teal-500 hover:bg-teal-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Pré-valider la Candidature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreValidationModal;