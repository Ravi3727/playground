import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './pages/Home.jsx';
import Event from './pages/Event.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import Layout from './Layout.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx';


// Clerk API Key from environment variable
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error("Clerk Publishable Key is missing in the environment variables.");
}

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
        path:'api/v1/sign-up',
        element:<SignInPage />

      }

    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={clerkPubKey}>
  <StrictMode>
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
  </StrictMode>
  </ClerkProvider>
);
