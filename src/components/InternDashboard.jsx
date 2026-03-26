import { CheckCircle, Clock, BookOpen, Star } from 'lucide-react'

export default function InternDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Intern!</h1>
        <p className="text-blue-100 mb-6">You are on week 4 of your 12-week Software Engineering program.</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-3 mb-2">
          <div className="bg-white rounded-full h-3 w-1/3"></div>
        </div>
        <p className="text-sm font-medium text-blue-100 text-right">33% Completed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Task Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="mr-2 text-blue-600" size={24} />
            Current Sprint Tasks
          </h2>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
            {[
              { title: "Fix login button styling", status: "Done", time: "2 hrs ago" },
              { title: "Build React Router navigation", status: "In Progress", time: "Active now" },
              { title: "Write API documentation", status: "To Do", time: "Due Friday" }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === 'Done' ? 'bg-green-100 text-green-700' :
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Mentor Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Star className="mr-2 text-yellow-500" size={20} />
              Mentor Feedback
            </h2>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-sm text-gray-600 italic">"Great job on the database schema this week! Make sure to review the React Router docs before our 1-on-1 on Thursday."</p>
              <p className="text-xs font-bold text-gray-800 mt-3">— Sarah J. (Senior Engineer)</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="mr-2 text-purple-500" size={20} />
              Resources
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">Employee Handbook</button>
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">Engineering Wiki</button>
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">Request Time Off</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}