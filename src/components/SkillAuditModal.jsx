import { useState, useEffect } from 'react'
import { Sparkles, X, BrainCircuit, CheckCircle } from 'lucide-react'

export default function SkillAuditModal({ intern, onClose }) {
  const [isGenerating, setIsGenerating] = useState(true)

  // Every time the modal opens, trigger a fake 1.5s "AI Thinking" delay
  useEffect(() => {
    if (intern) {
      setIsGenerating(true)
      const timer = setTimeout(() => setIsGenerating(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [intern])

  if (!intern) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-purple-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <Sparkles size={24} className="text-purple-200" />
            <h2 className="text-xl font-bold">AI Skill Audit</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-purple-200 transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 min-h-[300px] flex flex-col justify-center">
          {isGenerating ? (
            // The "Loading" State
            <div className="text-center space-y-4 animate-pulse">
              <BrainCircuit size={48} className="mx-auto text-purple-500 animate-bounce" />
              <h3 className="text-xl font-semibold text-gray-700">Analyzing Performance Data...</h3>
              <p className="text-gray-500">Scanning GitHub commits, Jira tickets, and Slack communication for {intern.name}.</p>
            </div>
          ) : (
            // The "Finished" State
            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-bold text-gray-800">{intern.name}</h3>
                <p className="text-purple-600 font-medium">{intern.role} • {intern.status}</p>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">Executive Summary:</strong> Based on the trailing 30-day commit history and peer review metadata, {intern.name} is performing in the top 15% of the current {intern.role} cohort. 
                </p>
                <p>
                  <strong className="text-gray-800">Technical Velocity:</strong> Code quality remains consistently high. Time-to-resolution on assigned tasks is currently averaging 14% faster than the baseline benchmark for this role.
                </p>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mt-4">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                    <CheckCircle size={18} className="mr-2" /> 
                    AI Recommendation
                  </h4>
                  <p className="text-sm text-purple-700">
                    Strong candidate for a full-time return offer. Recommend assigning a complex, cross-functional epic in the next sprint to test architectural planning skills.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}