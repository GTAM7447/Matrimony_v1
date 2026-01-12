import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
 
const ChartSection = () => {

  const data = [
    { name: 'Active', value: 25, color: '#3CDD1CD4' },
    { name: 'Engaged', value: 14, color: '#7C4DF1' },
    { name: 'New Registrations', value: 36, color: '#FEDD72' },
    { name: 'Inactive', value: 25, color: '#FF3674' },
  ];
 
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded shadow-md border text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };
 
  return (
    <div className="bg-white p-4 rounded-lg shadow-md"> {/* Reduced p-6 to p-4 */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Chart Container - Reduced height */}
        <div className="relative w-72 h-72 mb-4 md:mb-0 md:mr-6">
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} 
                  outerRadius={90} 
                  paddingAngle={2}
                  cornerRadius={8}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="white"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
 
        {/* Legend - Reduced spacing */}
        <div className="space-y-3 w-full md:w-auto">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 mr-3"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default ChartSection;