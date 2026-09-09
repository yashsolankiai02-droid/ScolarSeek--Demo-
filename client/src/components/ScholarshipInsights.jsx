import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Educational', value: 45, color: '#2563EB' },
  { name: 'Healthcare', value: 20, color: '#10B981' },
  { name: 'Sports', value: 15, color: '#F59E0B' },
  { name: 'Research', value: 10, color: '#8B5CF6' },
  { name: 'Others', value: 10, color: '#64748B' },
];

export default function ScholarshipInsights() {
  return (
    <div className="w-full h-80 glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col items-center">
      <h3 className="text-xl font-extrabold text-white mb-2">Active Scholarships by Sector</h3>
      <p className="text-xs text-slate-400 mb-4 text-center">Live breakdown of currently available government and private funding</p>
      
      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #1e293b', background: '#0f172a', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.5)' }}
              itemStyle={{ color: '#f1f5f9', fontWeight: 'bold' }}
              formatter={(value) => [`${value}%`, 'Share']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#cbd5e1', fontWeight: 500 }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-8">
          <div className="text-center">
            <span className="block text-2xl font-extrabold text-brand-600">72+</span>
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Schemes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
