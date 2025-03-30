import React from "react";
import image from "../../assets/CardImage/card_img1.jpg";
const EventCard = () => {
  return (
    <>
      {/* {First div for giving gradient border} */}
      <div className="bg-gradient-to-b from-[rgba(66,133,244,1)] to-[rgba(66,133,244,0.5)] m-auto rounded-[38px]"> 
        <div className="flex justify-between items-center rounded-[38px] bg-white pl-6 py-0 overflow-hidden m-0.5 w-[800px] h-[165px] ">
          <div className="text-[#414141] ">
            <h2 className="text-xl font-semibold p-1">Google Summer BootCamp</h2>
            <p className="text-xs p-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum officiis suscipit quis!</p>
            <div className="text-sm p-1 flex gap-12 font-semibold"><span>Date of event 26-Jan-2005</span><span>Gurugram</span></div>
          </div>
          <img src={image} alt="image" width={400} />
        </div>
      </div>
    </>
  );
};
export default EventCard;
