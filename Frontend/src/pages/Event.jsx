import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Calendar as CalendarIcon, MapPin, Clock, List, Grid, Filter, Users } from "lucide-react";

const apiUrl = import.meta.env.VITE_BACKENDURL;

// Sample events data (will be replaced with API data when available)
const sampleEvents = [
  {
    _id: "1",
    title: "Flutter Workshop",
    description: "Learn how to build beautiful cross-platform apps with Flutter. This hands-on workshop will cover the basics of Flutter and help you build your first app.",
    on_date: "2024-04-15T18:00:00", // April 15, 6:00 PM
    department: ["Mobile Development", "Flutter"],
    type_of_event: "Workshop",
    venue: {
      place: "Online",
      mode: "Zoom"
    },
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    _id: "2",
    title: "Cloud Study Jam",
    description: "Hands-on experience with Google Cloud Platform. Learn about cloud computing, virtual machines, and how to deploy applications to the cloud.",
    on_date: "2024-04-22T14:00:00", // April 22, 2:00 PM
    department: ["Cloud", "Backend"],
    type_of_event: "Workshop",
    venue: {
      place: "DTU Campus",
      mode: "Lab 3"
    },
    image: "https://images.unsplash.com/photo-1560732488-7b5f5db671c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    _id: "3",
    title: "Hackathon 2023",
    description: "48-hour coding competition with amazing prizes. Form a team and build innovative solutions to real-world problems.",
    on_date: "2024-05-05T09:00:00", // May 5, 9:00 AM
    department: ["Competition", "Coding"],
    type_of_event: "Hackathon",
    venue: {
      place: "DTU Campus",
      mode: "Main Auditorium"
    },
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    _id: "4",
    title: "Web Development with React",
    description: "A comprehensive introduction to React.js for building modern web applications. Learn component-based architecture, state management, and more.",
    on_date: "2024-05-12T17:00:00", // May 12, 5:00 PM
    department: ["Web Development", "Frontend"],
    type_of_event: "Webinar",
    venue: {
      place: "Online",
      mode: "YouTube Live"
    },
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    _id: "5",
    title: "Tech Meetup: AI/ML Discussion",
    description: "Join fellow developers and AI enthusiasts to discuss the latest trends in artificial intelligence and machine learning.",
    on_date: "2024-05-20T18:30:00", // May 20, 6:30 PM
    department: ["AI/ML", "Research"],
    type_of_event: "Meetup",
    venue: {
      place: "Innovation Hub",
      mode: "Room 204"
    },
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
  const [filters, setFilters] = useState({
    workshops: false,
    hackathons: false,
    webinars: false,
    meetups: false,
    timeFrame: "upcoming" // upcoming, thisMonth, nextMonth, past
  });

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Comment out API fetch for now and use sample data
        
        const response = await fetch(`${apiUrl}/events/get`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const res = await response.json();

        if (res.statusCode === 200) {
          setEvents(res.data || []);
        } else {
          console.error("Error fetching events:", res.message);
          setEvents(sampleEvents);
        }
        setLoading(false);
        // Use sample data during development
        // setTimeout(() => {
        //   setEvents(sampleEvents);
        //   setLoading(false);
        // }, 500); // Simulate network delay
      } catch (error) {
        console.error("Error:", error);
        setEvents(sampleEvents); // Fallback to sample data
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get filtered events based on selected filters
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.on_date);
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const nextMonth = (currentMonth + 1) % 12;
    const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    
    // Check if matches time frame
    let matchesTimeFrame = false;
    switch (filters.timeFrame) {
      case "upcoming":
        matchesTimeFrame = eventDate >= now;
        break;
      case "thisMonth":
        matchesTimeFrame = eventDate.getMonth() === currentMonth && 
                         eventDate.getFullYear() === currentYear;
        break;
      case "nextMonth":
        matchesTimeFrame = eventDate.getMonth() === nextMonth && 
                         eventDate.getFullYear() === nextMonthYear;
        break;
      case "past":
        matchesTimeFrame = eventDate < now;
        break;
      default:
        matchesTimeFrame = eventDate >= now;
    }
    
    // Check if matches event type filters
    // If no filters are selected, show all events
    const isAnyFilterActive = filters.workshops || filters.hackathons || filters.webinars || filters.meetups;
    let matchesEventType = true;
    
    if (isAnyFilterActive) {
      matchesEventType = false;
      const type = event.type_of_event?.toLowerCase() || '';
      
      if (filters.workshops && type === 'workshop') matchesEventType = true;
      if (filters.hackathons && type === 'hackathon') matchesEventType = true;
      if (filters.webinars && type === 'webinar') matchesEventType = true;
      if (filters.meetups && type === 'meetup') matchesEventType = true;
    }
    
    return matchesTimeFrame && matchesEventType;
  });

  // Format time range (6:00 PM - 8:00 PM)
  const formatTimeRange = (dateString) => {
    const date = new Date(dateString);
    // Add 2 hours for end time (assuming 2-hour events)
    const endDate = new Date(date);
    endDate.setHours(endDate.getHours() + 2);
    
    const startTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const endTime = endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    return `${startTime} - ${endTime}`;
  };

  // Format date display (APR 15)
  const formatDateBadge = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  // Toggle filter for event types
  const toggleFilter = (filterName) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName]
    }));
  };

  // Set time frame filter
  const setTimeFrame = (timeFrame) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      timeFrame
    }));
  };

  // Generate calendar data for the calendar view
  const generateCalendarData = () => {
    // Implementation for calendar data generation
    // This would return calendar days, events for each day, etc.
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Return an object with necessary calendar data
    return {
      monthName: getMonthName(),
      year: currentYear,
      days: [] // Would contain day numbers and associated events
    };
  };

  // Get current month name
  const getMonthName = () => {
    const date = new Date();
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  };

  // Function to register for an event
  const registerForEvent = async (eventId) => {
    // Implementation for event registration
    alert(`Registered for event ${eventId}`);
  };

  // Calculate bg color for event type badge
  const getEventTypeBadgeColor = (type) => {
    const lowerType = type?.toLowerCase();
    switch (lowerType) {
      case 'workshop':
        return 'bg-blue-600';
      case 'hackathon':
        return 'bg-green-600';
      case 'webinar':
        return 'bg-purple-600';
      case 'meetup':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const handleApplyFilters = () => {
    // This would apply all the filters at once if needed
    console.log("Filters applied:", filters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Event Calendar</h1>
            <p className="text-lg text-gray-600 mb-6">
              A one-stop place for all upcoming events, hackathons, and meetings. Stay updated and never miss out.
            </p>
            <button className="px-4 py-2 flex items-center bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <CalendarIcon className="mr-2 h-4 w-4" /> Add to My Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-6">
              {/* Event Type Filters */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-3">Filter Events</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.workshops}
                      onChange={() => toggleFilter('workshops')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Workshops</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.hackathons}
                      onChange={() => toggleFilter('hackathons')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Hackathons</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.webinars}
                      onChange={() => toggleFilter('webinars')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Webinars</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={filters.meetups}
                      onChange={() => toggleFilter('meetups')}
                      className="h-4 w-4 text-blue-600 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">Meetups</span>
                  </label>
                </div>
              </div>

              {/* Time Period Filters */}
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-medium mb-3">Time Period</h3>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="timeFrame" 
                      checked={filters.timeFrame === "upcoming"}
                      onChange={() => setTimeFrame("upcoming")}
                      className="h-4 w-4 text-blue-600 mr-2"
                    />
                    <span className="text-sm text-gray-700">Upcoming</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="timeFrame" 
                      checked={filters.timeFrame === "thisMonth"}
                      onChange={() => setTimeFrame("thisMonth")}
                      className="h-4 w-4 text-blue-600 mr-2"
                    />
                    <span className="text-sm text-gray-700">This Month</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="timeFrame" 
                      checked={filters.timeFrame === "nextMonth"}
                      onChange={() => setTimeFrame("nextMonth")}
                      className="h-4 w-4 text-blue-600 mr-2"
                    />
                    <span className="text-sm text-gray-700">Next Month</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="timeFrame" 
                      checked={filters.timeFrame === "past"}
                      onChange={() => setTimeFrame("past")}
                      className="h-4 w-4 text-blue-600 mr-2"
                    />
                    <span className="text-sm text-gray-700">Past Events</span>
                  </label>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button 
                onClick={handleApplyFilters}
                className="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center bg-white shadow-sm hover:bg-gray-50"
              >
                <Filter className="mr-2 h-4 w-4" /> Apply Filters
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* View Mode Tabs */}
              <div className="border-b mb-6">
                <div className="flex">
                  <button 
                    className={`py-2 px-6 text-center ${viewMode === 'list' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <div className="flex items-center">
                      <List className="mr-2 h-4 w-4" />
                      List View
                    </div>
                  </button>
                  <button
                    className={`py-2 px-6 text-center ${viewMode === 'calendar' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
                    onClick={() => setViewMode('calendar')}
                  >
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Calendar View
                    </div>
                  </button>
                </div>
              </div>

              {/* Loading Spinner */}
              {loading && (
                <div className="flex justify-center items-center py-12">
                  <div className="spinner"></div>
                </div>
              )}

              {/* List View */}
              {!loading && viewMode === 'list' && (
                <div className="space-y-6">
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No events found matching your filters.</p>
                    </div>
                  ) : (
                    filteredEvents.map((event) => {
                      const { month, day } = formatDateBadge(event.on_date);
                      
                      return (
                        <motion.div
                          key={event._id}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
                        >
                          <div className="md:w-1/3 relative">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="h-full w-full object-cover"
                            />
                            <div className={`absolute top-3 left-3 ${getEventTypeBadgeColor(event.type_of_event)} text-white text-sm font-medium px-2 py-1 rounded`}>
                              {month} {day}
                            </div>
                          </div>
                          
                          <div className="p-6 flex-1">
                            <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-4">{event.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{formatTimeRange(event.on_date)}</span>
                              </div>
                              
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                <span>{event.venue.place} ({event.venue.mode})</span>
                              </div>
                              
                              {event.registered_user_id && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                                  <span>{event.registered_user_id.length} registered</span>
                                </div>
                              )}
                            </div>
                            
                            <button 
                              onClick={() => registerForEvent(event._id)}
                              className="px-6 py-2 bg-gray-900 hover:bg-gray-800 rounded-full text-white font-medium"
                            >
                              Register Now
                            </button>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Calendar View */}
              {!loading && viewMode === 'calendar' && (
                <div className="border rounded-lg p-4">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-xl">{getMonthName()}</h3>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    <div className="text-center p-2 text-sm font-medium">Sun</div>
                    <div className="text-center p-2 text-sm font-medium">Mon</div>
                    <div className="text-center p-2 text-sm font-medium">Tue</div>
                    <div className="text-center p-2 text-sm font-medium">Wed</div>
                    <div className="text-center p-2 text-sm font-medium">Thu</div>
                    <div className="text-center p-2 text-sm font-medium">Fri</div>
                    <div className="text-center p-2 text-sm font-medium">Sat</div>

                    {/* Calendar days would be generated dynamically based on the current month */}
                    {/* This is a simplified placeholder */}
                    {Array.from({ length: 35 }).map((_, index) => {
                      const day = index + 1 - 6; // Offset to start from previous month days
                      const isCurrentMonth = day > 0 && day <= 30;
                      const hasEvent = filteredEvents.some(event => {
                        const eventDate = new Date(event.on_date);
                        return eventDate.getDate() === day && eventDate.getMonth() === new Date().getMonth();
                      });
                      
                      const eventForDay = filteredEvents.find(event => {
                        const eventDate = new Date(event.on_date);
                        return eventDate.getDate() === day && eventDate.getMonth() === new Date().getMonth();
                      });
                      
                      let bgColorClass = "";
                      if (hasEvent && eventForDay) {
                        const eventType = eventForDay.type_of_event?.toLowerCase();
                        if (eventType === 'workshop') bgColorClass = "bg-blue-100 text-blue-600";
                        else if (eventType === 'hackathon') bgColorClass = "bg-green-100 text-green-600";
                        else if (eventType === 'webinar') bgColorClass = "bg-purple-100 text-purple-600";
                        else if (eventType === 'meetup') bgColorClass = "bg-red-100 text-red-600";
                      }
                      
                      return (
                        <div 
                          key={index} 
                          className={`text-center p-2 text-sm 
                            ${!isCurrentMonth ? 'text-gray-400' : ''} 
                            ${hasEvent ? `${bgColorClass} rounded-lg font-medium` : ''}`}
                        >
                          {day > 0 ? day : 31 + day}
                        </div>
                      );
                    })}
                  </div>

                  {/* Event Legend */}
                  <div className="mt-6 space-y-2">
                    {filteredEvents.map(event => {
                      const { month, day } = formatDateBadge(event.on_date);
                      const colorClass = getEventTypeBadgeColor(event.type_of_event).replace('bg-', '');
                      
                      return (
                        <div key={event._id} className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${getEventTypeBadgeColor(event.type_of_event)} mr-2`}></div>
                          <span className="text-sm">{month} {day} - {event.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Loading spinner styles */}
      <style jsx>{`
        .spinner {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid rgba(59, 130, 246, 0.1);
          border-top-color: #3b82f6;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Event;
