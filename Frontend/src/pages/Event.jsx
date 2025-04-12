import React from 'react'
import Title from '../components/Title'
import EventCard from '../components/cards/EventCard'
import Vector2 from '/src/assets/Graphics/vector2.svg?url';


import PastEvent from '../components/cards/PastEvent'
import NavBar from '../components/NavBar'

const Event = () => {
  return (
    <div className=' relative'>
        <NavBar/>
        <Title heading="Upcoming Events" />
        <div className='relative z-10 flex flex-col gap-6'>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
        <img src={Vector2} width={300} className="fixed z-0 top-1/4 left-1/8 opacity-50" alt="vector" />

        <img src={Vector2} width={300} className="fixed z-0 top-2/4 left-1/8 opacity-50" alt="vector" />

        <img src={Vector2} width={300} className="fixed z-0 top-3/4 left-1/8 opacity-50" alt="vector" />

        <img src={Vector2} width={300} className="fixed z-0 top-3/4 left-1/8 opacity-50" alt="vector" />

        <Title heading="Past Events" />
        <div className='flex flex-wrap gap-10 justify-center items-center relative z-10 mx-20 mb-20'>
            <PastEvent/>
            <PastEvent/>
            <PastEvent/>
            <PastEvent/>
            <PastEvent/>
            <PastEvent/>
            <PastEvent/>
            <PastEvent/>
        </div>
    </div>
  )
}

export default Event

