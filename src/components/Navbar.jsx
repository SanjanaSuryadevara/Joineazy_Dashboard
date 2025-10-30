import React from 'react'
import { useData } from '../context/DataContext'

export default function Navbar() {
  const { db, currentUser, setCurrentUserId, resetData } = useData()

  return (
    <header className="border-b bg-white">
      <div className="container-responsive flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-black text-white grid place-items-center font-bold">JE</div>
          <div>
            <h1 className="font-semibold leading-tight">Joineazy – Assignment Dashboard</h1>
            <p className="text-xs text-gray-500">Frontend Task • Demo (localStorage)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={currentUser.id}
            onChange={(e) => setCurrentUserId(e.target.value)}
            title="Switch Role / User (demo)"
          >
            {db.users.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
            ))}
          </select>
          <button className="btn btn-secondary text-sm" onClick={resetData} title="Reset to seed data">
            Reset
          </button>
        </div>
      </div>
    </header>
  )
}
