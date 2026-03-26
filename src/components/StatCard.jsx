export default function StatCard({ title, value, valueColor = "text-gray-800" }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${valueColor}`}>{value}</p>
    </div>
  )
}