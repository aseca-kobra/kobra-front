import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import './App.css'
import Home from "./screens/Home.tsx";
import Auth from "./screens/Auth.tsx";
import ProtectedRoute from "./components/route/ProtectedRoute.tsx";

function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path="/" element={<Auth/>} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
            </Routes>
      </Router>
    </>
  )
}

export default App
