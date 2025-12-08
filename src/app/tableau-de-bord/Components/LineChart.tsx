interface LineChartData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
}

const LineChart = ({ data }: LineChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((item.value / maxValue) * 80);
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Évolution du nombre de stages par mois
      </h3>
      <p className="text-sm text-gray-500 mb-6">Évolution depuis 1 Janvier, 2025</p>
      
      <div className="relative h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          {/* Grille */}
          <line x1="0" y1="20" x2="100" y2="20" stroke="#E5E7EB" strokeWidth="0.2" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="#E5E7EB" strokeWidth="0.2" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#E5E7EB" strokeWidth="0.2" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="#E5E7EB" strokeWidth="0.2" />
          
          {/* Ligne du graphique */}
          <polyline
            points={points}
            fill="none"
            stroke="#14B8A6"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((item.value / maxValue) * 80);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill="#14B8A6"
                className="hover:r-2 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;