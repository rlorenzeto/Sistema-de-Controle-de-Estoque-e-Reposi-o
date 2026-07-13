import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Login from './screens/Login.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Stock from './screens/Stock.jsx'
import Sale from './screens/Sale.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
   {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/stock',
    element: <Stock />
  },
  {
    path: '/sale',
    element: <Sale />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
