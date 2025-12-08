interface DonutChartData {
  label: string;
  value: number;
}

interface DonutChartProps {
  data: DonutChartData[];
}

const DonutChart = ({ data }: DonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const colors = ['#14B8A6', '#0D9488', '#99F6E4'];
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Statut des stages
      </h3>
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const radius = 40;
              const circumference = 2 * Math.PI * radius;
              const strokeDasharray = `${(angle / 360) * circumference} ${circumference}`;
              const rotation = currentAngle;
              
              currentAngle += angle;
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: '50% 50%',
                  }}
                />
              );
            })}
          </svg>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index] }}
              ></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;