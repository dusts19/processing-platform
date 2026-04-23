import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      {/* <Route path="/api-keys" element={<ApiKeysPage />}></Route>
      <Route path="/playground" element={<PlaygroundPage />}></Route>*/}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      ></Route> 
    </Routes>
  )
}

export default App
