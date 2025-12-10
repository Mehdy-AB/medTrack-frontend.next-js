"use client";

import { Building, Users, AlertTriangle, MoreVertical, Edit, Trash2, Eye, UserPlus, Power } from 'lucide-react';
import { ServiceHospitalier } from '../models/service.model';
import { useState } from 'react';

interface ServiceCardProps {
  service: ServiceHospitalier;
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatut: (statut: 'actif' | 'inactif' | 'suspendu') => void;
  onAssignChef: () => void;
}

const ServiceCard = ({ 
  service, 
  onViewDetail, 
  onEdit, 
  onDelete, 
  onChangeStatut,
  onAssignChef 
}: ServiceCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (statut: ServiceHospitalier['statut']) => {
    switch (statut) {
      case 'actif': return 'bg-green-100 text-green-800';
      case 'inactif': return 'bg-gray-100 text-gray-800';
      case 'suspendu': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOccupationColor = (taux: number) => {
    if (taux < 70) return 'bg-green-500';
    if (taux <= 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow relative">
      {/* Badge sans chef */}
      {!service.chefService && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Sans chef
        </div>
      )}

      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building className="w-5 h-5 text-teal-600" />
            <span className="text-sm text-teal-600 font-medium">{service.code}</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{service.nom}</h3>
        </div>
        
        {/* Menu déroulant */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => {
                  onViewDetail();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Voir détails
              </button>
              <button
                onClick={() => {
                  onEdit();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Modifier
              </button>
              {!service.chefService && (
                <button
                  onClick={() => {
                    onAssignChef();
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Affecter chef
                </button>
              )}
              <div className="border-t border-gray-200 my-1"></div>
              <button
                onClick={() => {
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {service.description}
      </p>

      {/* Chef de service */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Chef de service</p>
        {service.chefService ? (
          <p className="text-sm font-medium text-gray-900">{service.chefService}</p>
        ) : (
          <p className="text-sm text-orange-600 italic">Non assigné</p>
        )}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Occupation</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className={`text-lg font-semibold ${getOccupationColor(service.tauxOccupation).replace('bg-', 'text-')}`}>
              {service.tauxOccupation}%
            </span>
            <span className="text-sm text-gray-500">
              ({service.etudiantsActifs}/{service.capaciteMax})
            </span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Performance</div>
          <div className="text-lg font-semibold text-gray-900">
            {service.performance.noteMoyenne.toFixed(1)}/20
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getOccupationColor(service.tauxOccupation)}`}
            style={{ width: `${Math.min(service.tauxOccupation, 100)}%` }}
          />
        </div>
      </div>

      {/* Footer avec statut et spécialités */}
      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.statut)}`}>
          {service.statut.charAt(0).toUpperCase() + service.statut.slice(1)}
        </span>
        
        <div className="text-right">
          <div className="text-xs text-gray-500">
            {service.specialitesAssociees.length} spécialité(s)
          </div>
        </div>
      </div>

      {/* Alertes */}
      {service.alertes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-1">
            {service.alertes.map((alerte, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs"
              >
                {alerte}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;