"use client";

import { AlertTriangle } from 'lucide-react';

interface UrgentBadgeProps {
  anciennete: number;
  prioritaire?: boolean;
}

const UrgentBadge = ({ anciennete, prioritaire }: UrgentBadgeProps) => {
  const getColor = () => {
    if (prioritaire) return 'bg-red-500';
    if (anciennete < 3) return 'bg-green-500';
    if (anciennete <= 7) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getText = () => {
    if (prioritaire) return 'URGENT';
    if (anciennete < 3) return 'Nouveau';
    if (anciennete <= 7) return 'À traiter';
    return 'Très ancien';
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${getColor()}`}>
      {prioritaire && <AlertTriangle className="w-3 h-3" />}
      {getText()}
    </div>
  );
};

export default UrgentBadge;