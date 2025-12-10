"use client";

import { useState, useEffect } from 'react';
import { X, Building, User, Plus, Trash2 } from 'lucide-react';
import { ChefService, ConfigService, ServiceHospitalier } from '../models/service.model';

interface AjoutServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ConfigService) => void;
  chefsService: ChefService[];
  typeStagesOptions: string[];
  specialitesOptions: string[];
  serviceToEdit?: ServiceHospitalier | null;
  isEditing?: boolean;
}

const AjoutServiceModal = ({
  isOpen,
  onClose,
  onSave,
  chefsService,
  typeStagesOptions,
  specialitesOptions,
  serviceToEdit,
  isEditing = false
}: AjoutServiceModalProps) => {
  const [formData, setFormData] = useState<ConfigService>({
    nom: '',
    code: '',
    description: '',
    chefServiceId: '',
    capaciteMax: 10,
    typeStages: [],
    specialitesAssociees: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        nom: serviceToEdit.nom,
        code: serviceToEdit.code,
        description: serviceToEdit.description,
        chefServiceId: serviceToEdit.chefServiceId || '',
        capaciteMax: serviceToEdit.capaciteMax,
        typeStages: [...serviceToEdit.typeStages],
        specialitesAssociees: [...serviceToEdit.specialitesAssociees]
      });
    } else {
      setFormData({
        nom: '',
        code: '',
        description: '',
        chefServiceId: '',
        capaciteMax: 10,
        typeStages: [],
        specialitesAssociees: []
      });
    }
    setErrors({});
  }, [serviceToEdit, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom du service est obligatoire';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Le code du service est obligatoire';
    } else if (!/^[A-Z0-9-]+$/.test(formData.code)) {
      newErrors.code = 'Le code doit contenir seulement des majuscules, chiffres et tirets';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    }

    if (formData.capaciteMax < 1 || formData.capaciteMax > 100) {
      newErrors.capaciteMax = 'La capacité doit être entre 1 et 100';
    }

    if (formData.typeStages.length === 0) {
      newErrors.typeStages = 'Au moins un type de stage est requis';
    }

    if (formData.specialitesAssociees.length === 0) {
      newErrors.specialitesAssociees = 'Au moins une spécialité est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleAddTypeStage = (type: string) => {
    if (!formData.typeStages.includes(type)) {
      setFormData(prev => ({
        ...prev,
        typeStages: [...prev.typeStages, type]
      }));
    }
  };

  const handleRemoveTypeStage = (type: string) => {
    setFormData(prev => ({
      ...prev,
      typeStages: prev.typeStages.filter(t => t !== type)
    }));
  };

  const handleAddSpecialite = (specialite: string) => {
    if (!formData.specialitesAssociees.includes(specialite)) {
      setFormData(prev => ({
        ...prev,
        specialitesAssociees: [...prev.specialitesAssociees, specialite]
      }));
    }
  };

  const handleRemoveSpecialite = (specialite: string) => {
    setFormData(prev => ({
      ...prev,
      specialitesAssociees: prev.specialitesAssociees.filter(s => s !== specialite)
    }));
  };

  const chefsDisponibles = chefsService.filter(chef => !chef.serviceActuel || chef.id === formData.chefServiceId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <Building className="w-6 h-6 text-teal-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                {isEditing ? 'Modifier le Service' : 'Nouveau Service Hospitalier'}
              </h3>
              <p className="text-sm text-gray-500">
                {isEditing ? 'Modifier les informations du service' : 'Créer un nouveau service médical'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du Service *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.nom ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Chirurgie Cardiaque"
              />
              {errors.nom && (
                <p className="mt-1 text-sm text-red-600">{errors.nom}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code du Service *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.code ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: CHIR-CARD"
              />
              {errors.code && (
                <p className="mt-1 text-sm text-red-600">{errors.code}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={3}
              placeholder="Décrivez le service, ses activités, ses spécialités..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Chef de service et capacité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chef de Service
              </label>
              <select
                value={formData.chefServiceId}
                onChange={(e) => setFormData(prev => ({ ...prev, chefServiceId: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Non assigné</option>
                {chefsDisponibles.map(chef => (
                  <option key={chef.id} value={chef.id}>
                    {chef.nom} - {chef.specialite}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacité Maximale *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.capaciteMax}
                onChange={(e) => setFormData(prev => ({ ...prev, capaciteMax: parseInt(e.target.value) || 1 }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.capaciteMax ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.capaciteMax && (
                <p className="mt-1 text-sm text-red-600">{errors.capaciteMax}</p>
              )}
            </div>
          </div>

          {/* Types de stages */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Types de Stages Proposés *
              </label>
              <span className="text-sm text-gray-500">
                {formData.typeStages.length} sélectionné(s)
              </span>
            </div>
            
            {errors.typeStages && (
              <p className="mb-2 text-sm text-red-600">{errors.typeStages}</p>
            )}

            {/* Tags sélectionnés */}
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.typeStages.map(type => (
                <span
                  key={type}
                  className="px-3 py-1.5 bg-teal-100 text-teal-800 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() => handleRemoveTypeStage(type)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Options disponibles */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {typeStagesOptions.map(type => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => handleAddTypeStage(type)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      formData.typeStages.includes(type)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Spécialités associées */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Spécialités Associées *
              </label>
              <span className="text-sm text-gray-500">
                {formData.specialitesAssociees.length} sélectionnée(s)
              </span>
            </div>
            
            {errors.specialitesAssociees && (
              <p className="mb-2 text-sm text-red-600">{errors.specialitesAssociees}</p>
            )}

            {/* Tags sélectionnés */}
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.specialitesAssociees.map(specialite => (
                <span
                  key={specialite}
                  className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {specialite}
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecialite(specialite)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Options disponibles */}
            <div className="border border-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specialitesOptions.map(specialite => (
                  <button
                    type="button"
                    key={specialite}
                    onClick={() => handleAddSpecialite(specialite)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      formData.specialitesAssociees.includes(specialite)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {specialite}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
            >
              {isEditing ? (
                <>
                  <Building className="w-4 h-4" />
                  Mettre à jour
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Créer le Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjoutServiceModal;