import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { load, save } from '../utils/storage'

const DataContext = createContext(null)

// Seed data
const seed = () => ({
  users: [
    { id: 'u_admin', name: 'Professor Ada', role: 'admin' },
    { id: 'u_sanjana', name: 'Sanjana Suryadevara', role: 'student' },
    { id: 'u_aarav', name: 'Aarav Sharma', role: 'student' },
  ],
  // assignments: created by admins; assignedTo is list of userIds (students)
  assignments: [
    {
      id: 'a1',
      title: 'Intro to DS – Problem Set 1',
      dueDate: '2025-11-05',
      driveLink: 'https://drive.google.com/',
      createdBy: 'u_admin',
      assignedTo: ['u_sanjana', 'u_aarav'],
      submissions: {
        // userId: { submitted: boolean, timestamp: string }
        'u_sanjana': { submitted: false, timestamp: null },
        'u_aarav': { submitted: true, timestamp: '2025-10-28T10:00:00Z' },
      },
    },
    {
      id: 'a2',
      title: 'Web Dev – Responsive Layout',
      dueDate: '2025-11-10',
      driveLink: 'https://drive.google.com/',
      createdBy: 'u_admin',
      assignedTo: ['u_sanjana'],
      submissions: {
        'u_sanjana': { submitted: false, timestamp: null },
      },
    },
  ],
})

export const DataProvider = ({ children }) => {
  const [db, setDb] = useState(() => load('je_db', null) ?? seed())
  const [currentUserId, setCurrentUserId] = useState(() => load('je_user', 'u_sanjana'))

  useEffect(() => save('je_db', db), [db])
  useEffect(() => save('je_user', currentUserId), [currentUserId])

  const currentUser = useMemo(() => db.users.find(u => u.id === currentUserId), [db, currentUserId])

  const createAssignment = (payload) => {
    setDb(prev => ({
      ...prev,
      assignments: [
        ...prev.assignments,
        {
          id: `a_${Date.now()}`,
          title: payload.title,
          dueDate: payload.dueDate,
          driveLink: payload.driveLink,
          createdBy: currentUserId,
          assignedTo: payload.assignedTo,
          submissions: Object.fromEntries(payload.assignedTo.map(id => [id, { submitted: false, timestamp: null }])),
        },
      ],
    }))
  }

  const markSubmitted = (assignmentId, studentId) => {
    setDb(prev => ({
      ...prev,
      assignments: prev.assignments.map(a => {
        if (a.id !== assignmentId) return a
        return {
          ...a,
          submissions: {
            ...a.submissions,
            [studentId]: { submitted: true, timestamp: new Date().toISOString() },
          },
        }
      })
    }))
  }

  const resetData = () => {
    const seeded = seed()
    setDb(seeded)
    save('je_db', seeded)
  }

  const value = {
    db, setDb,
    currentUser, setCurrentUserId,
    createAssignment, markSubmitted, resetData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)
