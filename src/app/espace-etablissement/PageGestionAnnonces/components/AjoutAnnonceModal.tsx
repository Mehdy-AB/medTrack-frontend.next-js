"use client";

import { useState, useEffect } from 'react';
import { X, Calendar, Users, MapPin, FileText, Tag, Check, AlertCircle, Clock } from 'lucide-react';
import { ConfigAnnonce, Hopital, Encadrant, AnnonceStage } from '../models/annonce.model';

interface AjoutAnnonceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ConfigAnnonce) => void;
  services: Array<{ id: string; nom: string; chefId: string | null }>;
  hopitaux: Hopital[];
  encadrants: Encadrant[];
  typeStageOptions: string[];
  specialitesOptions: string[];
  tagOptions: string[];
  annonceToEdit?: AnnonceStage;
  isEditing?: boolean;
  annonces: AnnonceStage[]; // Pour vérifier les conflits
}

const AjoutAnnonceModal = ({
  isOpen,
  onClose,
  onSave,
  services,
  hopitaux,
  encadrants,
  typeStageOptions,
  specialitesOptions,
  tagOptions,
  annonceToEdit,
  isEditing = false,
  annonces
}: AjoutAnnonceModalProps) => {
  const [formData, setFormData] = useState<ConfigAnnonce>({
    titre: '',
    description: '',
    serviceId: '',
    hopitalId: '',
    dateDebut: '',
    dateFin: '',
    dateLimiteCandidature: '',
    placesTotal: 5,
    chefServiceId: '',
    encadrantsIds: [],
    tags: [],
    typeStage: '',
    specialitesRequerues: [],
    prerequis: [],
    publierImmediatement: false,
    horaireQuotidien: {
      heureDebut: '08:00',
      heureFin: '17:00',
      pauseDejeuner: {
        heureDebut: '12:00',
        heureFin: '13:00'
      },
      joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prerequisInput, setPrerequisInput] = useState('');
  const [conflits, setConflits] = useState<string[]>([]);

  useEffect(() => {
    if (annonceToEdit) {
      setFormData({
        titre: annonceToEdit.titre,
        description: annonceToEdit.description,
        serviceId: annonceToEdit.serviceId,
        hopitalId: annonceToEdit.hopitalId,
        dateDebut: annonceToEdit.dateDebut,
        dateFin: annonceToEdit.dateFin,
        dateLimiteCandidature: annonceToEdit.dateLimiteCandidature,
        placesTotal: annonceToEdit.placesTotal,
        chefServiceId: annonceToEdit.chefServiceId,
        encadrantsIds: annonceToEdit.encadrants.map(e => e.id),
        tags: annonceToEdit.tags || [],
        typeStage: annonceToEdit.typeStage || '',
        specialitesRequerues: annonceToEdit.specialitesRequerues || [],
        prerequis: annonceToEdit.prerequis || [],
        publierImmediatement: false,
        horaireQuotidien: annonceToEdit.horaireQuotidien
      });
    } else {
      setFormData({
        titre: '',
        description: '',
        serviceId: '',
        hopitalId: '',
        dateDebut: '',
        dateFin: '',
        dateLimiteCandidature: '',
        placesTotal: 5,
        chefServiceId: '',
        encadrantsIds: [],
        tags: [],
        typeStage: '',
        specialitesRequerues: [],
        prerequis: [],
        publierImmediatement: false,
        horaireQuotidien: {
          heureDebut: '08:00',
          heureFin: '17:00',
          pauseDejeuner: {
            heureDebut: '12:00',
            heureFin: '13:00'
          },
          joursTravail: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
        }
      });
    }
    setErrors({});
    setConflits([]);
  }, [annonceToEdit, isOpen]);

  // Vérifier les conflits en temps réel
  useEffect(() => {
    const newConflits: string[] = [];

    // Vérifier conflit chef de service
    if (formData.chefServiceId) {
      const conflitChef = annonces.filter(a => 
        a.statut !== 'clôturée' && 
        a.statut !== 'archivée' &&
        a.chefServiceId === formData.chefServiceId &&
        !(isEditing && annonceToEdit?.id === a.id)
      );

      if (conflitChef.length > 0) {
        newConflits.push('Ce chef de service a déjà un stage actif');
      }
    }

    // Vérifier conflit de dates
    if (formData.serviceId && formData.dateDebut && formData.dateFin) {
      const dateDebut = new Date(formData.dateDebut);
      const dateFin = new Date(formData.dateFin);
      
      const conflitDates = annonces.filter(a => 
        a.statut !== 'clôturée' && 
        a.statut !== 'archivée' &&
        a.serviceId === formData.serviceId &&
        !(isEditing && annonceToEdit?.id === a.id) &&
        (
          (dateDebut >= new Date(a.dateDebut) && dateDebut <= new Date(a.dateFin)) ||
          (dateFin >= new Date(a.dateDebut) && dateFin <= new Date(a.dateFin)) ||
          (dateDebut <= new Date(a.dateDebut) && dateFin >= new Date(a.dateFin))
        )
      );

      if (conflitDates.length > 0) {
        newConflits.push('Conflit de dates avec un stage existant dans ce service');
      }
    }

    setConflits(newConflits);
  }, [formData.chefServiceId, formData.serviceId, formData.dateDebut, formData.dateFin, annonces, isEditing, annonceToEdit]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const maintenant = new Date();

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est obligatoire';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    }

    if (!formData.serviceId) {
      newErrors.serviceId = 'Le service est obligatoire';
    }

    if (!formData.hopitalId) {
      newErrors.hopitalId = "L'hôpital est obligatoire";
    }

    if (!formData.dateDebut) {
      newErrors.dateDebut = 'La date de début est obligatoire';
    }

    if (!formData.dateFin) {
      newErrors.dateFin = 'La date de fin est obligatoire';
    }

    if (!formData.dateLimiteCandidature) {
      newErrors.dateLimiteCandidature = 'La date limite est obligatoire';
    }

    if (formData.placesTotal < 1) {
      newErrors.placesTotal = 'Le nombre de places doit être au moins 1';
    }

    if (!formData.chefServiceId) {
      newErrors.chefServiceId = 'Le chef de service est obligatoire';
    }

    if (!formData.typeStage) {
      newErrors.typeStage = 'Le type de stage est obligatoire';
    }

    // Validation des dates
    if (formData.dateDebut && formData.dateFin) {
      const dateDebut = new Date(formData.dateDebut);
      const dateFin = new Date(formData.dateFin);
      
      if (dateFin <= dateDebut) {
        newErrors.dateFin = 'La date de fin doit être après la date de début';
      }
    }

    if (formData.dateLimiteCandidature && formData.dateDebut) {
      const dateLimite = new Date(formData.dateLimiteCandidature);
      const dateDebut = new Date(formData.dateDebut);
      
      if (dateLimite >= dateDebut) {
        newErrors.dateLimiteCandidature = 'La date limite doit être avant la date de début du stage';
      }
    }

    // Validation horaire
    if (formData.horaireQuotidien.heureDebut >= formData.horaireQuotidien.heureFin) {
      newErrors.heureFin = "L'heure de fin doit être après l'heure de début";
    }

    if (formData.horaireQuotidien.joursTravail.length === 0) {
      newErrors.joursTravail = 'Au moins un jour de travail est requis';
    }

    // Vérifier conflits
    if (conflits.length > 0) {
      newErrors.conflits = conflits.join(', ');
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

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleAddSpecialite = (specialite: string) => {
    if (!formData.specialitesRequerues.includes(specialite)) {
      setFormData(prev => ({
        ...prev,
        specialitesRequerues: [...prev.specialitesRequerues, specialite]
      }));
    }
  };

  const handleRemoveSpecialite = (specialite: string) => {
    setFormData(prev => ({
      ...prev,
      specialitesRequerues: prev.specialitesRequerues.filter(s => s !== specialite)
    }));
  };

  const handleAddPrerequis = () => {
    if (prerequisInput.trim() && !formData.prerequis.includes(prerequisInput.trim())) {
      setFormData(prev => ({
        ...prev,
        prerequis: [...prev.prerequis, prerequisInput.trim()]
      }));
      setPrerequisInput('');
    }
  };

  const handleRemovePrerequis = (prerequis: string) => {
    setFormData(prev => ({
      ...prev,
      prerequis: prev.prerequis.filter(p => p !== prerequis)
    }));
  };

  const handleServiceChange = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    setFormData(prev => ({
      ...prev,
      serviceId,
      chefServiceId: service?.chefId || ''
    }));
  };

  const getChefsByService = () => {
    if (!formData.serviceId) return encadrants.filter(e => e.role === 'chef');
    
    const service = services.find(s => s.id === formData.serviceId);
    return encadrants.filter(e => 
      e.role === 'chef' && (!service?.chefId || e.id === service.chefId)
    );
  };

  const chefsDisponibles = getChefsByService();
  const encadrantsDisponibles = encadrants.filter(e => 
    !formData.encadrantsIds.includes(e.id) && e.id !== formData.chefServiceId
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-teal-600" />
            <div>
              <h3 className="font-semibold text-gray-900">
                {isEditing ? 'Modifier l\'Annonce' : 'Nouvelle Annonce de Stage'}
              </h3>
              <p className="text-sm text-gray-500">
                {isEditing ? 'Modifier les informations de l\'annonce' : 'Créer une nouvelle annonce de stage'}
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

        {/* Avertissements de conflits */}
        {conflits.length > 0 && (
          <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-800">Conflits détectés</h4>
            </div>
            <ul className="space-y-1 text-sm text-red-700">
              {conflits.map((conflit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                  {conflit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre et description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'annonce *
              </label>
              <input
                type="text"
                value={formData.titre}
                onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.titre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: Stage en Chirurgie Cardiaque"
              />
              {errors.titre && (
                <p className="mt-1 text-sm text-red-600">{errors.titre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de Stage *
              </label>
              <select
                value={formData.typeStage}
                onChange={(e) => setFormData(prev => ({ ...prev, typeStage: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.typeStage ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un type</option>
                {typeStageOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.typeStage && (
                <p className="mt-1 text-sm text-red-600">{errors.typeStage}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description détaillée *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              rows={4}
              placeholder="Décrivez en détail le stage, les activités, les objectifs..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Service et Hôpital */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service *
              </label>
              <select
                value={formData.serviceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.serviceId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.nom}
                  </option>
                ))}
              </select>
              {errors.serviceId && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hôpital *
              </label>
              <select
                value={formData.hopitalId}
                onChange={(e) => setFormData(prev => ({ ...prev, hopitalId: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.hopitalId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un hôpital</option>
                {hopitaux.map(hopital => (
                  <option key={hopital.id} value={hopital.id}>
                    {hopital.nom} - {hopital.ville}
                  </option>
                ))}
              </select>
              {errors.hopitalId && (
                <p className="mt-1 text-sm text-red-600">{errors.hopitalId}</p>
              )}
            </div>
          </div>

          {/* Périodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de début *
              </label>
              <input
                type="date"
                value={formData.dateDebut}
                onChange={(e) => setFormData(prev => ({ ...prev, dateDebut: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.dateDebut ? 'border-red-500' : 'border-gray-300'
                }`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dateDebut && (
                <p className="mt-1 text-sm text-red-600">{errors.dateDebut}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date de fin *
              </label>
              <input
                type="date"
                value={formData.dateFin}
                onChange={(e) => setFormData(prev => ({ ...prev, dateFin: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.dateFin ? 'border-red-500' : 'border-gray-300'
                }`}
                min={formData.dateDebut || new Date().toISOString().split('T')[0]}
              />
              {errors.dateFin && (
                <p className="mt-1 text-sm text-red-600">{errors.dateFin}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date limite de candidature *
              </label>
              <input
                type="date"
                value={formData.dateLimiteCandidature}
                onChange={(e) => setFormData(prev => ({ ...prev, dateLimiteCandidature: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.dateLimiteCandidature ? 'border-red-500' : 'border-gray-300'
                }`}
                max={formData.dateDebut || undefined}
              />
              {errors.dateLimiteCandidature && (
                <p className="mt-1 text-sm text-red-600">{errors.dateLimiteCandidature}</p>
              )}
            </div>
          </div>

          {/* Horaire quotidien */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horaire Quotidien
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de début *
                </label>
                <input
                  type="time"
                  value={formData.horaireQuotidien.heureDebut}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    horaireQuotidien: { ...prev.horaireQuotidien, heureDebut: e.target.value }
                  }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.heureFin ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure de fin *
                </label>
                <input
                  type="time"
                  value={formData.horaireQuotidien.heureFin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    horaireQuotidien: { ...prev.horaireQuotidien, heureFin: e.target.value }
                  }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.heureFin ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.heureFin && (
                  <p className="mt-1 text-sm text-red-600">{errors.heureFin}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Début pause déjeuner
                </label>
                <input
                  type="time"
                  value={formData.horaireQuotidien.pauseDejeuner.heureDebut}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    horaireQuotidien: {
                      ...prev.horaireQuotidien,
                      pauseDejeuner: { ...prev.horaireQuotidien.pauseDejeuner, heureDebut: e.target.value }
                    }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fin pause déjeuner
                </label>
                <input
                  type="time"
                  value={formData.horaireQuotidien.pauseDejeuner.heureFin}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    horaireQuotidien: {
                      ...prev.horaireQuotidien,
                      pauseDejeuner: { ...prev.horaireQuotidien.pauseDejeuner, heureFin: e.target.value }
                    }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jours de travail *
              </label>
              {errors.joursTravail && (
                <p className="text-sm text-red-600 mb-2">{errors.joursTravail}</p>
              )}
              <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                {(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'] as const).map(jour => (
                  <button
                    type="button"
                    key={jour}
                    onClick={() => {
                      const newJours = formData.horaireQuotidien.joursTravail.includes(jour)
                        ? formData.horaireQuotidien.joursTravail.filter(j => j !== jour)
                        : [...formData.horaireQuotidien.joursTravail, jour];
                      setFormData(prev => ({
                        ...prev,
                        horaireQuotidien: { ...prev.horaireQuotidien, joursTravail: newJours }
                      }));
                    }}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      formData.horaireQuotidien.joursTravail.includes(jour)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {jour.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2">
                {formData.horaireQuotidien.joursTravail.map(jour => (
                  <span key={jour}>{jour}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Capacité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de places *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.placesTotal}
                onChange={(e) => setFormData(prev => ({ ...prev, placesTotal: parseInt(e.target.value) || 1 }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.placesTotal ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.placesTotal && (
                <p className="mt-1 text-sm text-red-600">{errors.placesTotal}</p>
              )}
            </div>
          </div>

          {/* Encadrement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chef de Service *
              </label>
              <select
                value={formData.chefServiceId}
                onChange={(e) => setFormData(prev => ({ ...prev, chefServiceId: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.chefServiceId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un chef</option>
                {chefsDisponibles.map(chef => (
                  <option key={chef.id} value={chef.id}>
                    {chef.nom} - {chef.specialite}
                  </option>
                ))}
              </select>
              {errors.chefServiceId && (
                <p className="mt-1 text-sm text-red-600">{errors.chefServiceId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Encadrants supplémentaires
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.encadrantsIds.map(encadrantId => {
                  const encadrant = encadrants.find(e => e.id === encadrantId);
                  return encadrant ? (
                    <span
                      key={encadrantId}
                      className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium flex items-center gap-2"
                    >
                      {encadrant.nom}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          encadrantsIds: prev.encadrantsIds.filter(id => id !== encadrantId)
                        }))}
                        className="hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    setFormData(prev => ({
                      ...prev,
                      encadrantsIds: [...prev.encadrantsIds, e.target.value]
                    }));
                    e.target.value = '';
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Ajouter un encadrant</option>
                {encadrantsDisponibles.map(encadrant => (
                  <option key={encadrant.id} value={encadrant.id}>
                    {encadrant.nom} - {encadrant.specialite}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-teal-100 text-teal-800 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {tagOptions.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      formData.tags.includes(tag)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Spécialités requises */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spécialités Requises
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.specialitesRequerues.map(specialite => (
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
            <div className="border border-gray-200 rounded-xl p-4 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specialitesOptions.map(specialite => (
                  <button
                    type="button"
                    key={specialite}
                    onClick={() => handleAddSpecialite(specialite)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                      formData.specialitesRequerues.includes(specialite)
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

          {/* Prérequis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prérequis
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.prerequis.map(prerequis => (
                <span
                  key={prerequis}
                  className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-sm font-medium flex items-center gap-2"
                >
                  {prerequis}
                  <button
                    type="button"
                    onClick={() => handleRemovePrerequis(prerequis)}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={prerequisInput}
                onChange={(e) => setPrerequisInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPrerequis())}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Ajouter un prérequis"
              />
              <button
                type="button"
                onClick={handleAddPrerequis}
                className="px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>

          {/* Option de publication */}
          {!isEditing && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.publierImmediatement}
                    onChange={(e) => setFormData(prev => ({ ...prev, publierImmediatement: e.target.checked }))}
                    className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                  />
                  <span className="font-medium text-blue-800">Publier immédiatement</span>
                </label>
                <p className="text-sm text-blue-600 mt-1">
                  L'annonce sera publiée immédiatement et un email sera envoyé à tous les étudiants abonnés.
                  Sinon, elle sera sauvegardée en tant que brouillon.
                </p>
              </div>
            </div>
          )}

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
                  <Check className="w-4 h-4" />
                  Mettre à jour
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  {formData.publierImmediatement ? 'Publier maintenant' : 'Sauvegarder en brouillon'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjoutAnnonceModal;