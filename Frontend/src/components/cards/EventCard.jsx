import React from "react";
import { format } from "date-fns";
import { CalendarCheck, MapPin, Users, Clock } from "lucide-react";
import { useSession } from "@clerk/clerk-react";
const apiUrl = import.meta.env.VITE_API_URL;

const EventCard = ({ event, id }) => {
  const { session } = useSession();
  
  async function register(id) {
    try {
      const sessionId = session.id;
      const response = await fetch(`${apiUrl}/events/register/${id}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${sessionId}`,
          "Content-Type": "application/json" 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      const res = await response.json();
      if (res.statusCode === 200) {
        alert("Registered successfully.");
      } else {
        alert("Registration failed! Try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMM yyyy");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 2);
    
    const startTime = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    const endTime = endDate.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
    
    return `${startTime} - ${endTime}`;
  };

  // Extract month and day for the badge
  const getDateBadge = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  const { month, day } = getDateBadge(event.on_date);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-md overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
      {/* Date Badge */}
      <div className="bg-blue-500 text-white text-center p-4 md:w-24 flex md:flex-col items-center justify-center">
        <div className="text-xl font-semibold uppercase mr-2 md:mr-0">{month}</div>
        <div className="text-3xl font-bold">{day}</div>
      </div>
      
      {/* Event Content */}
      <div className="flex-1 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.department?.map((dept, index) => (
            <span
              key={index}
              className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600"
            >
              {dept}
            </span>
          ))}
          {event.type_of_event && (
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
              {event.type_of_event}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span>{formatTime(event.on_date)}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            <span>{event.venue?.place} ({event.venue?.mode})</span>
          </div>
          
          {event.registered_user_id && (
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span>{event.registered_user_id.length} registered</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => register(id)}
          className="px-6 py-2 bg-gray-900 hover:bg-gray-800 transition-colors text-white font-medium rounded-full"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
