import React, { useMemo, useState } from 'react'
import { useData } from '../context/DataContext'

export default function AssignmentForm() {
  const { db, createAssignment } = useData()
  const students = useMemo(() => db.users.filter(u => u.role === 'student'), [db.users])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [driveLink, setDriveLink] = useState('')
  const [assignedTo, setAssignedTo] = useState(students.map(s => s.id)) // default: all

  const toggleStudent = (id) => {
    setAssignedTo(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const submit = (e) => {
    e.preventDefault()
    if (!title || !dueDate || !driveLink || assignedTo.length === 0) return
    createAssignment({ title, dueDate, driveLink, assignedTo })
    setTitle(''); setDueDate(''); setDriveLink(''); setAssignedTo(students.map(s => s.id))
  }

  return (
    <form onSubmit={submit} className="card p-4 sm:p-5">
      <h3 className="font-semibold mb-4">Create Assignment</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input className="w-full border rounded-xl px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., Algorithms – HW2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input type="date" className="w-full border rounded-xl px-3 py-2" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Drive Link</label>
          <input className="w-full border rounded-xl px-3 py-2" value={driveLink} onChange={e=>setDriveLink(e.target.value)} placeholder="https://drive.google.com/..." />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Assign to students</p>
        <div className="flex flex-wrap gap-2">
          {students.map(s => (
            <label key={s.id} className="flex items-center gap-2 border rounded-xl px-3 py-2 cursor-pointer">
              <input type="checkbox" checked={assignedTo.includes(s.id)} onChange={() => toggleStudent(s.id)} />
              <span className="text-sm">{s.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="btn btn-primary" type="submit">Create</button>
      </div>
    </form>
  )
}
