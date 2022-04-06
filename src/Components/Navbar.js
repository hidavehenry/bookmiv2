import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../assets/logo.png'

export const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav>
      <Link to="/"><img src={logo} className="logo" /></Link>
      <ul>
        {user && <li><Link to="/profile">Profile</Link></li>}
        {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        {!user && <li><Link to="/login">Login</Link></li>}
        {!user && <li><Link to="/signup">Signup</Link></li>}
        {user && <li onClick={logout}>Logout</li>}
      </ul>
    </nav>
  )
}
