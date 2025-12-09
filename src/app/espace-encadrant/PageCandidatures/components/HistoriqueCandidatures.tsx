"use client";

import { X, Check, FileText, Calendar } from 'lucide-react';
import { Decision } from '../models/candidature.model';

interface HistoriqueCandidaturesProps {
  isOpen: boolean;
  onClose: () => void;
  decisions: Decision[];
}

const HistoriqueCandidatures = ({ isOpen, onClose, decisions }: HistoriqueCandidaturesProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Historique des décisions</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {decisions.map((decision) => (
              <div key={decision.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {decision.statut === 'acceptee' ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {decision.statut === 'acceptee' ? 'Acceptation' : 'Refus'}
                      </h4>
                      <p className="text-xs text-gray-500">Candidature #{decision.candidatureId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(decision.dateDecision).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="space-y-2">
                  {decision.medecinAffecte && (
                    <div className="text-sm">
                      <span className="text-gray-600">Médecin affecté : </span>
                      <span className="font-medium text-gray-900">{decision.medecinAffecte}</span>
                    </div>
                  )}
                  
                  {decision.motif && (
                    <div className="text-sm">
                      <span className="text-gray-600">Motif : </span>
                      <span className="text-gray-900">{decision.motif}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span>Email {decision.emailEnvoye ? 'envoyé' : 'non envoyé'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {decisions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucune décision dans l'historique</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoriqueCandidatures;