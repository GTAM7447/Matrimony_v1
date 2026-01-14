// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
 
// const BarChartComponent = () => {
//   const data = [
//     { month: "Jan", subscriptions: 700, renewals: 650, cancellations: 100 },
//     { month: "Feb", subscriptions: 600, renewals: 550, cancellations: 120 },
//     { month: "Mar", subscriptions: 500, renewals: 450, cancellations: 90 },
//     { month: "Apr", subscriptions: 400, renewals: 350, cancellations: 80 },
//     { month: "May", subscriptions: 300, renewals: 250, cancellations: 70 },
//     { month: "Jun", subscriptions: 400, renewals: 350, cancellations: 85 },
//     { month: "Jul", subscriptions: 500, renewals: 450, cancellations: 95 },
//     { month: "Aug", subscriptions: 600, renewals: 550, cancellations: 110 },
//     { month: "Sep", subscriptions: 500, renewals: 450, cancellations: 100 },
//     { month: "Oct", subscriptions: 400, renewals: 350, cancellations: 85 },
//     { month: "Nov", subscriptions: 500, renewals: 450, cancellations: 95 },
//     { month: "Dec", subscriptions: 600, renewals: 550, cancellations: 105 },
//   ];
 
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-6 text-sm text-gray-700">
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#4D6EF1]" />
//             New Subscriptions
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#2EDC90]" />
//             Renewals
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="w-3 h-3 rounded-full bg-[#FF1F1F]" />
//             Cancellations
//           </div>
//         </div>
 
//         <select className="border rounded-md px-3 py-1 text-sm text-gray-700">
//           <option>2023</option>
//         </select>
//       </div>
 
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             barSize={5}
//             barGap={6}
//             barCategoryGap={60}
//           >
//             <CartesianGrid
//               stroke="#e5e7eb"
//               strokeDasharray="3 3"
//               vertical={false}
//             />
 
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#6b7280", fontSize: 12 }}
//             />
 
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               domain={[400, 700]}
//               ticks={[400, 500, 600, 700]}
//               tick={{ fill: "#6b7280", fontSize: 12 }}
//               width={40}
//             />
 
//             <Bar
//               dataKey="subscriptions"
//               fill="#4D6EF1"
//               radius={[6, 6, 0, 0]}
//             />
//             <Bar
//               dataKey="renewals"
//               fill="#2EDC90"
//               radius={[6, 6, 0, 0]}
//             />
//             <Bar
//               dataKey="cancellations"
//               fill="#FF1F1F"
//               radius={[6, 6, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };
 
// export default BarChartComponent;





















// import React, { useState, useEffect } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip
// } from "recharts";
 
// const BarChartComponent = () => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [selectedYear, setSelectedYear] = useState("2023");
 
//   const data = [
//     { month: "Jan", subscriptions: 700, renewals: 650, cancellations: 100 },
//     { month: "Feb", subscriptions: 600, renewals: 550, cancellations: 120 },
//     { month: "Mar", subscriptions: 500, renewals: 450, cancellations: 90 },
//     { month: "Apr", subscriptions: 400, renewals: 350, cancellations: 80 },
//     { month: "May", subscriptions: 300, renewals: 250, cancellations: 70 },
//     { month: "Jun", subscriptions: 400, renewals: 350, cancellations: 85 },
//     { month: "Jul", subscriptions: 500, renewals: 450, cancellations: 95 },
//     { month: "Aug", subscriptions: 600, renewals: 550, cancellations: 110 },
//     { month: "Sep", subscriptions: 500, renewals: 450, cancellations: 100 },
//     { month: "Oct", subscriptions: 400, renewals: 350, cancellations: 85 },
//     { month: "Nov", subscriptions: 500, renewals: 450, cancellations: 95 },
//     { month: "Dec", subscriptions: 600, renewals: 550, cancellations: 105 },
//   ];
 
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
   
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
   
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);
 
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
//           <p className="font-medium text-gray-900 mb-1">{label}</p>
//           {payload.map((entry, index) => (
//             <p key={index} className="text-sm" style={{ color: entry.color }}>
//               {entry.dataKey}: <span className="font-semibold">{entry.value}</span>
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };
 
//   const years = ["2023", "2022", "2021", "2020", "2019"];
 
//   return (
//     <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
//       {/* Header Section - Year on next line */}
//       <div className="mb-4 md:mb-6">
//         {/* First line: Legend items */}
//         <div className="flex items-center gap-3 md:gap-6 text-sm text-gray-700 mb-4">
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <span className="w-3 h-3 rounded-full bg-[#4D6EF1] flex-shrink-0" />
//             <span>New Subscriptions</span>
//           </div>
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <span className="w-3 h-3 rounded-full bg-[#2EDC90] flex-shrink-0" />
//             <span>Renewals</span>
//           </div>
//           <div className="flex items-center gap-2 whitespace-nowrap">
//             <span className="w-3 h-3 rounded-full bg-[#FF1F1F] flex-shrink-0" />
//             <span>Cancellations</span>
//           </div>
//         </div>
 
//         {/* Second line: Year selector */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-700 whitespace-nowrap">Year</span>
//           <div className="relative">
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-24"
//             >
//               {years.map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
 
//       {/* Chart Container */}
//       <div className="h-48 sm:h-56 md:h-64 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             data={data}
//             margin={{
//               top: 10,
//               right: isMobile ? 10 : 30,
//               left: isMobile ? -20 : 0,
//               bottom: 5,
//             }}
//             barSize={isMobile ? 6 : 8}
//             barGap={isMobile ? 3 : 4}
//             barCategoryGap={isMobile ? 15 : 30}
//           >
//             <CartesianGrid
//               stroke="#e5e7eb"
//               strokeDasharray="3 3"
//               vertical={false}
//             />
 
//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{
//                 fill: "#6b7280",
//                 fontSize: isMobile ? 10 : 11,
//                 fontWeight: 500
//               }}
//               interval={isMobile ? 1 : 0}
//             />
 
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               domain={[0, 700]}
//               ticks={isMobile ? [0, 200, 400, 600] : [0, 200, 400, 600, 700]}
//               tick={{
//                 fill: "#6b7280",
//                 fontSize: isMobile ? 9 : 10
//               }}
//               width={isMobile ? 25 : 35}
//               tickFormatter={(value) => value.toLocaleString()}
//             />
 
//             <Tooltip content={<CustomTooltip />} />
           
//             <Bar
//               dataKey="subscriptions"
//               fill="#4D6EF1"
//               radius={isMobile ? [3, 3, 0, 0] : [4, 4, 0, 0]}
//               name="Subscriptions"
//             />
//             <Bar
//               dataKey="renewals"
//               fill="#2EDC90"
//               radius={isMobile ? [3, 3, 0, 0] : [4, 4, 0, 0]}
//               name="Renewals"
//             />
//             <Bar
//               dataKey="cancellations"
//               fill="#FF1F1F"
//               radius={isMobile ? [3, 3, 0, 0] : [4, 4, 0, 0]}
//               name="Cancellations"
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
 
//       {/* Summary Stats - Only show on mobile */}
//       {isMobile && (
//         <div className="mt-4 pt-4 border-t border-gray-200">
//           <div className="grid grid-cols-3 gap-4 text-center">
//             <div>
//               <p className="text-sm text-gray-600">Total Subs</p>
//               <p className="font-bold text-lg text-[#4D6EF1]">6,100</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Total Renewals</p>
//               <p className="font-bold text-lg text-[#2EDC90]">5,400</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Total Cancel</p>
//               <p className="font-bold text-lg text-[#FF1F1F]">1,125</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default BarChartComponent;






















import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";
 
const BarChartComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2023");
 
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
 
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
   
    checkMobile();
    window.addEventListener("resize", checkMobile);
   
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
 
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
 
  const years = ["2023", "2022", "2021", "2020", "2019"];
 
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
      {/* Header Section - Year on next line */}
      <div className="mb-4 md:mb-6">
        {/* First line: Legend items */}
        <div className="flex items-center gap-3 md:gap-6 text-sm text-gray-700 mb-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-3 h-3 rounded-full bg-[#4D6EF1] flex-shrink-0" />
            <span>New Subscriptions</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-3 h-3 rounded-full bg-[#2EDC90] flex-shrink-0" />
            <span>Renewals</span>
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-3 h-3 rounded-full bg-[#FF1F1F] flex-shrink-0" />
            <span>Cancellations</span>
          </div>
        </div>
 
        {/* Second line: Year selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 whitespace-nowrap">Year</span>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-24"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
 
      {/* Chart Container */}
      <div className="h-48 sm:h-56 md:h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: isMobile ? 10 : 30,
              left: isMobile ? -20 : 0,
              bottom: 5,
            }}
            barSize={isMobile ? 6 : 8}
            barGap={isMobile ? 3 : 4}
            barCategoryGap={isMobile ? 15 : 30}
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
              tick={{
                fill: "#6b7280",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 500
              }}
              interval={isMobile ? 1 : 0}
            />
 
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 700]}
              ticks={isMobile ? [0, 200, 400, 600] : [0, 200, 400, 600, 700]}
              tick={{
                fill: "#6b7280",
                fontSize: isMobile ? 9 : 10
              }}
              width={isMobile ? 25 : 35}
              tickFormatter={(value) => value.toLocaleString()}
            />
 
            <Tooltip content={<CustomTooltip />} />
           
            <Bar
              dataKey="subscriptions"
              fill="#4D6EF1"
              radius={isMobile ? [3, 3, 0, 0] : [4, 4, 0, 0]}
              name="Subscriptions"
            />
            <Bar
              dataKey="renewals"
              fill="#2EDC90"
              radius={isMobile ? [3, 3, 0, 0] : [4, 4, 0, 0]}
              name="Renewals"
            />
            <Bar
              dataKey="cancellations"
              fill="#FF1F1F"
              radius={isMobile ? [3, 3, 0, 0] : [4, 4, 0, 0]}
              name="Cancellations"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
 
      {/* Summary Stats - Only show on mobile */}
      {isMobile && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Total Subs</p>
              <p className="font-bold text-lg text-[#4D6EF1]">6,100</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Renewals</p>
              <p className="font-bold text-lg text-[#2EDC90]">5,400</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Cancel</p>
              <p className="font-bold text-lg text-[#FF1F1F]">1,125</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default BarChartComponent;