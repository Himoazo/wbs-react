import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
      <>
          <Header />
          <main>
            <Outlet />              
          </main>
          <footer>
              Moment 3, Avancerat React utveckling. 
          </footer>
      </>
  )
}

export default Layout