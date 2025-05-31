import React from 'react'
import person1 from "../../assets/membersPic/p2.png";
import person2 from "../../assets/membersPic/lakshay.jpg";
const ProfileCard = ({ color, name, role,image }) => {
  return (
    <div >
      <div className='w-[300px] h-[350px] rounded-2xl relative z-30 '  style={{ backgroundColor: color }}>
        <img className='absolute bottom-0 object-fill hover:shadow-xl hover:scale-105 transition-all rounded-3xl border-4 border-black' src={image} alt="" />
      </div>

      <h1 className='font-bold text-start px-2 '>{name}</h1>
      <p className='text-start text-[#696969] px-2'>{role}</p>
    </div>
  )
}

export default ProfileCard
