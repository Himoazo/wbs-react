import { NavLink } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

const Header = () => {
  const { user, logout } = useAuth();
  return (
      <header>
          <ul>
              <li> <NavLink to="/">Start</NavLink> </li>
              <li><NavLink to="/manager">Hantera produkter</NavLink></li>
              <li>
                {
                  !user ? <NavLink to="/login">Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                }
              </li>
      </ul>
      
      <h1>{user ? `Inloggad: ${user.Username}` : ""}</h1>
    </header>
  )
}

export default Header