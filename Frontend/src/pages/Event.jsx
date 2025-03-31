import React from 'react'
import Title from '../components/Headers/Title'
import EventCard from '../components/cards/EventCard'
import Vector2 from '/src/assets/Graphics/vector2.svg?react'
import PastEvent from '../components/cards/PastEvent'

const Event = () => {
  return (
    <div className=' relative'>
        <Title heading="Upcoming Events" />
        <div className='relative z-50 flex flex-col gap-6'>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
        <Vector2 width={300} stroke="#EA4335" className='fixed z-0 top-1/4 left-1/8 opacity-50' />
        <Vector2 width={300} stroke="#FBBC04" className='fixed z-0 top-2/4 right-1/8 opacity-50' />
        <Vector2 width={300} stroke="#34A853" className='fixed z-0 top-3/4 right-1/8 opacity-50' />
        <Vector2 width={300} stroke="#4285F4" className='fixed z-0 top-3/4 left-1/8 opacity-50' />
        <Title heading="Past Events" />
        <div className='flex flex-wrap gap-10 justify-center items-center relative z-50 mx-20 mb-20'>
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