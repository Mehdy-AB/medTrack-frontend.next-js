"use client";

import { X, Save, CheckCircle, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Evaluation } from '../models/evaluation.model';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: Evaluation;
  onSave: (data: any) => void;
  onSubmit: (data: any) => void;
  onError: () => void;
}

const EvaluationModal = ({ isOpen, onClose, evaluation, onSave, onSubmit, onError }: EvaluationModalProps) => {
  // État initial sauvegardé pour le bouton Annuler
  const [initialState, setInitialState] = useState({
    criteres: {
      assiduite: evaluation.criteres?.assiduite || null,
      attitudePro: evaluation.criteres?.attitudePro || null,
      competencesCliniques: evaluation.criteres?.competencesCliniques || null
    },
    commentaire: evaluation.commentaire || ''
  });

  const [criteres, setCriteres] = useState(initialState.criteres);
  const [commentaire, setCommentaire] = useState(initialState.commentaire);

  // Réinitialiser l'état initial quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      const initial = {
        criteres: {
          assiduite: evaluation.criteres?.assiduite || null,
          attitudePro: evaluation.criteres?.attitudePro || null,
          competencesCliniques: evaluation.criteres?.competencesCliniques || null
        },
        commentaire: evaluation.commentaire || ''
      };
      setInitialState(initial);
      setCriteres(initial.criteres);
      setCommentaire(initial.commentaire);
    }
  }, [isOpen, evaluation]);

  if (!isOpen) return null;

  const handleCritereChange = (critere: string, value: string) => {
    const numValue = value === '' ? null : Number(value);
    // Validation : entre 0 et 20
    if (numValue !== null && (numValue < 0 || numValue > 20)) return;
    setCriteres(prev => ({ ...prev, [critere]: numValue }));
  };

  const calculateAverage = () => {
    const values = [criteres.assiduite, criteres.attitudePro, criteres.competencesCliniques].filter(v => v !== null) as number[];
    if (values.length === 0) return null;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const noteMoyenne = calculateAverage();

  const handleSaveDraft = () => {
    onSave({ criteres, commentaire, noteMoyenne });
  };

  const handleSubmitEvaluation = () => {
    // Vérifier que TOUS les critères sont remplis
    if (criteres.assiduite === null || criteres.attitudePro === null || criteres.competencesCliniques === null) {
      onError(); // Déclencher le modal d'erreur
      return;
    }
    onSubmit({ criteres, commentaire, noteMoyenne });
  };

  // Bouton Annuler : restaurer l'état initial SANS fermer le modal
  const handleReset = () => {
    setCriteres(initialState.criteres);
    setCommentaire(initialState.commentaire);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Évaluation - {evaluation.nom}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info étudiant */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Matricule: <span className="font-semibold text-gray-900">{evaluation.matricule}</span></p>
            <p className="text-sm text-gray-600">Stage: <span className="font-semibold text-gray-900">{evaluation.stage}</span></p>
            <p className="text-sm text-gray-600">Période: <span className="font-semibold text-gray-900">{evaluation.dateDebut} - {evaluation.dateFin}</span></p>
          </div>

          {/* Critères d'évaluation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Critères d'évaluation</h4>

            {/* Assiduité */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Assiduité</span>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={criteres.assiduite ?? ''}
                onChange={(e) => handleCritereChange('assiduite', e.target.value)}
                placeholder="Note /20"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Attitude professionnelle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Attitude professionnelle</span>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={criteres.attitudePro ?? ''}
                onChange={(e) => handleCritereChange('attitudePro', e.target.value)}
                placeholder="Note /20"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Compétences cliniques */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Compétences cliniques</span>
              <input
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={criteres.competencesCliniques ?? ''}
                onChange={(e) => handleCritereChange('competencesCliniques', e.target.value)}
                placeholder="Note /20"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Note Moyenne */}
            <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary rounded-lg">
              <span className="text-sm font-semibold text-primary">Note Moyenne</span>
              <span className="text-lg font-bold text-primary">{noteMoyenne ?? '-'}</span>
            </div>
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire</label>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
              placeholder="Ajouter un commentaire..."
            />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={handleSaveDraft}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              <Save className="w-5 h-5" />
              Enregistrer le brouillon
            </button>
            <button
              onClick={handleSubmitEvaluation}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              Soumettre l'évaluation
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Annuler les modifications
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;