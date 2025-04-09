import React from "react";
import { format } from "date-fns";
import { CalendarCheck, MapPin, Trophy } from "lucide-react";

const PastEvent = ({ event }) => {
  
    // imageUrl: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80"

  const formattedDate = format(new Date(event.on_date), "dd MMM yyyy");

  // Google colors
  const googleColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853"
  };

  return (
    <div className="bg-gradient-to-b from-[#4285F4] via-[#FBBC05] to-[#34A853] rounded-2xl p-[2px] max-w-xs">
      <div className="flex flex-col justify-between items-center rounded-2xl bg-white overflow-hidden h-full">
        <div className="w-full h-44 overflow-hidden">
          <img 
            src={"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80"} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4 w-full">
          <div className="flex flex-wrap gap-2 mb-2">
            {event.department.map((dept, index) => (
              <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-600" key={index}>
              Open Source
            </span>
            ))}
          </div>
          
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-600">
                  Open Source
                </span>
          
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {event.title}
          </h3>
          
          <p className="text-xs text-gray-600 mb-3 ">
            {event.description}
          </p>
          
          <div className="flex flex-col gap-2 text-xs text-gray-700">
            <div className="flex items-center gap-1">
              <CalendarCheck size={14} className="text-[#4285F4]" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-[#EA4335]" />
              <span>{event.venue.place}</span>
            </div>
            
            {event.winners && event.winners.length > 0 && (
              <div className="flex items-center gap-1">
                <Trophy size={14} className="text-[#FBBC05]" />
                <span className="font-medium">
                  {event.winners[0].position} place: {event.winners[0].user_name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastEvent;