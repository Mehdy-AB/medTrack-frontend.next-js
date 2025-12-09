"use client";

import { Clock } from 'lucide-react';
import { Horaire } from '../models/stage.model';

interface HoraireCardProps {
  horaires: Horaire[];
}

const HoraireCard = ({ horaires }: HoraireCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="w-5 h-5 text-teal-600" />
        <h2 className="text-xl font-semibold text-gray-900">Horaires</h2>
      </div>
      
      <div className="space-y-3">
        {horaires.map((horaire, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-medium text-gray-700">{horaire.jour}:</span>
            <span className="text-gray-900">{horaire.heures}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoraireCard;