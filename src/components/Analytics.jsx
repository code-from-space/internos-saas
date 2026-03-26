import AnalyticsChart from './AnalyticsChart'
import { TrendingUp, Users, Activity } from 'lucide-react'

export default function Analytics() {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Analytics Hub</h2>
        <p className="text-gray-500 mt-1">Deep dive into your engineering fleet's performance.</p>
      </div>

      {/* Mini Stat row for the Analytics page */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><TrendingUp size={24} /></div>
          <div><p className="text-gray-500 text-sm">Velocity Score</p><p className="text-2xl font-bold text-gray-800">94%</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><Users size={24} /></div>
          <div><p className="text-gray-500 text-sm">Retention Rate</p><p className="text-2xl font-bold text-gray-800">98%</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg text-green-600"><Activity size={24} /></div>
          <div><p className="text-gray-500 text-sm">System Health</p><p className="text-2xl font-bold text-gray-800">Optimal</p></div>
        </div>
      </div>

      {/* The Chart */}
      <AnalyticsChart />
    </div>
  )
}