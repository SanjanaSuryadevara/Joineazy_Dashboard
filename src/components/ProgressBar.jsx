import React from 'react'

export default function ProgressBar({ value, total }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100)
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-black" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-gray-500 mt-1">{value} of {total} submitted</p>
    </div>
  )
}
