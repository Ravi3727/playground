import React from 'react'
import vector from '../assets/Graphics/vector.svg'

const Title = ({heading}) => {
  return (
   <div className='flex flex-col justify-center items-center my-5 mt-10 relative z-10 px-4 text-center'>
    <span className='relative text-[#191919] text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight sm:leading-[64px] tracking-[-0.25px]'>
        {heading}
        <img 
            src={vector} 
            alt="vector" 
            width={100} 
            className='absolute -right-6 -bottom-0 sm:-right-12 lg:-bottom-1 sm:bottom-1 w-20 lg:w-[150px] sm:w-[120px]' 
        />
    </span>
    <p className='m-4 sm:m-7 text-[#414141] text-base sm:text-[17px]'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </p>
</div>

  )
}
export default Title
