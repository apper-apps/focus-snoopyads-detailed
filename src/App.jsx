import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Dashboard from '@/components/pages/Dashboard'
import Competitors from '@/components/pages/Competitors'
import AdsLibrary from '@/components/pages/AdsLibrary'
import Settings from '@/components/pages/Settings'

function App() {
  return (
    <div className="min-h-screen bg-background text-slate-200">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="competitors" element={<Competitors />} />
          <Route path="ads-library" element={<AdsLibrary />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App