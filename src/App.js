import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Browse from './pages/Browse'
import Dashboard from './pages/Dashboard'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './Components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user, authIsReady } = useAuthContext()


  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Browse />} />
            {user && <Route path="/profile" element={<Profile />} />}
            {user && <Route path="/dashboard" element={<Dashboard />} />}
            {!user && <Route path="/login" element={<Login />} />}
            {!user && <Route path="/signup" element={<Signup />} />}
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;