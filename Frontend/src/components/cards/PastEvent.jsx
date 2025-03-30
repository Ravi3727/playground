import React from "react";
import card_img2 from "../../assets/CardImage/card_img2.jpg";

const PastEvent = () => {
  return (
    <>
      {/* {First div for giving gradient border} */}
      <div className="bg-gradient-to-b from-[rgba(66,133,244,1)] to-[rgba(66,133,244,0.3)] m-auto rounded-[40px] overflow-hidden">
        <div className="flex flex-col justify-between items-center rounded-[40px] bg-white p-0 overflow-hidden m-1  w-[300px] h-[450px] ">
          <img src={card_img2} alt="card img2" width={300} className="p-0" />
          <div className="text-[#414141] p-3">
            <h2 className="text-2xl font-bold p-1 leading-[25px] tracking-[-0.25px]">
              Google Summer BootCamp
            </h2>
            <p className="text-xs p-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum officiis suscipit quis!</p>
            <div className="text-xs p-1 flex flex-col ">
              <span>26-Jan-2005</span>
              <span>Gurugram</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PastEvent;
