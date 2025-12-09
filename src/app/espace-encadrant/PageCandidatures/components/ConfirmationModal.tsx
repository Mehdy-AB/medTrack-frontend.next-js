"use client";

import { CheckCircle, XCircle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'accept' | 'reject' | 'mass';
  count?: number;
  onConfirm: () => void;
}

const ConfirmationModal = ({ isOpen, onClose, type, count = 1, onConfirm }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case 'accept':
        return {
          icon: CheckCircle,
          title: 'Confirmer l\'acceptation',
          message: `Êtes-vous sûr de vouloir accepter ${count > 1 ? `ces ${count} candidatures` : 'cette candidature'} ?`,
          buttonText: 'Oui, accepter',
          buttonClass: 'bg-green-500 hover:bg-green-600',
          iconColor: 'text-green-500'
        };
      case 'reject':
        return {
          icon: XCircle,
          title: 'Confirmer le refus',
          message: `Êtes-vous sûr de vouloir refuser ${count > 1 ? `ces ${count} candidatures` : 'cette candidature'} ?`,
          buttonText: 'Oui, refuser',
          buttonClass: 'bg-red-500 hover:bg-red-600',
          iconColor: 'text-red-500'
        };
      case 'mass':
        return {
          icon: CheckCircle,
          title: 'Traitement en masse',
          message: `Confirmer le traitement de ${count} candidatures sélectionnées ?`,
          buttonText: 'Confirmer',
          buttonClass: 'bg-primary hover:bg-primary/90',
          iconColor: 'text-primary'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className={`w-20 h-20 ${config.iconColor.replace('text-', 'bg-')} bg-opacity-10 rounded-full flex items-center justify-center`}>
              <Icon className={`w-12 h-12 ${config.iconColor}`} />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h3>
            <p className="text-gray-600">{config.message}</p>
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
              className={`flex-1 px-8 py-3 text-white rounded-xl transition-colors font-medium ${config.buttonClass}`}
            >
              {config.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;