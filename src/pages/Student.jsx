import React, { useMemo } from 'react'
import { useData } from '../context/DataContext'
import AssignmentCard from '../components/AssignmentCard'

export default function StudentPage() {
  const { db, currentUser, markSubmitted } = useData()
  const myAssignments = useMemo(() => db.assignments.filter(a => a.assignedTo.includes(currentUser.id)), [db, currentUser])

  const submittedCount = myAssignments.reduce((acc, a) => acc + (a.submissions[currentUser.id]?.submitted ? 1 : 0), 0)

  return (
    <div className="container-responsive py-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">My Assignments</h2>
        <p className="text-sm text-gray-600">Completed {submittedCount} / {myAssignments.length}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {myAssignments.map(a => (
          <AssignmentCard
            key={a.id}
            a={a}
            studentId={currentUser.id}
            onConfirmSubmit={() => markSubmitted(a.id, currentUser.id)}
          />
        ))}
      </div>
    </div>
  )
}
