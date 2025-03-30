import React from 'react'
import vector from '../../assets/Graphics/vector.svg'

const Title = ({heading}) => {
  return (
    <div className=' flex flex-col justify-center items-center my-5 mt-20 relative z-50'>
        <span className='relative text-[#191919] text-7xl font-semibold leading-[64px] tracking-[-0.25px] '>{heading}
            <img src={vector} alt="vector" width={250} className=' absolute -right-12 -bottom-7' />
        </span>
        <p className='m-7 text-[#414141] text-[17px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
    </div>
  )
}
export default Title
