"use client";

import { X, Send, CheckCircle, User, Building, Mail, Phone, AlertCircle } from 'lucide-react';
import { Candidature, Service } from '../models/candidature.model';
import { useState } from 'react';

interface TransmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidatures: Candidature[];
  services: Service[];
  onTransmit: (candidatureIds: string[], serviceId: string, commentaire: string) => void;
}

const TransmissionModal = ({ isOpen, onClose, candidatures, services, onTransmit }: TransmissionModalProps) => {
  const [selectedService, setSelectedService] = useState('');
  const [commentaire, setCommentaire] = useState('');

  if (!isOpen || candidatures.length === 0) return null;

  const handleSubmit = () => {
    if (!selectedService) {
      alert('Veuillez sélectionner un service de destination');
      return;
    }

    const candidatureIds = candidatures.map(c => c.id);
    onTransmit(candidatureIds, selectedService, commentaire);
    onClose();
  };

  const getSelectedService = () => {
    return services.find(s => s.id === selectedService);
  };

  const selectedServiceInfo = getSelectedService();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Send className="w-6 h-6 text-purple-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Transmission aux Services</h3>
              <p className="text-sm text-gray-500">
                {candidatures.length} candidature{candidatures.length > 1 ? 's' : ''} à transmettre
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Liste des candidatures */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Candidatures à transmettre</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {candidatures.map((candidature) => (
                <div key={candidature.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {candidature.etudiant.prenom} {candidature.etudiant.nom}
                      </div>
                      <div className="text-sm text-gray-600">
                        {candidature.annonceTitre}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {candidature.niveauEtude}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sélection du service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service de destination *
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            >
              <option value="">Sélectionner un service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nom} - {service.hopitalNom} (Chef: {service.chefServiceNom})
                </option>
              ))}
            </select>
          </div>

          {/* Informations service sélectionné */}
          {selectedServiceInfo && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Building className="w-5 h-5 text-purple-600" />
                <div>
                  <h5 className="font-medium text-purple-800">{selectedServiceInfo.nom}</h5>
                  <p className="text-sm text-purple-600">{selectedServiceInfo.hopitalNom}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-purple-500 mb-1">Chef de Service</div>
                  <div className="font-medium text-purple-800">{selectedServiceInfo.chefServiceNom}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-500 mb-1">Type de transmission</div>
                  <div className="font-medium text-purple-800">Notification immédiate</div>
                </div>
              </div>
            </div>
          )}

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message pour le chef de service
            </label>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={3}
              placeholder="Ajouter un commentaire pour le chef de service..."
            />
          </div>

          {/* Notification info */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div>
                <h5 className="font-medium text-blue-800">Notification automatique</h5>
                <p className="text-sm text-blue-600">
                  Le chef de service recevra une notification immédiate par email avec la liste des candidatures pré-validées.
                </p>
              </div>
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
              disabled={!selectedService}
              className={`flex-1 px-6 py-3 text-white rounded-xl transition-colors flex items-center justify-center gap-2 ${
                selectedService
                  ? 'bg-purple-500 hover:bg-purple-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              Transmettre au Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransmissionModal;