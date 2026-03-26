import { useState } from 'react'
import { X } from 'lucide-react'

export default function AddInternModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('Frontend Developer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') // <-- NEW PASSWORD STATE

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    // Pass everything, including the password, back to App.jsx
    onAdd({ name, role, email, password }) 
    setName('')
    setEmail('')
    setPassword('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Invite New Intern</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Jane Doe" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Intern's Email Address</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="jane@company.com" />
          </div>

          {/* NEW PASSWORD FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Minimum 6 characters" minLength="6" />
            <p className="text-xs text-gray-500 mt-1">Provide this to the intern so they can log in.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer">
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
          </div>
          
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg transition-colors cursor-pointer">
              Create Account & Add to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}