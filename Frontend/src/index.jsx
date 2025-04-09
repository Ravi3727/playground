import React from 'react';
import ReactDOM from 'react-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API; // Ensure this is set in your .env file

ReactDOM.render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);
