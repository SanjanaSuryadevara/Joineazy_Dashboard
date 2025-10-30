import React, { useMemo } from 'react'
import { useData } from '../context/DataContext'
import ProgressBar from '../components/ProgressBar'
import AssignmentForm from '../components/AssignmentForm'

export default function AdminPage() {
  const { db, currentUser } = useData()
  const myAssignments = useMemo(() => db.assignments.filter(a => a.createdBy === currentUser.id), [db, currentUser])

  return (
    <div className="container-responsive py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">Signed in as <span className="font-medium">{currentUser.name}</span></p>
      </div>

      <AssignmentForm />

      <div className="grid md:grid-cols-2 gap-4">
        {myAssignments.map(a => {
          const total = a.assignedTo.length
          const submitted = Object.values(a.submissions).filter(s => s.submitted).length
          return (
            <div key={a.id} className="card p-4 sm:p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Due: <span className="font-medium">{a.dueDate}</span></p>
                  <a className="text-sm underline mt-1 inline-block" href={a.driveLink} target="_blank" rel="noreferrer">Drive link</a>
                </div>
              </div>
              <ProgressBar value={submitted} total={total} />
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2">Status</th>
                      <th className="py-2 pl-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.assignedTo.map(uid => {
                      const u = db.users.find(x => x.id === uid)
                      const s = a.submissions[uid]
                      return (
                        <tr key={uid} className="border-t">
                          <td className="py-2 pr-4">{u?.name}</td>
                          <td className="py-2">
                            {s?.submitted ? <span className="badge badge-green">Submitted</span> : <span className="badge badge-red">Not Submitted</span>}
                          </td>
                          <td className="py-2 pl-4">{s?.timestamp ? new Date(s.timestamp).toLocaleString() : '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
