// espace-chef-service/PageVueGlobale/components/AlertesSection.tsx

"use client";

import { AlertTriangle, Info, Bell } from 'lucide-react';
import { Alerte } from '../models/dashboard.model';

interface AlertesSectionProps {
  alertes: Alerte[];
}

const AlertesSection = ({ alertes }: AlertesSectionProps) => {
  const getAlerteStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
          badge: 'bg-red-500'
        };
      case 'important':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          icon: <Bell className="w-5 h-5 text-orange-600" />,
          badge: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: <Info className="w-5 h-5 text-blue-600" />,
          badge: 'bg-blue-500'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Alertes et notifications</h3>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
          {alertes.filter(a => a.type === 'urgent').length} URGENT
        </span>
      </div>

      <div className="space-y-3">
        {alertes.map((alerte) => {
          const style = getAlerteStyle(alerte.type);
          return (
            <div
              key={alerte.id}
              className={`${style.bg} border ${style.border} rounded-lg p-4 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  {style.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {alerte.titre}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {alerte.date}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {alerte.description}
                  </p>
                  
                  {alerte.action && (
                    <button className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                      {alerte.action} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {alertes.length === 0 && (
        <div className="text-center py-8">
          <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Aucune alerte pour le moment</p>
        </div>
      )}
    </div>
  );
};

export default AlertesSection;