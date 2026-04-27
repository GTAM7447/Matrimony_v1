import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ChartSection = () => {

  const data = [
    { name: 'Active', value: 25, color: '#10B981' }, // Emerald 500
    { name: 'Engaged', value: 14, color: '#8B5CF6' }, // Violet 500
    { name: 'New Registrations', value: 36, color: '#F59E0B' }, // Amber 500
    { name: 'Inactive', value: 25, color: '#EF4444' }, // Red 500
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-sm">
          <p className="font-bold text-gray-800 mb-1">{payload[0].name}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }}></div>
            <p className="text-gray-600 font-medium">
              {payload[0].value}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col items-center">
      <h3 className="text-lg font-bold text-gray-800 mb-6 w-full text-left">User Distribution</h3>

      <div className="flex flex-col items-center w-full">
        {/* Chart Container */}
        <div className="relative w-64 h-64 mb-8">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  cornerRadius={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ filter: `drop-shadow(0px 4px 6px ${entry.color}40)` }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-extrabold text-gray-800">100%</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Total Users</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full grid grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-default">
              <div
                className="w-3 h-3 rounded-full mr-3 shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <div className="text-sm font-semibold text-gray-700">{item.name}</div>
                <div className="text-xs text-gray-400">{item.value}% segment</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartSection;