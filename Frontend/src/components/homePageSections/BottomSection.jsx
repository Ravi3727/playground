import React from 'react'
import HomeCards from '../cards/HomeCards';
import ProfileCard from '../cards/ProfileCard';
import { technologies } from '../../assets/DummyData/BottomSection';
const BottomSection = () => {
    const colors=["#4285F4","#EA4335","#FBBC04"];
    const profileColors=["#34A8","#4285F4","#EA4335"]
    const profileCards = [];
    
    for (let i = 0; i < 8; i++) {
        profileCards.push(<ProfileCard key={i} color={profileColors[i % 3]} />);
    }
  return (
    <div className='w-full min-h-[100vh] overflow-x-clip  no-scrollbar flex-col flex gap-10 items-center pb-[10vh] ' >
        <div className='w-full flex flex-col items-center'>
            <h1 className='text-[#191919] font-bold text-2xl'>Our Departments</h1>
            <p className='text-[#696969] text-sm'>Explore our specialized departments and find your perfect fit.</p>

        </div>
        <div className="w-full flex justify-center gap-6 flex-wrap">
                {technologies.map((item, index) => (
                    <HomeCards key={index} obj={item} color={colors[index%3]} />
                ))}
        </div>
        <div className='w-full flex flex-col items-center'>
            <h1 className='text-[#191919] font-bold text-xl'>Meet Our Team
            </h1>
            <p className='text-[#696969] text-sm'>The passionate individuals behind GDSC DTU</p>

        </div>
        {/* slideshow */}
        <div className='w-full overflow-x-scroll flex gap-10 no-scrollbar' >
{   
profileCards
}


        </div>
        <button className='bg-[#34A853] w-fit text-white px-3 py-2 rounded-xl'>View all team members  ></button>
      
    </div>
  )
}

export default BottomSection;
