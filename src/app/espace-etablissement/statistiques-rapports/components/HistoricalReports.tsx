"use client";

import { FileText, Download, Calendar, User, PieChart, BarChart, Filter, Eye, Trash2 } from 'lucide-react';
import { Rapport } from '../models/statistiques.model';
import { useState } from 'react';

interface HistoricalReportsProps {
  rapports: Rapport[];
  onView: (rapport: Rapport) => void;
  onDownload: (rapport: Rapport) => void;
  onDelete: (rapportId: string) => void;
}

const HistoricalReports = ({ rapports, onView, onDownload, onDelete }: HistoricalReportsProps) => {
  const [filterType, setFilterType] = useState<string>('tous');
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeIcon = (type: Rapport['type']) => {
    switch (type) {
      case 'hebdomadaire': return <Calendar className="w-4 h-4" />;
      case 'mensuel': return <Calendar className="w-4 h-4" />;
      case 'trimestriel': return <Calendar className="w-4 h-4" />;
      case 'annuel': return <Calendar className="w-4 h-4" />;
      case 'personnalise': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getFormatIcon = (format: Rapport['format']) => {
    switch (format) {
      case 'pdf': return <FileText className="w-4 h-4" />;
      case 'excel': return <PieChart className="w-4 h-4" />;
      case 'ppt': return <BarChart className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredRapports = rapports.filter(rapport => {
    if (filterType !== 'tous' && rapport.type !== filterType) return false;
    if (searchTerm && !rapport.titre.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const types = ['tous', 'hebdomadaire', 'mensuel', 'trimestriel', 'annuel', 'personnalise'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Historique des Rapports</h3>
          <p className="text-sm text-gray-500">
            {filteredRapports.length} rapport(s) généré(s)
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Rechercher un rapport..."
            />
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'tous' ? 'Tous types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredRapports.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun rapport correspond aux critères</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRapports.map((rapport) => (
            <div key={rapport.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    {getTypeIcon(rapport.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{rapport.titre}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(rapport.dateGeneration).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="flex items-center gap-1">
                        {getFormatIcon(rapport.format)}
                        {rapport.format.toUpperCase()} • {rapport.taille}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {rapport.generateur}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {rapport.type.charAt(0).toUpperCase() + rapport.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(rapport)}
                    className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"
                    title="Voir le rapport"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDownload(rapport)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Télécharger"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(rapport.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Résumé des statistiques */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Annonces</div>
                  <div className="font-bold text-gray-900">{rapport.statsResume.annoncesTotal}</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Candidatures</div>
                  <div className="font-bold text-gray-900">{rapport.statsResume.candidaturesTotal}</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Conversion</div>
                  <div className="font-bold text-gray-900">{rapport.statsResume.tauxConversion}%</div>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Meilleur service</div>
                  <div className="font-bold text-gray-900">{rapport.statsResume.serviceMeilleur}</div>
                </div>
              </div>

              {/* Période */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Période: {new Date(rapport.periode.dateDebut).toLocaleDateString('fr-FR')} → {new Date(rapport.periode.dateFin).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistiques historiques */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Synthèse historique</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-teal-50 rounded-lg">
            <div className="text-sm text-teal-600 mb-1">Total rapports</div>
            <div className="text-2xl font-bold text-teal-800">{rapports.length}</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600 mb-1">Dernier rapport</div>
            <div className="text-lg font-bold text-blue-800">
              {rapports.length > 0 
                ? new Date(rapports[0].dateGeneration).toLocaleDateString('fr-FR')
                : 'Aucun'}
            </div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600 mb-1">PDF</div>
            <div className="text-2xl font-bold text-green-800">
              {rapports.filter(r => r.format === 'pdf').length}
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-sm text-purple-600 mb-1">Taille totale</div>
            <div className="text-lg font-bold text-purple-800">
              {Math.round(rapports.reduce((acc, r) => acc + parseFloat(r.taille), 0) * 10) / 10} MB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalReports;