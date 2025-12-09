"use client";

import { useState } from 'react';
import { X, FileText, Mail, Download, Check, User } from 'lucide-react';
import { Candidature, MedecinEncadrant } from '../models/candidature.model';

interface CandidatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidature: Candidature;
  medecins: MedecinEncadrant[];
  onAccept: (data: { medecinId: string; message?: string }) => void;
  onReject: (data: { motif: string; envoyerEmail: boolean; message?: string }) => void;
}

const CandidatureModal = ({ 
  isOpen, 
  onClose, 
  candidature, 
  medecins, 
  onAccept, 
  onReject 
}: CandidatureModalProps) => {
  const [action, setAction] = useState<'accept' | 'reject' | null>(null);
  const [selectedMedecin, setSelectedMedecin] = useState('');
  const [motifRefus, setMotifRefus] = useState('');
  const [envoyerEmail, setEnvoyerEmail] = useState(true);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleAccept = () => {
    if (!selectedMedecin) {
      alert('Veuillez sélectionner un médecin encadrant');
      return;
    }
    onAccept({ medecinId: selectedMedecin, message });
    resetForm();
  };

  const handleReject = () => {
    if (!motifRefus.trim()) {
      alert('Veuillez saisir un motif de refus');
      return;
    }
    onReject({ motif: motifRefus, envoyerEmail, message });
    resetForm();
  };

  const resetForm = () => {
    setAction(null);
    setSelectedMedecin('');
    setMotifRefus('');
    setEnvoyerEmail(true);
    setMessage('');
  };

  const disponiblesMedecins = medecins.filter(m => m.disponibilite);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Candidature - {candidature.nom}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informations étudiant */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={candidature.photo}
                  alt={candidature.nom}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{candidature.nom}</h4>
                  <p className="text-sm text-gray-600">{candidature.matricule}</p>
                </div>
              </div>

              <div className="space-y-2">
                <InfoItem label="Université" value={candidature.universite} />
                <InfoItem label="Spécialité" value={candidature.specialite} />
                <InfoItem label="Année d'étude" value={candidature.anneeEtude} />
                <InfoItem label="Date de candidature" value={candidature.dateCandidature} />
                <InfoItem label="Période de stage souhaitée" value={candidature.periodeStage} />
                <InfoItem label="Disponibilités" value={candidature.disponibilites} />
              </div>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Documents</h4>
              <div className="space-y-2">
                {candidature.documents.map((doc, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lettre de motivation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Lettre de motivation</h4>
            <div className="p-4 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-line">{candidature.motivation}</p>
            </div>
          </div>

          {/* Actions */}
          {action ? (
            <div className="border-t pt-6 space-y-6">
              {action === 'accept' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionner un médecin encadrant *
                    </label>
                    <select
                      value={selectedMedecin}
                      onChange={(e) => setSelectedMedecin(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Choisir un médecin...</option>
                      {disponiblesMedecins.map((medecin) => (
                        <option key={medecin.id} value={medecin.id}>
                          {medecin.nom} - {medecin.specialite}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message personnalisé (optionnel)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Message qui sera envoyé à l'étudiant..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAccept}
                      className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Confirmer l'acceptation
                    </button>
                    <button
                      onClick={() => setAction(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motif de refus *
                    </label>
                    <textarea
                      value={motifRefus}
                      onChange={(e) => setMotifRefus(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      rows={3}
                      placeholder="Saisir le motif de refus..."
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="envoyerEmail"
                      checked={envoyerEmail}
                      onChange={(e) => setEnvoyerEmail(e.target.checked)}
                      className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                    />
                    <label htmlFor="envoyerEmail" className="text-sm text-gray-700">
                      Envoyer un email de notification à l'étudiant
                    </label>
                  </div>

                  {envoyerEmail && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message personnalisé
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows={3}
                        placeholder="Message de refus personnalisé..."
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={handleReject}
                      className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Confirmer le refus
                    </button>
                    <button
                      onClick={() => setAction(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-3 pt-6 border-t">
              <button
                onClick={() => setAction('accept')}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Accepter la candidature
              </button>
              <button
                onClick={() => setAction('reject')}
                className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Refuser la candidature
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-sm text-gray-900 font-medium">{value}</p>
  </div>
);

export default CandidatureModal;