// Encadrant/PageStageActuel/components/EncadrantCard.tsx

"use client";

import { Encadrant } from '../models/stage.model';

interface EncadrantCardProps {
  encadrant: Encadrant;
}

const EncadrantCard = ({ encadrant }: EncadrantCardProps) => {
  return (
    <div 
      className={`flex items-center space-x-3 p-4 rounded-xl transition-all ${
        encadrant.isChefService 
          ? 'bg-teal-100 border-2 border-teal-500' 
          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
      }`}
    >
      <img 
        src={encadrant.photo} 
        alt={encadrant.nom}
        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
      />
      <div className="flex-1">
        <span className={`font-medium block ${
          encadrant.isChefService ? 'text-teal-700' : 'text-gray-800'
        }`}>
          {encadrant.nom}
        </span>
        {encadrant.isChefService && (
          <span className="text-xs text-teal-600 font-medium">Chef de Service</span>
        )}
      </div>
    </div>
  );
};

export default EncadrantCard;