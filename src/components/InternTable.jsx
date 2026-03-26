export default function InternTable({ interns, onUpdateStatus, onDeleteIntern }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 font-semibold text-gray-600">Intern Name</th>
            <th className="p-4 font-semibold text-gray-600">Role</th>
            <th className="p-4 font-semibold text-gray-600">Email</th>
            <th className="p-4 font-semibold text-gray-600">Mentor</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-8 text-center text-gray-500">
                No interns found. Click "+ Invite Intern" to add one!
              </td>
            </tr>
          ) : (
            interns.map((intern) => (
              <tr key={intern.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{intern.name}</td>
                
                <td className="p-4 text-gray-600">{intern.role}</td>
                <td className="p-4 text-gray-500 text-sm">{intern.email || 'No email set'}</td>

                <td className="p-4 text-gray-600">{intern.mentor}</td>
                <td className="p-4">
                  <select
                    value={intern.status}
                    onChange={(e) => onUpdateStatus(intern.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer outline-none border-none appearance-none ${
                      intern.status === 'On Track' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                </td>
                <td className="p-4 text-right flex justify-end space-x-2">
                  <button 
                    onClick={() => onAuditIntern(intern)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors cursor-pointer px-3 py-1 rounded-lg hover:bg-purple-50 flex items-center border border-purple-200 shadow-sm"
                  >
                    ✨ AI Audit
                  </button>
                  <button 
                    onClick={() => onDeleteIntern(intern.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer px-3 py-1 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}