"use client";

import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Users, FileText, Target, BarChart } from 'lucide-react';
import { KPI } from '../models/statistiques.model';

interface DashboardStatsProps {
  periodesComparees: {
    actuelle: {
      annoncesTotal: number;
      candidaturesTotal: number;
      tauxConversion: number;
      tauxOccupation: number;
      satisfactionMoyenne: number;
    };
    precedente: {
      annoncesTotal: number;
      candidaturesTotal: number;
      tauxConversion: number;
      tauxOccupation: number;
      satisfactionMoyenne: number;
    };
  };
  kpis: KPI[];
}

const DashboardStats = ({ periodesComparees, kpis }: DashboardStatsProps) => {
  const calculerVariation = (actuel: number, precedent: number) => {
    if (precedent === 0) return 0;
    return ((actuel - precedent) / precedent) * 100;
  };

  const getVariationConfig = (variation: number) => {
    if (variation > 0) {
      return {
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        label: `+${variation.toFixed(1)}%`
      };
    } else if (variation < 0) {
      return {
        icon: TrendingDown,
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        label: `${variation.toFixed(1)}%`
      };
    } else {
      return {
        icon: Minus,
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        label: '0%'
      };
    }
  };

  const stats = [
    {
      label: 'Annonces totales',
      valeur: periodesComparees.actuelle.annoncesTotal,
      variation: calculerVariation(
        periodesComparees.actuelle.annoncesTotal,
        periodesComparees.precedente.annoncesTotal
      ),
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Candidatures totales',
      valeur: periodesComparees.actuelle.candidaturesTotal,
      variation: calculerVariation(
        periodesComparees.actuelle.candidaturesTotal,
        periodesComparees.precedente.candidaturesTotal
      ),
      icon: Users,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50'
    },
    {
      label: 'Taux de conversion',
      valeur: periodesComparees.actuelle.tauxConversion,
      unite: '%',
      variation: calculerVariation(
        periodesComparees.actuelle.tauxConversion,
        periodesComparees.precedente.tauxConversion
      ),
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Taux d\'occupation',
      valeur: periodesComparees.actuelle.tauxOccupation,
      unite: '%',
      variation: calculerVariation(
        periodesComparees.actuelle.tauxOccupation,
        periodesComparees.precedente.tauxOccupation
      ),
      icon: BarChart,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Satisfaction moyenne',
      valeur: periodesComparees.actuelle.satisfactionMoyenne,
      unite: '/5',
      variation: calculerVariation(
        periodesComparees.actuelle.satisfactionMoyenne,
        periodesComparees.precedente.satisfactionMoyenne
      ),
      icon: CheckCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat, index) => {
        const variationConfig = getVariationConfig(stat.variation);
        const VariationIcon = variationConfig.icon;
        
        return (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`px-3 py-1 ${variationConfig.bgColor} ${variationConfig.color} rounded-full text-sm font-medium flex items-center gap-1`}>
                <VariationIcon className="w-4 h-4" />
                {variationConfig.label}
              </span>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stat.valeur.toFixed(1)}
                <span className="text-lg text-gray-600">{stat.unite}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Période précédente: {(stat.valeur - (stat.valeur * stat.variation / 100)).toFixed(1)}{stat.unite}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;