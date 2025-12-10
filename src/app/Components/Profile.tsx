"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Edit2, Save, Phone, Mail, User, Briefcase, Building, Hash, Award, Shield } from 'lucide-react';
import { ProfileData } from '../../types/profile.types';

interface ProfileProps {
  data: ProfileData;
  onLogout?: () => void;
  logoutButtonText?: string;
  onUpdateField?: (key: string, value: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  data, 
  onLogout,
  logoutButtonText = 'Se déconnecter',
  onUpdateField
}) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (field: { key: string; value: string }) => {
    setEditingKey(field.key);
    setEditValue(field.value);
  };

  const handleSave = (key: string) => {
    if (onUpdateField) {
      onUpdateField(key, editValue);
    }
    setEditingKey(null);
  };

  const handleCancel = () => {
    setEditingKey(null);
  };

  // Get icon based on field key
  const getFieldIcon = (key: string) => {
    switch (key.toLowerCase()) {
      case 'phone':
        return <Phone className="w-4 h-4 text-gray-400" />;
      case 'email':
        return <Mail className="w-4 h-4 text-gray-400" />;
      case 'fullname':
      case 'fullName':
        return <User className="w-4 h-4 text-gray-400" />;
      case 'matricule':
        return <Hash className="w-4 h-4 text-gray-400" />;
      case 'specialty':
      case 'specialite':
        return <Award className="w-4 h-4 text-gray-400" />;
      case 'service':
        return <Briefcase className="w-4 h-4 text-gray-400" />;
      case 'hospital':
      case 'hopital':
        return <Building className="w-4 h-4 text-gray-400" />;
      case 'role':
        return <Shield className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  // Check if field should show edit button (only phone and email are editable)
  const shouldShowEditButton = (fieldKey: string) => {
    const field = data.fields.find(f => f.key === fieldKey);
    // Seuls 'phone' et 'email' sont modifiables
    const editableFields = ['phone', 'email'];
    return field?.editable && editableFields.includes(fieldKey) && editingKey !== fieldKey;
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Mon Profil</h1>
        </div>

        {/* Profile Photo and Basic Info */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
            {data.photo ? (
              <Image 
                src={data.photo} 
                alt={data.name}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-teal-400 to-teal-600 text-white text-xl font-semibold">
                {data.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{data.name}</h2>
            <p className="text-sm text-gray-500">{data.email}</p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-5">
          {data.fields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getFieldIcon(field.key)}
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                </div>
                {shouldShowEditButton(field.key) && (
                  <button
                    onClick={() => handleEdit(field)}
                    className="p-1 text-gray-400 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {editingKey === field.key ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSave(field.key)}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                  {field.value || '-'}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Information Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note :</strong> Seuls les champs Téléphone et Email sont modifiables. 
            Toutes les autres informations (Rôle, Matricule, Spécialité, Service, Hôpital) 
            sont définies par l'administration et ne peuvent pas être modifiées ici.
          </p>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              {logoutButtonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;