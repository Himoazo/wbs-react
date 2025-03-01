import Header from "./Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
      <>
          <Header />
          <main>
            <Outlet />              
          </main>
          <footer className="bg-slate-800 text-white p-4 shadow-md text-center">
              Moment 3, Avancerat React utveckling. 
          </footer>
      </>
  )
}

export default Layout