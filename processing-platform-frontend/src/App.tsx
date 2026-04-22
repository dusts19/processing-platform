import { Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      {/* <Route path="/api-keys" element={<ApiKeysPage />}></Route>
      <Route path="/playground" element={<PlaygroundPage />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route> */}
    </Routes>
  )
}

export default App
