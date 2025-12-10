"use client";

import { AlertTriangle } from 'lucide-react';

interface SuppressionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  rapportNom?: string;
  type?: 'individuel' | 'généré';
}

const SuppressionModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  rapportNom,
  type = 'généré' 
}: SuppressionModalProps) => {
  if (!isOpen) return null;

  const getMessage = () => {
    if (type === 'individuel') {
      return "Êtes-vous sûr de vouloir supprimer ce rapport individuel ? Cette action est irréversible.";
    }
    return `Êtes-vous sûr de vouloir supprimer le rapport "${rapportNom}" ? Cette action est irréversible.`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirmer la suppression</h3>
            <p className="text-gray-600">{getMessage()}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppressionModal;