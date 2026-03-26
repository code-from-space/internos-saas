import { useState } from 'react'
import { CheckCircle, Star, BookOpen, PlayCircle, Circle } from 'lucide-react'

export default function InternDashboard() {
  // 1. We put the tasks into React State so they can change!
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix login button styling", status: "Done", time: "2 hrs ago" },
    { id: 2, title: "Build React Router navigation", status: "In Progress", time: "Active now" },
    { id: 3, title: "Write API documentation", status: "To Do", time: "Due Friday" },
    { id: 4, title: "Optimize database queries", status: "To Do", time: "Due Next Week" }
  ])

  // 2. The Interactive Function: This moves a task to the next stage
  const advanceTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (task.status === "To Do") return { ...task, status: "In Progress", time: "Just started" }
        if (task.status === "In Progress") return { ...task, status: "Done", time: "Just finished" }
      }
      return task
    }))
  }

  // 3. Automatically calculate the progress bar based on "Done" tasks!
  const completedTasks = tasks.filter(t => t.status === "Done").length
  const progressPercentage = Math.round((completedTasks / tasks.length) * 100)

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* Dynamic Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Intern!</h1>
        <p className="text-blue-100 mb-6">You are on week 4 of your 12-week Software Engineering program.</p>
        
        {/* The Live Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-3 mb-2 overflow-hidden">
          <div 
            className="bg-white h-3 transition-all duration-1000 ease-out rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm font-medium text-blue-100 text-right">{progressPercentage}% Sprint Completed</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive Task Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <CheckCircle className="mr-2 text-blue-600" size={24} />
            Current Sprint Tasks
          </h2>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg group">
                <div className="flex items-center">
                  
                  {/* The Interactive Button */}
                  <button 
                    onClick={() => advanceTask(task.id)}
                    disabled={task.status === "Done"}
                    className={`mr-4 transition-colors ${task.status === "Done" ? "text-green-500 cursor-default" : "text-gray-300 hover:text-blue-500 cursor-pointer"}`}
                  >
                    {task.status === "Done" ? <CheckCircle size={24} /> : 
                     task.status === "In Progress" ? <PlayCircle size={24} className="text-blue-500" /> : 
                     <Circle size={24} />}
                  </button>

                  <div>
                    <h3 className={`font-medium ${task.status === "Done" ? "text-gray-400 line-through" : "text-gray-800"}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500">{task.time}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
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

        {/* Sidebar Column (Mentor & Resources) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Star className="mr-2 text-yellow-500" size={20} /> Mentor Feedback
            </h2>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-sm text-gray-600 italic">"Great job on the database schema this week! Make sure to review the React Router docs before our 1-on-1 on Thursday."</p>
              <p className="text-xs font-bold text-gray-800 mt-3">— Sarah J. (Senior Engineer)</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="mr-2 text-purple-500" size={20} /> Resources
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium cursor-pointer">Employee Handbook</button>
              <button className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium cursor-pointer">Engineering Wiki</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}