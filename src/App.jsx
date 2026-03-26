import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import InternTable from './components/InternTable'
import AddInternModal from './components/AddInternModal'
import Login from './components/Login'
import InternDashboard from './components/InternDashboard' // <-- Ensure this import is here!
import AnalyticsChart from './components/AnalyticsChart'
import SkillAuditModal from './components/SkillAuditModal'
import { Routes, Route } from 'react-router-dom'
import Analytics from './components/Analytics'
import Settings from './components/Settings'


function App() {
  const [session, setSession] = useState(null)
  const [interns, setInterns] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('') 
  const [auditIntern, setAuditIntern] = useState(null)


  // 1. Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  // 2. Fetch Data
  useEffect(() => {
    const fetchInterns = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase.from('interns').select('*')
        if (error) console.error("Error fetching data:", error.message)
        if (data) setInterns(data)
      }
    }
    if (session) fetchInterns()
  }, [session])

  // 3. Handlers
  const handleAddIntern = async (newInternData) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase.from('interns').insert([{ name: newInternData.name, role: newInternData.role, user_id: user.id }]).select()
    if (error) {
      alert("Error saving: " + error.message)
    } else if (data) {
      setInterns([...interns, data[0]])
    }
  }

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('interns').update({ status: newStatus }).eq('id', id)
    if (!error) {
      setInterns(interns.map(intern => intern.id === id ? { ...intern, status: newStatus } : intern))
    }
  }

  const handleDeleteIntern = async (id) => {
    if (!window.confirm("Are you sure you want to remove this intern?")) return;
    const { error } = await supabase.from('interns').delete().eq('id', id)
    if (!error) {
      setInterns(prev => prev.filter(intern => intern.id !== id))
    }
  }

  // 4. Search Filter
  const filteredInterns = interns.filter(intern =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    intern.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 5. The Bouncer
  if (!session) return <Login />

  // 6. Role Check - THE MULTI-TENANT UPGRADE
  const currentUserEmail = session?.user?.email?.toLowerCase().trim() || '';
  
  // Create a VIP list of all your authorized HR/Company accounts
  const adminEmails = [
    'admin@gmail.com',
    'company2@gmail.com' // <--- Add your second company email here!
  ];
  
  // Check if the currently logged-in user is anywhere on that VIP list
  const isHR = adminEmails.includes(currentUserEmail);

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto max-h-screen">
        <Routes>
          
          {/* ROUTE 1: The Main Dashboard (Fleet View or Intern Portal) */}
          <Route path="/" element={
            <>
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{isHR ? 'Global Fleet View' : 'My Portal'}</h2>
                  <p className="text-gray-500 mt-1">{isHR ? 'Monitor all active engineering interns' : 'Manage your tasks and progress'}</p>
                </div>
                <div className="flex space-x-4">
                  <button onClick={async () => { await supabase.auth.signOut(); setInterns([]); }} className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 cursor-pointer transition-colors">Sign Out</button>
                  {isHR && (
                    <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm cursor-pointer">+ Invite Intern</button>
                  )}
                </div>
              </header>

              {isHR ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Active Interns" value={interns.length} />
                    <StatCard title="At Risk (Inactivity)" value={interns.filter(i => i.status === 'At Risk').length} valueColor="text-red-500" />
                    <StatCard title="Tasks Completed (This Week)" value="0" valueColor="text-green-600" />
                  </div>
                  <div className="mb-6">
                    <input type="text" placeholder="Search by name or role..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-96 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all" />
                  </div>
                  <InternTable interns={filteredInterns} onUpdateStatus={handleUpdateStatus} onDeleteIntern={handleDeleteIntern} onAuditIntern={setAuditIntern} />
                </>
              ) : (
                <InternDashboard />
              )}
            </>
          } />

          {/* ROUTE 2: Analytics Page */}
          <Route path="/analytics" element={<Analytics />} />

          {/* ROUTE 3: Settings Page */}
          <Route path="/settings" element={<Settings />} />

        </Routes>
      </main>

      

      <AddInternModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddIntern} />
      
      {/* THE NEW AI MODAL */}
      <SkillAuditModal intern={auditIntern} onClose={() => setAuditIntern(null)} />
    </div>
  )
}

export default App