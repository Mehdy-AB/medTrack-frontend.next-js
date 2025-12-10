"use client";

import { Eye, Download, MessageSquare, Star, FileText } from 'lucide-react';
import { RapportEtudiant } from '../models/rapport.model';

interface RowActionMenuProps {
  rapport: RapportEtudiant;
  isVisible: boolean;
  onClose: () => void;
  onView: (rapport: RapportEtudiant) => void;
  onDownload: (rapport: RapportEtudiant) => void;
  onMessage: (rapport: RapportEtudiant) => void;
  onEvaluate: (rapport: RapportEtudiant) => void;
  onList: (rapport: RapportEtudiant) => void;
}

const RowActionMenu = ({ 
  rapport, 
  isVisible, 
  onClose,
  onView,
  onDownload,
  onMessage,
  onEvaluate,
  onList
}: RowActionMenuProps) => {
  if (!isVisible) return null;

  const handleAction = (action: string) => {
    switch (action) {
      case 'view':
        onView(rapport);
        break;
      case 'download':
        onDownload(rapport);
        break;
      case 'message':
        onMessage(rapport);
        break;
      case 'evaluate':
        onEvaluate(rapport);
        break;
      case 'list':
        onList(rapport);
        break;
    }
    onClose();
  };

  return (
    <div 
      className="absolute left-0 top-full mt-2 bg-gray-800 text-white rounded-xl shadow-xl z-50 py-2 min-w-[220px]"
      onMouseLeave={onClose}
    >
      <button
        onClick={() => handleAction('list')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <FileText className="w-4 h-4" />
        <span>Consulter dans liste</span>
      </button>
      
      <button
        onClick={() => handleAction('evaluate')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <Star className="w-4 h-4" />
        <span>Évaluer</span>
      </button>
      
      <button
        onClick={() => handleAction('view')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <Eye className="w-4 h-4" />
        <span>Consulter le rapport</span>
      </button>
      
      <button
        onClick={() => handleAction('download')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <Download className="w-4 h-4" />
        <span>Télécharger le rapport</span>
      </button>
      
      <button
        onClick={() => handleAction('message')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Envoyer un message</span>
      </button>
    </div>
  );
};

export default RowActionMenu;