"use client";

import { X, CheckCircle, AlertCircle, Upload } from 'lucide-react';

// Modal de base
interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Modal de détails étudiant (Image 1 & 2)
interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

export const StudentDetailsModal = ({ isOpen, onClose, student }: StudentDetailsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* En-tête avec actions */}
        <div className="bg-gray-800 text-white rounded-xl p-4 space-y-2">
          <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg w-full text-left transition-colors">
            <span>👤</span> Profil
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg w-full text-left transition-colors">
            <span>⭐</span> Évaluer
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg w-full text-left transition-colors">
            <span>✉️</span> Message
          </button>
        </div>

        {/* Critères d'évaluation */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-900">Critère</h4>
            <h4 className="font-semibold text-gray-900">Note (/20)</h4>
          </div>

          <div className="space-y-3">
            <EvaluationItem label="Assiduité" note={13} />
            <EvaluationItem label="Attitude professionnelle" note={14} />
            <EvaluationItem label="Compétences cliniques" note={16} />
            <EvaluationItem label="Note Moyenne" note={14.5} isAverage />
          </div>

          {/* Actions d'évaluation */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              <Upload className="w-5 h-5" />
              Enregistrer le brouillon
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
              <CheckCircle className="w-5 h-5" />
              Soumettre l'évaluation
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
              <X className="w-5 h-5" />
              Annuler
            </button>
          </div>
        </div>

        {/* Commentaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commentaire
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={4}
            placeholder="Ajouter un commentaire..."
          />
        </div>
      </div>
    </Modal>
  );
};

// Item d'évaluation
const EvaluationItem = ({ label, note, isAverage = false }: any) => (
  <div className={`flex justify-between items-center p-3 rounded-lg ${
    isAverage ? 'bg-primary/10 border border-primary' : 'bg-gray-50'
  }`}>
    <span className={`text-sm ${isAverage ? 'font-semibold text-primary' : 'text-gray-700'}`}>
      {label}
    </span>
    <span className={`text-lg font-bold ${isAverage ? 'text-primary' : 'text-gray-900'}`}>
      {note}
    </span>
  </div>
);

// Modal de succès
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const SuccessModal = ({ isOpen, onClose, message = "Évaluation enregistrée avec succès" }: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary mb-2">Merci !</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          Continuer
        </button>
      </div>
    </Modal>
  );
};

// Modal d'erreur
interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export const ErrorModal = ({ isOpen, onClose, message = "Veuillez remplir tous les critères avant de soumettre" }: ErrorModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
            <X className="w-12 h-12 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-red-500 mb-2">Oops !</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          Continuer
        </button>
      </div>
    </Modal>
  );
};

// Modal de présence (Image 3)
interface PresenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

export const PresenceModal = ({ isOpen, onClose, student }: PresenceModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <div className="bg-gray-800 text-white rounded-xl p-4 space-y-2">
          <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg w-full text-left transition-colors">
            <span>👤</span> Profil
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg w-full text-left transition-colors">
            <span>⭐</span> Évaluer
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-2 rounded-lg w-full text-left transition-colors">
            <span>✉️</span> Message
          </button>
        </div>

        <div className="space-y-3">
          <PresenceOption label="Non marqué" color="gray" />
          <PresenceOption label="Présent" color="green" />
          <PresenceOption label="Absent" color="red" />
          <PresenceOption label="Retard" color="yellow" />
        </div>
      </div>
    </Modal>
  );
};

const PresenceOption = ({ label, color }: any) => (
  <button className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
    <div className={`w-4 h-4 rounded-full bg-${color}-500`} />
    <span className="text-gray-900">{label}</span>
  </button>
);

// Modal d'exportation (Image 4)
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal = ({ isOpen, onClose }: ExportModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exporter un rapport">
      <div className="space-y-6">
        <div className="text-center py-4">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Browse files</p>
          <p className="text-sm text-gray-400">glissez votre fichier ici</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
            Soumettre
          </button>
        </div>
      </div>
    </Modal>
  );
};