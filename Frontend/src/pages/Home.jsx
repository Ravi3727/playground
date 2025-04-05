import React from 'react'
import BottomSection from '../components/homePageSections/bottomSection'
import TopSection from '../components/homePageSections/TopSection'
import MiddleSection from '../components/homePageSections/MiddleSection'
import WhatWeOffer from '../components/homePageSections/WhatWeOffer'
import JoinComm from '../components/homePageSections/JoinComm'
import Footer from '../components/homePageSections/Footer'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'

function Home() {

  const handleSendData = async (user) => {
    if (!user) return;
    
    try {
      const res = await fetch("http://localhost:5000/api/v1/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerk_id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          fullName: user.fullName,
          role: "member",
        }),
      });
        
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`); // Catch invalid response
      }
  
      const data = await res.json();
      console.log("Server response:", data);
    } catch (err) {
      console.error("Error sending data:", err);
    }
};
  
const { user, isSignedIn} = useUser();
useEffect(()=>{
    if(user){
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
      
    </>
  )
}

export default Home