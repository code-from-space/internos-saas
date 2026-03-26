import { Building, Lock, Bell } from 'lucide-react'

export default function Settings() {
  return (
    <div className="max-w-4xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Workspace Settings</h2>
        <p className="text-gray-500 mt-1">Manage your company profile and preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Settings Tabs (Visual only for the pitch) */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4">
          <button className="px-6 py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">General</button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">Security</button>
          <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">Billing</button>
        </div>

        <div className="p-8 space-y-8">
          {/* Company Profile Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
              <Building className="mr-2 text-gray-400" size={20} /> Company Profile
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input type="text" defaultValue="Acme Corp" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input type="email" defaultValue="hr@acmecorp.com" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Security Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
              <Lock className="mr-2 text-gray-400" size={20} /> Authentication
            </h3>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-800">Require Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-gray-500">Force all interns to use a secondary device to log in.</p>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}