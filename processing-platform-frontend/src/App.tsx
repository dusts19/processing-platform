
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './routes/AppRouter'
// import ProtectedRoute from './components/auth/ProtectedRoute'
// import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
