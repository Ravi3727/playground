import React from 'react';
import BottomSection from '../components/homePageSections/bottomSection';
import TopSection from '../components/homePageSections/TopSection';
import MiddleSection from '../components/homePageSections/MiddleSection';
import WhatWeOffer from '../components/homePageSections/WhatWeOffer';
import JoinComm from '../components/homePageSections/JoinComm';
import Footer from '../components/homePageSections/Footer';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';

function Home() {
  const handleSendData = async (user) => {
    if (!user) return;

    try {
      const sessionId = user.sessionId; // Ensure sessionId is retrieved correctly
      console.log("Session ID:", sessionId); // Log the session ID for debugging

      const res = await fetch("http://localhost:5000/api/v1/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionId}`, // Pass session ID in Authorization header
        },
        body: JSON.stringify({
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          fullName: user.fullName,
          role: "member",
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Server response:", data);
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  const { user, isSignedIn } = useUser();
  useEffect(() => {
    if (user) {
      console.log("User signed up: ", user);
      handleSendData(user);
    }
  }, [user]);

  return (
    <>
      <TopSection />
      <MiddleSection />
      <WhatWeOffer />
      <BottomSection />
      <JoinComm />
      <Footer />
    </>
  );
}

export default Home;