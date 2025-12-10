"use client";

import { X, Download, FileText, FileSpreadsheet, Presentation, FileType, Calendar, Filter } from 'lucide-react';
import { Periode } from '../models/statistiques.model';
import { useState } from 'react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  periodes: Periode[];
  onExport: (config: ExportConfig) => void;
}

interface ExportConfig {
  format: 'csv' | 'excel' | 'pdf' | 'json';
  periode: Periode;
  donnees: string[];
  includeCharts: boolean;
  includeRawData: boolean;
  password?: string;
}

const ExportModal = ({ isOpen, onClose, periodes, onExport }: ExportModalProps) => {
  const [config, setConfig] = useState<ExportConfig>({
    format: 'excel',
    periode: periodes[0],
    donnees: ['stats', 'kpis', 'services'],
    includeCharts: true,
    includeRawData: false,
    password: ''
  });

  if (!isOpen) return null;

  const formats = [
    { id: 'csv', label: 'CSV', icon: FileText, description: 'Format texte, compatible Excel' },
    { id: 'excel', label: 'Excel (XLSX)', icon: FileSpreadsheet, description: 'Format natif Excel, formules incluses' },
    { id: 'pdf', label: 'PDF', icon: FileType, description: 'Document formaté avec graphiques' },
    { id: 'json', label: 'JSON', icon: FileText, description: 'Données brutes pour développeurs' },
  ];

  const donneesOptions = [
    { id: 'stats', label: 'Statistiques générales' },
    { id: 'kpis', label: 'Indicateurs KPI' },
    { id: 'services', label: 'Performance par service' },
    { id: 'comparaisons', label: 'Comparaisons périodes' },
    { id: 'historique', label: 'Historique complet' },
    { id: 'tendances', label: 'Analyses de tendance' },
  ];

  const handleExport = () => {
    onExport(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Download className="w-6 h-6 text-teal-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Export des Données</h3>
              <p className="text-sm text-gray-500">Configurez et téléchargez vos données d'analyse</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Format */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Format d'export</h4>
            <div className="grid grid-cols-2 gap-4">
              {formats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => setConfig(prev => ({ ...prev, format: format.id as any }))}
                    className={`p-4 rounded-xl border transition-colors text-left ${
                      config.format === format.id
                        ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{format.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Période */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Période des données
            </label>
            <select
              value={config.periode.id}
              onChange={(e) => {
                const periode = periodes.find(p => p.id === e.target.value);
                if (periode) {
                  setConfig(prev => ({ ...prev, periode }));
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {periodes.map(periode => (
                <option key={periode.id} value={periode.id}>
                  {periode.label} ({new Date(periode.dateDebut).toLocaleDateString('fr-FR')} → {new Date(periode.dateFin).toLocaleDateString('fr-FR')})
                </option>
              ))}
            </select>
          </div>

          {/* Données à inclure */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Données à inclure</h4>
            <div className="grid grid-cols-2 gap-3">
              {donneesOptions.map((option) => (
                <label key={option.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.donnees.includes(option.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setConfig(prev => ({
                          ...prev,
                          donnees: [...prev.donnees, option.id]
                        }));
                      } else {
                        setConfig(prev => ({
                          ...prev,
                          donnees: prev.donnees.filter(id => id !== option.id)
                        }));
                      }
                    }}
                    className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={config.includeCharts}
                onChange={(e) => setConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-900">Inclure les graphiques (PDF uniquement)</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={config.includeRawData}
                onChange={(e) => setConfig(prev => ({ ...prev, includeRawData: e.target.checked }))}
                className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-900">Inclure les données brutes en annexe</span>
            </label>
          </div>

          {/* Protection par mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Protection du fichier (optionnel)
            </label>
            <input
              type="password"
              value={config.password}
              onChange={(e) => setConfig(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Mot de passe pour ouvrir le fichier"
            />
            <p className="text-xs text-gray-500 mt-2">
              Le fichier sera chiffré avec ce mot de passe. Laissez vide pour aucun mot de passe.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleExport}
              className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Télécharger maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;