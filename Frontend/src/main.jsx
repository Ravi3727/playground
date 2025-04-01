import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider, SignIn } from '@clerk/clerk-react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Event from './pages/Event.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import Layout from './Layout.jsx';
import App from './App.jsx';


// Clerk API Key from environment variable
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/projects',
        element: <ProjectPage />,
      },
      {
        path: '/events',
        element: <Event />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        path:'signin',
        element:<SignInPage/>

      }

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <RouterProvider router={router}>
        {/* <App/> */}
      </RouterProvider>
    </ClerkProvider>
  </StrictMode>
);
