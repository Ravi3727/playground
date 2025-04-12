import React from "react";
import { format } from "date-fns";
import { CalendarCheck, MapPin, Users } from "lucide-react";
import { useSession } from "@clerk/clerk-react";
const apiUrl = import.meta.env.VITE_API_URL;

const EventCard = ({ event , id }) => {

  const {session} = useSession();
  async function register(id) {
    try {
      const sessionId = session.id ;
      const response = await fetch(`${apiUrl}/events/register/${id}`, {
        method: "PATCH",
        headers: { 
          "Authorization" : `Bearer ${sessionId}`,
          "Content-Type": "application/json" 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const res = await response.json();
      if (res.statusCode === 200) {
        alert("registered susessfully.");
      } else {
        alert("Submission failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }
  
  const formattedDate = format(new Date(event.on_date), "dd MMM yyyy");

  const googleColors = {
    blue: "#4285F4",
    red: "#EA4335",
    yellow: "#FBBC05",
    green: "#34A853",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-[#4285F4] to-[#34A853] rounded-2xl p-[2px]">
        <div className="flex flex-col md:flex-row justify-between items-stretch rounded-2xl bg-white overflow-hidden w-full">
          {/* Content */}
          <div className="p-6 flex flex-col justify-between flex-1">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {event.department.map((dept, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-600"
                >
                  {dept}
                </span>
              ))}
              <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-600">
                {event.type_of_event}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              {event.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">
              {event.description}
            </p>

            {/* Event Details */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <CalendarCheck size={16} className="text-[#4285F4]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-[#EA4335]" />
                <span>
                  {event.venue.place} ({event.venue.mode})
                </span>
              </div>
              {event.registered_user_id && (
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-[#34A853]" />
                  <span>
                    {event.registered_user_id.length} registered
                  </span>
                </div>
              )}
            </div>

            {/* Button */}
            <div>
              <button className=" cursor-pointer bg-[#4285F4] hover:bg-[#3367d6] text-white px-5 py-2 rounded-xl w-full sm:w-fit"
                onClick={() => register(id)}>
                Register Now
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full md:w-[40%] h-48 md:h-auto">
            <img
              src={"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
