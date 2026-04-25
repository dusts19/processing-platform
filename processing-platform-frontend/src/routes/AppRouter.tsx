import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import PlaygroundPage from "../pages/PlaygroundPage"
import DashboardPage from "../pages/DashboardPage"
import ApiKeysPage from "../pages/ApiKeysPage"
import AppLayout from "../components/layout/AppLayout"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={
                localStorage.getItem("token")
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            } />
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <AppLayout>
                        <DashboardPage />
                    </AppLayout>
                </ProtectedRoute>
            }></Route>
            
            
            <Route path="/playground" element={
                <ProtectedRoute>
                    <AppLayout>
                        <PlaygroundPage />
                    </AppLayout>
                </ProtectedRoute>
            }></Route>

            <Route path="/api-keys" element={
                <ProtectedRoute>
                    <AppLayout>
                        <ApiKeysPage />
                    </AppLayout>
                </ProtectedRoute>
            }></Route>
        </Routes>
    )
}

export default AppRouter;