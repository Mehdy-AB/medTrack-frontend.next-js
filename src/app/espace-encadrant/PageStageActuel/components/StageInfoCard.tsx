"use client";

import { StageInfo } from '../models/stage.model';

interface StageInfoCardProps {
  stageInfo: StageInfo;
}

const StageInfoCard = ({ stageInfo }: StageInfoCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Informations sur le stage
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Période</p>
          <p className="font-semibold text-gray-900">
            {stageInfo.periode.debut} - {stageInfo.periode.fin}
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Service</p>
          <p className="font-semibold text-gray-900">{stageInfo.service}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Hôpital</p>
          <p className="font-semibold text-gray-900">{stageInfo.hopital}</p>
        </div>
      </div>
    </div>
  );
};

export default StageInfoCard;
