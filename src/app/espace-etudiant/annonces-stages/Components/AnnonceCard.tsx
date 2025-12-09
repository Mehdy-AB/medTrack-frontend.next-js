"use client";

import { AnnonceStage } from '../models/stage.model';
import { MapPin, Calendar, Users, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface AnnonceCardProps {
  annonce: AnnonceStage;
  onPostuler: (stageId: string) => void;
  estConnecte: boolean;
}

const AnnonceCard = ({ annonce, onPostuler, estConnecte }: AnnonceCardProps) => {
  const [isPostulating, setIsPostulating] = useState(false);
  const [postule, setPostule] = useState(false);

  const getStatutStyle = (statut: string) => {
    switch (statut) {
      case 'Ouvert':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Fermé':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Bientôt':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handlePostuler = async () => {
    if (!estConnecte) {
      alert('Veuillez vous connecter pour postuler');
      return;
    }

    if (annonce.statut !== 'Ouvert' || annonce.placesRestantes <= 0) {
      alert('Ce stage n\'est plus disponible');
      return;
    }

    setIsPostulating(true);
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onPostuler(annonce.id);
    setPostule(true);
    setIsPostulating(false);
  };

  const isPostulable = 
    annonce.statut === 'Ouvert' && 
    annonce.placesRestantes > 0 && 
    estConnecte && 
    !postule;

  return (
    <div className={`bg-white rounded-xl border p-6 hover:shadow-lg transition-all ${
      postule ? 'border-teal-200 bg-teal-50/30' : 'border-gray-200'
    }`}>
      {/* En-tête avec statut */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {annonce.titre}
            </h3>
            {postule && (
              <span className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                <CheckCircle2 size={14} />
                Postulé
              </span>
            )}
          </div>
          
          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-teal-500" />
              <span className="font-medium">{annonce.hopital}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-teal-500" />
              <span>Service: {annonce.service}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-teal-500" />
              <span>Durée: {annonce.duree}</span>
            </div>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatutStyle(annonce.statut)}`}>
          {annonce.statut}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        {annonce.description}
      </p>

      {/* Informations secondaires */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm">
          <span className="text-gray-500 block mb-1">Places</span>
          <span className="font-bold text-lg">
            {annonce.placesRestantes}/{annonce.nombrePlaces}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 block mb-1">Début</span>
          <span className="font-bold text-lg">
            {annonce.dateDebut}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 block mb-1">Fin</span>
          <span className="font-bold text-lg">
            {annonce.dateFin}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 block mb-1">Date limite</span>
          <span className="font-bold text-lg">
            {annonce.dateLimite}
          </span>
        </div>
      </div>

      {/* Bouton Postuler */}
      <div className="pt-4 border-t border-gray-200">
        {isPostulable ? (
          <button
            onClick={handlePostuler}
            disabled={isPostulating}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-all ${
              isPostulating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-600 shadow-md hover:shadow-lg'
            }`}
          >
            {isPostulating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={18} />
                Postuler à ce stage
              </>
            )}
          </button>
        ) : postule ? (
          <div className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-teal-50 border border-teal-200">
            <CheckCircle2 size={18} className="text-teal-600" />
            <span className="text-teal-700 font-medium">
              Postulation envoyée ✓
            </span>
          </div>
        ) : !estConnecte ? (
          <div className="w-full text-center px-4 py-3 rounded-lg bg-gray-100 text-gray-600">
            Connectez-vous pour postuler
          </div>
        ) : (
          <div className="w-full text-center px-4 py-3 rounded-lg bg-gray-100 text-gray-600">
            Postulation non disponible
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnonceCard;