import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Home from "./screens/Home.tsx";
import Auth from "./screens/Auth.tsx";
import ProtectedRoute from "./components/route/ProtectedRoute.tsx";
import { WalletProvider } from "./hooks/useWallet.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <WalletProvider>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </WalletProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
