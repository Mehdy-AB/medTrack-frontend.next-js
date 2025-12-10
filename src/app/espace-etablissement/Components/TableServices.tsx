"use client";

import { useState } from 'react';
import { ChevronUp, ChevronDown, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { ServiceData } from '../models/tableau-bord.model';

interface TableServicesProps {
  services: ServiceData[];
}

type SortField = keyof ServiceData;
type SortDirection = 'asc' | 'desc';

const TableServices = ({ services }: TableServicesProps) => {
  const [sortField, setSortField] = useState<SortField>('tauxOccupation');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedServices = [...services].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const getStatusBadge = (statut: ServiceData['statut']) => {
    switch (statut) {
      case 'optimal':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Optimal</span>;
      case 'surcharge':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Surcharge</span>;
      case 'sous-utilise':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Sous-utilisé</span>;
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-30" />;
    
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {[
                { label: 'Service', field: 'nom' as SortField },
                { label: 'Chef de Service', field: 'chefService' as SortField },
                { label: 'Étudiants', field: 'etudiantsActifs' as SortField },
                { label: 'Occupation', field: 'tauxOccupation' as SortField },
                { label: 'Note Moyenne', field: 'noteMoyenne' as SortField },
                { label: 'Présence', field: 'presenceMoyenne' as SortField },
                { label: 'Candidatures', field: 'candidaturesAttente' as SortField },
                { label: 'Statut', field: 'statut' as SortField }
              ].map(({ label, field }) => (
                <th key={field} className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort(field)}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase hover:text-gray-900 group"
                  >
                    {label}
                    <SortIcon field={field} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{service.nom}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {service.chefService}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{service.etudiantsActifs}</span>
                    <span className="text-sm text-gray-500">/{service.capaciteMax}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          service.tauxOccupation < 70 ? 'bg-green-500' :
                          service.tauxOccupation <= 90 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(service.tauxOccupation, 100)}%` }}
                      />
                    </div>
                    <span className={`font-semibold ${
                      service.tauxOccupation < 70 ? 'text-green-600' :
                      service.tauxOccupation <= 90 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {service.tauxOccupation}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{service.noteMoyenne.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">/20</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500"
                        style={{ width: `${service.presenceMoyenne}%` }}
                      />
                    </div>
                    <span className="font-medium text-gray-900">{service.presenceMoyenne}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${
                      service.candidaturesAttente > 10 ? 'text-red-600' :
                      service.candidaturesAttente > 5 ? 'text-orange-600' : 'text-gray-600'
                    }`}>
                      {service.candidaturesAttente}
                    </span>
                    {service.ancienneteMax > 7 && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">
                        +{service.ancienneteMax}j
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(service.statut)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableServices;