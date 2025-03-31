import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import App from './App.jsx'
import Event from './pages/Event.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element: <Home/>
      },
      {
        path:'/projects',
        element:<ProjectPage/>
      },
      {
        path:'/events',
        element:<Event/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
