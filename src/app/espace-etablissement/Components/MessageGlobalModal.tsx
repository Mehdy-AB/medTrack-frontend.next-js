"use client";

import { useState } from 'react';
import { X, Send, Users, Building } from 'lucide-react';

interface MessageGlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: { message: string; destinataires: string[]; copieAdmin: boolean }) => void;
}

const MessageGlobalModal = ({ isOpen, onClose, onSend }: MessageGlobalModalProps) => {
  const [message, setMessage] = useState('');
  const [destinataires, setDestinataires] = useState<string[]>(['chefs', 'medecins']);
  const [copieAdmin, setCopieAdmin] = useState(true);

  if (!isOpen) return null;

  const handleDestinataireToggle = (dest: string) => {
    setDestinataires(prev => 
      prev.includes(dest) 
        ? prev.filter(d => d !== dest)
        : [...prev, dest]
    );
  };

  const handleSubmit = () => {
    if (message.trim()) {
      onSend({ message, destinataires, copieAdmin });
      setMessage('');
      onClose();
    }
  };

  const getDestinataireLabel = (dest: string) => {
    switch (dest) {
      case 'chefs': return 'Chefs de Service';
      case 'medecins': return 'Médecins Encadrants';
      case 'etudiants': return 'Étudiants';
      default: return dest;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Send className="w-6 h-6 text-teal-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Message Global</h3>
              <p className="text-sm text-gray-500">Envoyer un message à l'ensemble de l'établissement</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Destinataires */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Destinataires
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['chefs', 'medecins', 'etudiants'] as const).map((dest) => (
                <button
                  key={dest}
                  onClick={() => handleDestinataireToggle(dest)}
                  className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    destinataires.includes(dest)
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {dest === 'chefs' && <Building className="w-4 h-4" />}
                  {dest === 'medecins' && <Users className="w-4 h-4" />}
                  {dest === 'etudiants' && <Users className="w-4 h-4" />}
                  {getDestinataireLabel(dest)}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={5}
              placeholder="Écrivez votre message ici..."
              required
            />
          </div>

          {/* Options */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="copieAdmin"
              checked={copieAdmin}
              onChange={(e) => setCopieAdmin(e.target.checked)}
              className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
            />
            <label htmlFor="copieAdmin" className="text-sm text-gray-700">
              Recevoir une copie en tant qu'administrateur
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Envoyer le message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageGlobalModal;