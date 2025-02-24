export default function LoadingState() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-xl" />
        ))}
      </div>
      
      <div className="h-64 bg-gray-200 rounded-xl mb-8" />
      <div className="h-64 bg-gray-200 rounded-xl" />
    </div>
  )
} 