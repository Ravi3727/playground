import React from 'react'
import BottomSection from '../components/homePageSections/bottomSection'
import TopSection from '../components/homePageSections/TopSection'
import MiddleSection from '../components/homePageSections/MiddleSection'
import WhatWeOffer from '../components/homePageSections/WhatWeOffer'
import JoinComm from '../components/homePageSections/JoinComm'
import Footer from '../components/homePageSections/Footer'

function Home() {
  return (
    <>
      <TopSection />
      <MiddleSection />
      <WhatWeOffer />
      <BottomSection />
      <JoinComm />
      <Footer></Footer>
    </>
  )
}

export default Home