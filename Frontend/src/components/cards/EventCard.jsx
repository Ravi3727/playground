import React from "react";
import image from "../../assets/CardImage/card_img1.jpg";
const EventCard = () => {
  return (
    <>
      {/* {First div for giving gradient border} */}
      <div className="bg-gradient-to-b from-[rgba(66,133,244,1)] to-[rgba(66,133,244,0.5)] m-auto rounded-[38px]"> 
        <div className="flex flex-col md:flex-row justify-between items-center rounded-[38px] bg-white md:pl-6 py-4 md:py-0 overflow-hidden m-1 w-[340px] md:w-[740px] h-auto md:h-[165px]"> 
          <div className="text-[#414141] text-center md:text-left"> 
            <h2 className="text-lg md:text-xl font-semibold p-1">Google Summer BootCamp</h2> 
            <p className="text-xs md:text-sm p-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum officiis suscipit quis!</p> 
              <div className="text-xs md:text-sm p-1 flex flex-col md:flex-row gap-4 md:gap-12 font-semibold"> 
                <span>Date of event 26-Jan-2005</span>
                <span>Gurugram</span> 
              </div> 
          </div> 
          <img src={image} alt="image" className="rounded-[38px] md:rounded-none md:w-[400px] max-w-xs md:max-w-none mt-4 md:mt-0" /> 
        </div> 
      </div>
    </>
  );
};
export default EventCard;
