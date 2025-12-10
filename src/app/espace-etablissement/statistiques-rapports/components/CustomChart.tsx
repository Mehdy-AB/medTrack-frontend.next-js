"use client";

import { useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, BarChart3, PieChart as PieChartIcon, Download, Filter } from 'lucide-react';
import { DonneesChart } from '../models/statistiques.model';

interface CustomChartProps {
  titre: string;
  type: 'bar' | 'line' | 'pie';
  donnees: DonneesChart;
  hauteur?: number;
  options?: {
    showLegend?: boolean;
    showGrid?: boolean;
    stacked?: boolean;
  };
  onExport?: () => void;
}

// Import conditionnel pour éviter les erreurs pendant le build
let Recharts: any;
if (typeof window !== 'undefined') {
  Recharts = require('recharts');
}

const CustomChart = ({ 
  titre, 
  type, 
  donnees, 
  hauteur = 300,
  options = { showLegend: true, showGrid: true, stacked: false },
  onExport 
}: CustomChartProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getTypeIcon = () => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="w-5 h-5" />;
      case 'line':
        return <TrendingUp className="w-5 h-5" />;
      case 'pie':
        return <PieChartIcon className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  // Rendu conditionnel pour éviter les erreurs SSR
  const renderChart = () => {
    if (!Recharts || typeof window === 'undefined') {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-500 text-sm">Chargement du graphique...</div>
        </div>
      );
    }

    const { BarChart: RechartsBarChart, LineChart: RechartsLineChart, PieChart: RechartsPieChart, Bar, Line, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

    const chartData = donnees.labels.map((label, index) => ({
      label,
      ...Object.fromEntries(donnees.datasets.map(ds => [ds.label, ds.data[index]]))
    }));

    switch (type) {
      case 'bar':
        return (
          <RechartsBarChart data={chartData}>
            {options.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey="label" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '12px'
              }}
            />
            {options.showLegend && <Legend />}
            {donnees.datasets.map((dataset, index) => (
              <Bar
                key={index}
                dataKey={dataset.label}
                fill={typeof dataset.backgroundColor === 'string' ? dataset.backgroundColor : '#8884d8'}
                stroke={typeof dataset.borderColor === 'string' ? dataset.borderColor : '#8884d8'}
                strokeWidth={1}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            ))}
          </RechartsBarChart>
        );

      case 'line':
        return (
          <RechartsLineChart data={chartData}>
            {options.showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey="label" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '12px'
              }}
            />
            {options.showLegend && <Legend />}
            {donnees.datasets.map((dataset, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={dataset.label}
                stroke={typeof dataset.borderColor === 'string' ? dataset.borderColor : '#8884d8'}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </RechartsLineChart>
        );

      case 'pie':
        const pieData = donnees.labels.map((label, index) => {
          let color: string;
          if (Array.isArray(donnees.datasets[0].backgroundColor)) {
            color = donnees.datasets[0].backgroundColor[index] || '#8884d8';
          } else {
            color = donnees.datasets[0].backgroundColor || '#8884d8';
          }
          
          return {
            name: label,
            value: donnees.datasets[0].data[index],
            color
          };
        });

        return (
          <RechartsPieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={(_: any, index: number) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {pieData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={hoveredIndex === index ? entry.color.replace('0.7', '1') : entry.color}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [value, 'Valeur']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '12px'
              }}
            />
            {options.showLegend && (
              <Legend 
                formatter={(value: any) => (
                  <span style={{ color: '#6b7280', fontSize: '12px' }}>
                    {value}
                  </span>
                )}
              />
            )}
          </RechartsPieChart>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{titre}</h3>
            <p className="text-sm text-gray-500">
              {type === 'bar' && 'Diagramme à barres'}
              {type === 'line' && 'Courbe d\'évolution'}
              {type === 'pie' && 'Diagramme circulaire'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
            <Filter className="w-4 h-4" />
          </button>
          {onExport && (
            <button 
              onClick={onExport}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Graphique */}
      <div style={{ height: hauteur }}>
        {typeof window !== 'undefined' && Recharts ? (
          <Recharts.ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </Recharts.ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-gray-500 text-sm">Chargement du graphique...</div>
          </div>
        )}
      </div>

      {/* Légende détaillée */}
      {type !== 'pie' && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-4">
            {donnees.datasets.map((dataset, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded" 
                  style={{ 
                    backgroundColor: typeof dataset.borderColor === 'string' 
                      ? dataset.borderColor 
                      : '#8884d8' 
                  }}
                ></div>
                <span className="text-sm text-gray-600">{dataset.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomChart;