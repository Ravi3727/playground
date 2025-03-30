import React from 'react'
import person1 from "../../assets/membersPic/p2.png";
const ProfileCard = ({color}) => {
  return (
    <div >
 <div className='w-[300px] h-[350px] rounded-2xl relative' style={{backgroundColor:color}}>
 <img className='absolute bottom-0 object-fill ' src={person1} alt="" />
 </div>
      
      <h1 className='font-bold text-start px-2 '>Aditya Sharma</h1>
      <p className='text-start text-[#696969] px-2'>GDSC-LEAD</p>
    </div>
  )
}

export default ProfileCard
