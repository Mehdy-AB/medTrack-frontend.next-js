"use client";

import { FileText, Download, Clock, CheckCircle, AlertCircle, Users, User, Paperclip } from 'lucide-react';
import { RapportGenere } from '../models/rapport.model';

interface RapportCardProps {
  rapport: RapportGenere;
  onDownload: (rapport: RapportGenere) => void;
  onDelete: (id: string) => void;
}

const RapportCard = ({ rapport, onDownload, onDelete }: RapportCardProps) => {
  const getStatusIcon = () => {
    switch (rapport.statut) {
      case 'généré':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'en_cours':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'erreur':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (rapport.statut) {
      case 'généré':
        return 'bg-green-100 text-green-800';
      case 'en_cours':
        return 'bg-yellow-100 text-yellow-800';
      case 'erreur':
        return 'bg-red-100 text-red-800';
    }
  };

  const getTypeIcon = () => {
    switch (rapport.type) {
      case 'individuel':
        return <User className="w-4 h-4 text-gray-500" />;
      case 'groupe':
        return <Users className="w-4 h-4 text-gray-500" />;
      case 'activité':
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{rapport.nom}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {rapport.statut}
              </span>
              <span className="text-xs text-gray-500">{rapport.dateGeneration}</span>
            </div>
          </div>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Période couverte</span>
          <span className="font-medium text-gray-900">{rapport.periodeCouverte}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Nombre d'étudiants</span>
          <span className="font-medium text-gray-900">{rapport.nbEtudiants}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Taille du fichier</span>
          <span className="font-medium text-gray-900">{rapport.tailleFichier}</span>
        </div>
        
        {/* Afficher si le rapport contient un fichier uploadé */}
        {rapport.fichier && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Paperclip className="w-3 h-3 text-gray-400" />
              <span className="text-gray-600">Fichier joint</span>
            </div>
            <span className="font-medium text-gray-900">{rapport.fichier.name}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {rapport.statut === 'généré' && (
          <button
            onClick={() => onDownload(rapport)}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </button>
        )}
        <button
          onClick={() => onDelete(rapport.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default RapportCard;