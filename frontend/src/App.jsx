import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Chat from "./pages/Chat";
import AuditLogs from "./pages/AuditLogs";
import ChatHistory from "./pages/ChatHistory";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Settings from "./pages/Settings";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Navigate to="/dashboard" />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/audit"
                    element={
                        <ProtectedRoute>
                            <AuditLogs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <ChatHistory />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                

            </Routes>

        </BrowserRouter>

    );

}

export default App;