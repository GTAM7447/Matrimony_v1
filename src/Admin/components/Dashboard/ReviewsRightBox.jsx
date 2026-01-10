import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
 
const BarChartComponent = () => {
  const data = [
    { month: "Jan", subscriptions: 700, renewals: 650, cancellations: 100 },
    { month: "Feb", subscriptions: 600, renewals: 550, cancellations: 120 },
    { month: "Mar", subscriptions: 500, renewals: 450, cancellations: 90 },
    { month: "Apr", subscriptions: 400, renewals: 350, cancellations: 80 },
    { month: "May", subscriptions: 300, renewals: 250, cancellations: 70 },
    { month: "Jun", subscriptions: 400, renewals: 350, cancellations: 85 },
    { month: "Jul", subscriptions: 500, renewals: 450, cancellations: 95 },
    { month: "Aug", subscriptions: 600, renewals: 550, cancellations: 110 },
    { month: "Sep", subscriptions: 500, renewals: 450, cancellations: 100 },
    { month: "Oct", subscriptions: 400, renewals: 350, cancellations: 85 },
    { month: "Nov", subscriptions: 500, renewals: 450, cancellations: 95 },
    { month: "Dec", subscriptions: 600, renewals: 550, cancellations: 105 },
  ];
 
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4D6EF1]" />
            New Subscriptions
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2EDC90]" />
            Renewals
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF1F1F]" />
            Cancellations
          </div>
        </div>
 
        <select className="border rounded-md px-3 py-1 text-sm text-gray-700">
          <option>2023</option>
        </select>
      </div>
 
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={5}
            barGap={6}
            barCategoryGap={60}
          >
            <CartesianGrid
              stroke="#e5e7eb"
              strokeDasharray="3 3"
              vertical={false}
            />
 
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
 
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[400, 700]}
              ticks={[400, 500, 600, 700]}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              width={40}
            />
 
            <Bar
              dataKey="subscriptions"
              fill="#4D6EF1"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="renewals"
              fill="#2EDC90"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="cancellations"
              fill="#FF1F1F"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
 
export default BarChartComponent;