"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { ProfileData } from '../../types/profile.types';

interface ProfileProps {
  data: ProfileData;
  onLogout?: () => void;
  logoutButtonText?: string;
}

const Profile: React.FC<ProfileProps> = ({ 
  data, 
  onLogout,
  logoutButtonText = 'Se déconnecter'
}) => {
  return (
    <div className="flex-1  p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Mon Profile</h1>
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile Photo and Basic Info */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            {data.photo ? (
              <Image 
                src={data.photo} 
                alt={data.name}
                width={64}
                height={64}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-400 to-teal-600 text-white text-xl font-semibold">
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
              <label className="text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="text-base text-gray-800 py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                {field.value || '-'}
              </div>
            </div>
          ))}
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