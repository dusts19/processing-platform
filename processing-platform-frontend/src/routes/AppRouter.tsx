import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import PlaygroundPage from "../pages/PlaygroundPage"
import DashboardPage from "../pages/DashboardPage"
import ApiKeysPage from "../pages/ApiKeysPage"
import AppLayout from "../components/layout/AppLayout"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login"></Route>
            <Route path="/register"></Route>
            
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