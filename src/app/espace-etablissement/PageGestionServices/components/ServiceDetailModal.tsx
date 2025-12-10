"use client";

import { X, Users, Calendar, Star, Percent, AlertTriangle, UserPlus, Power } from 'lucide-react';
import { ServiceHospitalier, ChefService } from '../models/service.model';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceHospitalier | null;
  chefsService: ChefService[];
  onAssignChef: (serviceId: string, chefId: string) => void;
  onChangeStatut: (statut: 'actif' | 'inactif' | 'suspendu') => void;
}

const ServiceDetailModal = ({
  isOpen,
  onClose,
  service,
  chefsService,
  onAssignChef,
  onChangeStatut
}: ServiceDetailModalProps) => {
  if (!isOpen || !service) return null;

  const chefsDisponibles = chefsService.filter(chef => !chef.serviceActuel || chef.id === service.chefServiceId);

  const getStatutLabel = (statut: ServiceHospitalier['statut']) => {
    switch (statut) {
      case 'actif': return 'Actif';
      case 'inactif': return 'Inactif';
      case 'suspendu': return 'Suspendu';
      default: return 'Inconnu';
    }
  };

  const getStatutColor = (statut: ServiceHospitalier['statut']) => {
    switch (statut) {
      case 'actif': return 'text-green-600 bg-green-100';
      case 'inactif': return 'text-gray-600 bg-gray-100';
      case 'suspendu': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h3 className="font-semibold text-gray-900 text-xl">{service.nom}</h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                {service.code}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatutColor(service.statut)}`}>
                {getStatutLabel(service.statut)}
              </span>
              {!service.chefService && (
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Sans chef
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Description */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Description</h4>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {service.description}
            </p>
          </div>

          {/* Grid d'informations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chef de service */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Chef de Service</h4>
              {service.chefService ? (
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{service.chefService}</div>
                      <div className="text-sm text-gray-500">Matricule: {service.chefServiceId}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <div className="flex-1">
                      <div className="font-medium text-orange-800">Chef non assigné</div>
                      <p className="text-sm text-orange-600 mt-1">
                        Ce service nécessite un chef pour fonctionner normalement
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (chefsDisponibles.length > 0) {
                          onAssignChef(service.id, chefsDisponibles[0].id);
                        }
                      }}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Affecter
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Capacité et occupation */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Capacité & Occupation</h4>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Étudiants actifs</span>
                    <span className="font-semibold text-gray-900">{service.etudiantsActifs}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Capacité maximale</span>
                    <span className="font-semibold text-gray-900">{service.capaciteMax}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Taux d'occupation</span>
                    <span className={`font-bold ${
                      service.tauxOccupation < 70 ? 'text-green-600' :
                      service.tauxOccupation <= 90 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {service.tauxOccupation}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Indicateurs de Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-gray-700">Note Moyenne</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {service.performance.noteMoyenne.toFixed(1)}
                  <span className="text-sm text-gray-500 ml-1">/20</span>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Percent className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-700">Taux de Présence</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {service.performance.tauxPresence}%
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-700">Satisfaction</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {service.performance.tauxSatisfaction}%
                </div>
              </div>
            </div>
          </div>

          {/* Types de stages et spécialités */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Types de Stages</h4>
              <div className="flex flex-wrap gap-2">
                {service.typeStages.map((type, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-teal-100 text-teal-800 rounded-lg text-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Spécialités Associées</h4>
              <div className="flex flex-wrap gap-2">
                {service.specialitesAssociees.map((specialite, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm"
                  >
                    {specialite}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dates et alertes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Dates</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Création</span>
                  <span className="font-medium text-gray-900">{service.dateCreation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Dernière modification</span>
                  <span className="font-medium text-gray-900">{service.dateModification}</span>
                </div>
              </div>
            </div>

            {service.alertes.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Alertes Actives</h4>
                <div className="space-y-2">
                  {service.alertes.map((alerte, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-800 rounded-lg"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm">{alerte}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              {/* Changer statut */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Statut:</span>
                <div className="flex gap-1">
                  {(['actif', 'inactif', 'suspendu'] as const).map(statut => (
                    <button
                      key={statut}
                      onClick={() => onChangeStatut(statut)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        service.statut === statut
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {statut.charAt(0).toUpperCase() + statut.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Affecter chef si nécessaire */}
              {!service.chefService && chefsDisponibles.length > 0 && (
                <button
                  onClick={() => onAssignChef(service.id, chefsDisponibles[0].id)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  Affecter un chef
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;