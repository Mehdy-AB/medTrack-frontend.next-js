// app/tableau-de-bord/Components/FormModal.tsx
"use client";

import { X, Eye, EyeOff, Upload, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'file';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  accept?: string; // Pour les fichiers (ex: "image/*")
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  icon: React.ReactNode;
  fields: FormField[];
  initialData?: any;
  submitLabel?: string;
  showCancel?: boolean;
}

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  icon,
  fields,
  initialData = {},
  submitLabel = 'Ajouter',
  showCancel = false
}: FormModalProps) => {
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mettre à jour formData quand initialData change
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
      // Si initialData contient une photo URL, l'afficher
      if (initialData.photo) {
        setPhotoPreview(initialData.photo);
      }
    } else {
      setFormData({});
      setPhotoPreview(null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  // Gérer la sélection de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier que c'est une image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner une image valide');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop volumineuse. Taille maximum : 5 MB');
        return;
      }

      setPhotoFile(file);

      // Créer une preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Ouvrir le sélecteur de fichier
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    // TODO BACKEND: Upload de la photo
    // Si une photo a été sélectionnée, l'uploader d'abord
    let photoUrl = formData.photo || null;
    
    if (photoFile) {
      // Exemple d'upload (à adapter selon ton backend)
      const formDataUpload = new FormData();
      formDataUpload.append('photo', photoFile);
      
      try {
        // const response = await fetch('/api/upload/photo', {
        //   method: 'POST',
        //   body: formDataUpload
        // });
        // const data = await response.json();
        // photoUrl = data.photoUrl;
        
        // Pour l'instant, utiliser la preview comme URL
        photoUrl = photoPreview;
      } catch (error) {
        console.error('Erreur upload photo:', error);
      }
    }

    // Ajouter l'URL de la photo aux données du formulaire
    const dataToSubmit = {
      ...formData,
      photo: photoUrl
    };

    onSubmit(dataToSubmit);
    setFormData({});
    setShowPassword({});
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  const handleClose = () => {
    setFormData({});
    setShowPassword({});
    setPhotoPreview(null);
    setPhotoFile(null);
    onClose();
  };

  // Séparer les champs photo des autres champs
  const photoField = fields.find(f => f.type === 'file');
  const otherFields = fields.filter(f => f.type !== 'file');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
              {icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Photo de profil */}
        {photoField && (
          <div className="mb-6 flex flex-col items-center">
            <div 
              onClick={handlePhotoClick}
              className="relative w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors group overflow-hidden"
            >
              {photoPreview ? (
                <img 
                  src={photoPreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
              
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept={photoField.accept || "image/*"}
              onChange={handleFileChange}
              className="hidden"
            />
            
            <p className="text-sm text-gray-500 mt-2">
              Cliquez pour {photoPreview ? 'modifier' : 'ajouter'} une photo
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG ou GIF (max 5MB)
            </p>
          </div>
        )}

        {/* Autres champs du formulaire */}
        <div className="space-y-4">
          {otherFields.map((field) => (
            <div key={field.name}>
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required={field.required}
                >
                  <option value="">{field.placeholder || `Sélectionner ${field.label}`}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'password' ? (
                <div className="relative">
                  <input
                    type={showPassword[field.name] ? 'text' : 'password'}
                    placeholder={field.placeholder || field.label}
                    value={formData[field.name] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                    required={field.required}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({ ...showPassword, [field.name]: !showPassword[field.name] })}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword[field.name] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              ) : (
                <input
                  type={field.type}
                  placeholder={field.placeholder || field.label}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        {showCancel ? (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleClose}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
            >
              {submitLabel}
            </button>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-medium"
          >
            {submitLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormModal;