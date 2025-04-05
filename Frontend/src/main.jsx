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
import AdminDashboard from './pages/AdminDashboard.jsx'; // Add this import
import ProtectedAdminRoute from './components/ProtectedAdminRoute.jsx'; // Add this import

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
        path: 'signin',
        element: <SignInPage />
      },
      // Admin routes - protected by role check
      {
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: '/admin',
            element: <AdminDashboard />
          }
        ]
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
