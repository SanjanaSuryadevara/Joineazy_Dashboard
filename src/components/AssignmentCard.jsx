import React, { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

export default function AssignmentCard({ a, studentId, onConfirmSubmit }) {
  const [step, setStep] = useState(0) // 0 idle, 1 first 'Yes', 2 dialog
  const sub = a.submissions[studentId]
  const submitted = sub?.submitted

  const firstClick = () => setStep(1)
  const openDialog = () => setStep(2)
  const closeDialog = () => setStep(0)
  const confirm = () => { onConfirmSubmit(); setStep(0) }

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="font-semibold">{a.title}</h3>
          <div className="text-sm text-gray-600 mt-1">
            Due: <span className="font-medium">{a.dueDate}</span>
          </div>
          <a className="text-sm underline mt-1 inline-block" href={a.driveLink} target="_blank" rel="noreferrer">
            Drive link
          </a>
        </div>
        <div className="flex items-center gap-2">
          {submitted ? (
            <span className="badge badge-green">Submitted</span>
          ) : (
            <span className="badge badge-red">Not Submitted</span>
          )}
        </div>
      </div>

      {!submitted && (
        <div className="mt-4 flex flex-wrap gap-2">
          {step === 0 && (
            <button className="btn btn-primary" onClick={firstClick}>
              Yes, I have submitted
            </button>
          )}
          {step === 1 && (
            <button className="btn btn-secondary" onClick={openDialog}>
              Confirm submission
            </button>
          )}
        </div>
      )}

      <ConfirmDialog
        open={step === 2}
        title="Final confirmation"
        description="Are you sure you have submitted this assignment externally (Drive link)? This will mark your status as submitted."
        onConfirm={confirm}
        onCancel={closeDialog}
      />
    </div>
  )
}
