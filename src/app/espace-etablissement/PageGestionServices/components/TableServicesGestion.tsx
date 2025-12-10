"use client";

import { ChevronUp, ChevronDown, Users, AlertTriangle, Eye, Edit } from 'lucide-react';
import { ServiceHospitalier } from '../models/service.model';
import { useState } from 'react';

interface TableServicesGestionProps {
  services: ServiceHospitalier[];
  onEdit: (service: ServiceHospitalier) => void;
  onViewDetail: (service: ServiceHospitalier) => void;
}

type SortField = keyof ServiceHospitalier;
type SortDirection = 'asc' | 'desc';

const TableServicesGestion = ({ services, onEdit, onViewDetail }: TableServicesGestionProps) => {
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

  const getStatusBadge = (statut: ServiceHospitalier['statut']) => {
    switch (statut) {
      case 'actif':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Actif</span>;
      case 'inactif':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Inactif</span>;
      case 'suspendu':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Suspendu</span>;
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
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {[
              { label: 'Service', field: 'nom' as SortField },
              { label: 'Code', field: 'code' as SortField },
              { label: 'Chef', field: 'chefService' as SortField },
              { label: 'Étudiants', field: 'etudiantsActifs' as SortField },
              { label: 'Occupation', field: 'tauxOccupation' as SortField },
              { label: 'Performance', field: 'performance' as SortField },
              { label: 'Statut', field: 'statut' as SortField },
              { label: 'Actions' }
            ].map(({ label, field }) => (
              <th key={field || label} className="px-4 py-3 text-left">
                {field ? (
                  <button
                    onClick={() => handleSort(field)}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-700 uppercase hover:text-gray-900 group"
                  >
                    {label}
                    <SortIcon field={field} />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-gray-700 uppercase">
                    {label}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedServices.map((service) => (
            <tr key={service.id} className="hover:bg-gray-50 transition-colors">
              {/* Nom du service */}
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{service.nom}</div>
                <div className="text-xs text-gray-500 line-clamp-1">{service.description}</div>
              </td>

              {/* Code */}
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium">
                  {service.code}
                </span>
              </td>

              {/* Chef de service */}
              <td className="px-4 py-3">
                {service.chefService ? (
                  <div className="text-sm text-gray-900">{service.chefService}</div>
                ) : (
                  <div className="flex items-center gap-1 text-orange-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Non assigné
                  </div>
                )}
              </td>

              {/* Étudiants */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">{service.etudiantsActifs}</span>
                  <span className="text-sm text-gray-500">/{service.capaciteMax}</span>
                </div>
              </td>

              {/* Occupation */}
              <td className="px-4 py-3">
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

              {/* Performance */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{service.performance.noteMoyenne.toFixed(1)}</span>
                  <span className="text-sm text-gray-500">/20</span>
                </div>
              </td>

              {/* Statut */}
              <td className="px-4 py-3">
                {getStatusBadge(service.statut)}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewDetail(service)}
                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    title="Voir détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(service)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableServicesGestion;