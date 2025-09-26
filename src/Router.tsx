import { Route, Routes } from 'react-router-dom'

import App from './App'
import Login from './pages/auth/login'

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Auth" element={<Login />} />
    </Routes>
  )
}
