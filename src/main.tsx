import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Routes/Routes'
import { AuthProvider } from './Context/AuthContext'
import { ProductsProvider } from './Context/ProductContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>  
    </AuthProvider>
  </StrictMode>,
)
