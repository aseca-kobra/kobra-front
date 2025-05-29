import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Home from "./screens/Home.tsx";
import Auth from "./screens/Auth.tsx";
import ProtectedRoute from "./components/route/ProtectedRoute.tsx";
import { WalletProvider } from "./hooks/useWallet.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { TransactionsProvider } from "./hooks/useTransactionsContext.tsx";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <WalletProvider>
            <TransactionsProvider>
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
            </TransactionsProvider>
          </WalletProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
