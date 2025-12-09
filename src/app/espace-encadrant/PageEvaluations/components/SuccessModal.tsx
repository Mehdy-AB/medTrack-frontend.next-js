// Encadrant/PageEvaluations/components/SuccessModal.tsx

"use client";

import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const SuccessModal = ({ isOpen, onClose, message = "Évaluation enregistrée avec succès" }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-500 mb-2">Merci !</h3>
            <p className="text-gray-600">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full px-8 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors font-medium"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;