import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  CreditCard, 
  ShieldCheck, 
  Laptop, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { name: 'Fleet View', path: '/', icon: <Users size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <LayoutDashboard size={20} /> },
    { name: 'Skill Audits', path: '/audits', icon: <ClipboardCheck size={20} /> },
    { name: 'Payroll & Billing', path: '/billing', icon: <CreditCard size={20} /> },
    { name: 'Compliance', path: '/compliance', icon: <ShieldCheck size={20} /> },
    { name: 'Asset Tracker', path: '/assets', icon: <Laptop size={20} /> },
  ]

  return (
    <aside className={`bg-slate-900 text-white transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-blue-600 rounded-full p-1 border-4 border-gray-50 hover:bg-blue-500 transition-colors cursor-pointer z-10"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-6">
        <h1 className={`font-bold text-blue-400 whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'text-sm' : 'text-2xl mb-8'}`}>
          {isCollapsed ? 'iOS' : 'InternOS'}
        </h1>
        
        <nav className={`space-y-2 ${isCollapsed ? 'mt-8' : ''}`}>
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className="flex items-center py-3 px-3 hover:bg-slate-800 rounded-lg text-gray-300 transition-all group"
              title={isCollapsed ? item.name : ''}
            >
              <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <span className="ml-3 font-medium whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings at the bottom */}
      <div className="absolute bottom-0 w-full p-6">
        <Link 
          to="/settings" 
          className="flex items-center py-3 px-3 hover:bg-slate-800 rounded-lg text-gray-300 transition-all group"
          title={isCollapsed ? "Settings" : ""}
        >
          <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
            <Settings size={20} />
          </div>
          {!isCollapsed && <span className="ml-3 font-medium">Settings</span>}
        </Link>
      </div>
    </aside>
  )
}