// espace-chef-service/PageVueGlobale/components/PeriodSelector.tsx

"use client";

import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

interface PeriodSelectorProps {
  onPeriodChange: (period: string) => void;
}

const PeriodSelector = ({ onPeriodChange }: PeriodSelectorProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Ce mois');
  const [isOpen, setIsOpen] = useState(false);

  const periods = [
    'Cette semaine',
    'Ce mois',
    'Ce trimestre',
    'Cette année',
    'Personnalisé'
  ];

  const handleSelectPeriod = (period: string) => {
    setSelectedPeriod(period);
    setIsOpen(false);
    onPeriodChange(period);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span>{selectedPeriod}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => handleSelectPeriod(period)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedPeriod === period
                    ? 'text-teal-600 font-medium bg-teal-50'
                    : 'text-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PeriodSelector;