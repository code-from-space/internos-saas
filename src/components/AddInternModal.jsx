import { useState } from 'react'

export default function AddInternModal({ isOpen, onClose, onAdd }) {
  // This state holds the data the user types into the form
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  // If the modal isn't supposed to be open, don't show anything
  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the page from reloading
    
    // Create a new intern object
    const newIntern = {
      id: Date.now(), // Creates a unique random ID
      name: name,
      role: role,
      status: 'On Track', // Default status
      mentor: 'Pending...' // Default mentor
    }

    onAdd(newIntern) // Send the new intern back to App.jsx
    setName('') // Clear the form
    setRole('')
    onClose() // Close the modal
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Invite New Intern</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Engineering Role</label>
            <input 
              type="text" 
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Frontend Intern"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors cursor-pointer shadow-sm"
            >
              Add Intern
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}