"use client";

import { AlertTriangle, Clock, Info, CheckCircle, X, ArrowRight } from 'lucide-react';
import { Alerte } from '../models/tableau-bord.model';
import { useState } from 'react';

interface AlertesUrgentesProps {
  alertes: Alerte[];
  onResolve: (id: string) => void;
}

const AlertesUrgentes = ({ alertes, onResolve }: AlertesUrgentesProps) => {
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const getIcon = (type: Alerte['type']) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'avertissement': return <Clock className="w-5 h-5 text-orange-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: Alerte['type']) => {
    switch (type) {
      case 'urgent': return 'bg-red-50 border-red-200';
      case 'avertissement': return 'bg-orange-50 border-orange-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleResolve = (id: string) => {
    setResolvedIds([...resolvedIds, id]);
    setTimeout(() => onResolve(id), 300);
  };

  const filteredAlertes = alertes.filter(a => !resolvedIds.includes(a.id));

  if (filteredAlertes.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">Alertes</h3>
          </div>
        </div>
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Aucune alerte en attente</p>
          <p className="text-sm text-gray-500 mt-1">Toutes les situations sont sous contrôle</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-gray-900">Alertes nécessitant attention</h3>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          {filteredAlertes.length} en attente
        </span>
      </div>

      <div className="space-y-4">
        {filteredAlertes
          .sort((a, b) => a.priorite - b.priorite)
          .map((alerte) => (
            <div
              key={alerte.id}
              className={`p-4 rounded-lg border ${getBgColor(alerte.type)} transition-all duration-300 ${resolvedIds.includes(alerte.id) ? 'opacity-50 scale-95' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="pt-1">{getIcon(alerte.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{alerte.titre}</h4>
                      {alerte.service && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {alerte.service}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alerte.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{alerte.date}</span>
                      {alerte.priorite === 1 && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">
                          URGENT
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleResolve(alerte.id)}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          Voir toutes les alertes
        </button>
      </div>
    </div>
  );
};

export default AlertesUrgentes;