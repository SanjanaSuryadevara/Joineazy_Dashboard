import React from 'react'
import Navbar from './components/Navbar'
import { DataProvider, useData } from './context/DataContext'
import AdminPage from './pages/Admin'
import StudentPage from './pages/Student'

function Inner() {
  const { currentUser } = useData()
  return (
    <div className="min-h-screen">
      <Navbar />
      {currentUser.role === 'admin' ? <AdminPage /> : <StudentPage />}
      <footer className="container-responsive py-8 text-xs text-gray-500">
        <p>Demo uses <code>localStorage</code>. Switch user/role from the top-right to view student/admin views.</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <DataProvider>
      <Inner />
    </DataProvider>
  )
}
