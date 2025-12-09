// Encadrant/PageEvaluations/components/RowActionMenu.tsx

"use client";

import { User, Star, Mail } from 'lucide-react';
import { Evaluation } from '../models/evaluation.model';

interface RowActionMenuProps {
  evaluation: Evaluation;
  isVisible: boolean;
  onClose: () => void;
}

const RowActionMenu = ({ evaluation, isVisible, onClose }: RowActionMenuProps) => {
  if (!isVisible) return null;

  const handleAction = (action: string) => {
    console.log(`Action: ${action} for evaluation:`, evaluation);
    onClose();
  };

  return (
    <div 
      className="absolute left-0 top-full mt-2 bg-gray-800 text-white rounded-xl shadow-xl z-50 py-2 min-w-[200px]"
      onMouseLeave={onClose}
    >
      <button
        onClick={() => handleAction('profile')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <User className="w-4 h-4" />
        <span>Profil</span>
      </button>
      
      <button
        onClick={() => handleAction('evaluate')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <Star className="w-4 h-4" />
        <span>Évaluer</span>
      </button>
      
      <button
        onClick={() => handleAction('message')}
        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
      >
        <Mail className="w-4 h-4" />
        <span>Message</span>
      </button>
    </div>
  );
};

export default RowActionMenu;