"use client";

import { useState } from 'react';
import { FileText, Download, Calendar, Filter, BarChart, PieChart, LineChart, Users, Target, Award } from 'lucide-react';
import { Periode, ServiceStat } from '../models/statistiques.model';

interface ReportGeneratorProps {
  periodes: Periode[];
  servicesStats: ServiceStat[];
  onGenerate: (config: ReportConfig) => void;
}

interface ReportConfig {
  titre: string;
  type: 'hebdomadaire' | 'mensuel' | 'trimestriel' | 'annuel' | 'personnalise';
  periode: Periode;
  sections: ReportSection[];
  format: 'pdf' | 'excel' | 'ppt';
  servicesInclus: string[];
}

interface ReportSection {
  id: string;
  titre: string;
  type: 'stats' | 'chart' | 'table' | 'kpis';
  contenu: any;
}

const ReportGenerator = ({ periodes, servicesStats, onGenerate }: ReportGeneratorProps) => {
  const [config, setConfig] = useState<ReportConfig>({
    titre: '',
    type: 'personnalise',
    periode: periodes[0],
    sections: [],
    format: 'pdf',
    servicesInclus: servicesStats.map(s => s.id)
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const sectionsTypes = [
    { id: 'stats', label: 'Statistiques générales', icon: BarChart },
    { id: 'kpis', label: 'KPIs par service', icon: Target },
    { id: 'chart_annonces', label: 'Évolution annonces', icon: LineChart },
    { id: 'chart_candidatures', label: 'Candidatures par service', icon: PieChart },
    { id: 'table_performance', label: 'Tableau performance', icon: FileText },
    { id: 'comparaison', label: 'Comparaison périodes', icon: Calendar },
  ];

  const handleAddSection = (sectionId: string) => {
    const section = sectionsTypes.find(s => s.id === sectionId);
    if (!section) return;

    const newSection: ReportSection = {
      id: `${sectionId}_${Date.now()}`,
      titre: section.label,
      type: section.id.includes('chart') ? 'chart' : 
            section.id.includes('table') ? 'table' :
            section.id.includes('kpis') ? 'kpis' : 'stats',
      contenu: { type: sectionId }
    };

    setConfig(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const handleRemoveSection = (sectionId: string) => {
    setConfig(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const handleGenerate = () => {
    if (!config.titre.trim()) {
      alert('Veuillez donner un titre au rapport');
      return;
    }

    if (config.sections.length === 0) {
      alert('Veuillez ajouter au moins une section au rapport');
      return;
    }

    onGenerate(config);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'stats': return <BarChart className="w-4 h-4" />;
      case 'chart': return <LineChart className="w-4 h-4" />;
      case 'table': return <FileText className="w-4 h-4" />;
      case 'kpis': return <Target className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 rounded-lg">
          <FileText className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Génération de Rapport</h3>
          <p className="text-sm text-gray-500">Créez des rapports personnalisés avec les données souhaitées</p>
        </div>
      </div>

      {/* Configuration de base */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Titre du rapport *
          </label>
          <input
            type="text"
            value={config.titre}
            onChange={(e) => setConfig(prev => ({ ...prev, titre: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Ex: Rapport Mensuel Performance Services"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de rapport
          </label>
          <select
            value={config.type}
            onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="personnalise">Personnalisé</option>
            <option value="hebdomadaire">Hebdomadaire</option>
            <option value="mensuel">Mensuel</option>
            <option value="trimestriel">Trimestriel</option>
            <option value="annuel">Annuel</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Période
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Format d'export
          </label>
          <select
            value={config.format}
            onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="pdf">PDF (Recommandé)</option>
            <option value="excel">Excel (Données brutes)</option>
            <option value="ppt">PowerPoint (Présentation)</option>
          </select>
        </div>
      </div>

      {/* Sections disponibles */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Sections disponibles</h4>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            <Filter className="w-4 h-4" />
            {showAdvanced ? 'Moins d\'options' : 'Plus d\'options'}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {sectionsTypes.map((section) => {
            const Icon = section.icon;
            const isAdded = config.sections.some(s => s.contenu.type === section.id);
            
            return (
              <button
                key={section.id}
                onClick={() => isAdded ? null : handleAddSection(section.id)}
                disabled={isAdded}
                className={`p-4 rounded-lg border text-left transition-colors ${
                  isAdded
                    ? 'bg-teal-50 border-teal-200 text-teal-700 cursor-not-allowed'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{section.label}</span>
                </div>
                {isAdded && (
                  <div className="text-xs text-teal-600 mt-2">✓ Ajoutée</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections sélectionnées */}
      {config.sections.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-4">
            Sections du rapport ({config.sections.length})
          </h4>
          <div className="space-y-3">
            {config.sections.map((section) => (
              <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getSectionIcon(section.type)}
                  <span className="font-medium text-gray-900">{section.titre}</span>
                </div>
                <button
                  onClick={() => handleRemoveSection(section.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Options avancées */}
      {showAdvanced && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h4 className="font-medium text-blue-800 mb-3">Options avancées</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Services à inclure
              </label>
              <div className="space-y-2">
                {servicesStats.map((service) => (
                  <label key={service.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.servicesInclus.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConfig(prev => ({
                            ...prev,
                            servicesInclus: [...prev.servicesInclus, service.id]
                          }));
                        } else {
                          setConfig(prev => ({
                            ...prev,
                            servicesInclus: prev.servicesInclus.filter(id => id !== service.id)
                          }));
                        }
                      }}
                      className="w-4 h-4 text-teal-500 rounded border-gray-300 focus:ring-teal-500"
                    />
                    <span className="text-sm text-blue-800">
                      {service.nom} - {service.hopital}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Générer le Rapport
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">
          Prévisualiser
        </button>
      </div>

      {/* Informations */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500 space-y-2">
          <p>• Le rapport sera généré avec les données de la période sélectionnée</p>
          <p>• Les graphiques seront inclus dans le format choisi</p>
          <p>• Un email de confirmation sera envoyé une fois le rapport prêt</p>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;