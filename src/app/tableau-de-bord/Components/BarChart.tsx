interface BarChartData {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
}

const BarChart = ({ data }: BarChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Répartition des étudiants par hôpital
      </h3>
      <div className="flex items-end justify-around h-64 gap-4">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 100;
          const colors = ['bg-teal-200', 'bg-teal-400', 'bg-teal-300'];
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex items-end justify-center" style={{ height: '200px' }}>
                <div 
                  className={`${colors[index]} rounded-t-lg w-full transition-all hover:opacity-80 relative`}
                  style={{ height: `${height}%` }}
                >
                  {height === 100 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center">{item.label}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-6 mt-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${['bg-teal-200', 'bg-teal-400', 'bg-teal-300'][index]}`}></div>
            <span className="text-xs text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;