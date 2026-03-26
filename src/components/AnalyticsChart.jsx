import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for the pitch! 
const data = [
  { week: 'Week 1', completedTasks: 12, avgScore: 85 },
  { week: 'Week 2', completedTasks: 19, avgScore: 88 },
  { week: 'Week 3', completedTasks: 15, avgScore: 82 },
  { week: 'Week 4', completedTasks: 28, avgScore: 94 },
  { week: 'Week 5', completedTasks: 35, avgScore: 96 },
]

export default function AnalyticsChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 w-full h-[400px]">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Global Fleet Velocity (Tasks Completed)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none' }}
            itemStyle={{ color: '#60a5fa' }}
          />
          <Area 
            type="monotone" 
            dataKey="completedTasks" 
            stroke="#2563eb" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTasks)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}