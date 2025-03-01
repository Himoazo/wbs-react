import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <nav className="w-full sm:w-auto mb-4 sm:mb-0">
          <ul className="flex space-x-6">
            <li>
              <NavLink to="/" className="text-white hover:text-blue-300 transition-colors">
                Start
              </NavLink>
            </li>
            <li>
              <NavLink to="/manager" className="text-white hover:text-blue-300 transition-colors">
                Hantera produkter
              </NavLink>
            </li>
            <li>
              {!user ? (
                <NavLink to="/login" className="text-white hover:text-blue-300 transition-colors">
                  Logga in
                </NavLink>
              ) : (
                <button onClick={logout} className="text-white hover:text-red-300 transition-colors">
                  Logga ut
                </button>
              )}
            </li>
          </ul>
        </nav>
        
        {user && (
          <h1 className="text-sm font-medium bg-slate-700 px-3 py-1 rounded-full">
            Inloggad: <span className="font-bold">{user.username}</span>
          </h1>
        )}
      </div>
    </header>
  )
}

export default Header