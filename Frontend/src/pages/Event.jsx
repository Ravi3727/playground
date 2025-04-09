import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import EventCard from "../components/cards/EventCard";
const apiUrl = import.meta.env.VITE_API_URL;

import PastEvent from "../components/cards/PastEvent";
import NavBar from "../components/NavBar";

const Event = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  async function getEventData() {
    try {
      const response = await fetch(`${apiUrl}/events/get`);

      if (!response.ok) {
        throw new Error("Failed to fetch event data");
      }

      const res = await response.json();

      if (res.statusCode === 200) {
        const allEvents = res.data || [];

        const now = new Date();

        const upcoming = [];
        const past = [];

        allEvents.forEach((event) => {
          const eventDate = new Date(event.on_date);
          if (eventDate >= now) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } else {
        alert("Can't fetch event data!");
      }
    } catch (err) {
      console.log(`Error is: ${err}`);
    }
  }

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <div className=" relative">
      <NavBar />
      <Title heading="Upcoming Events" />
      <div className="relative z-10 flex flex-col gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard key={event._id} id={event._id} event={event} />
          ))
        ) : (
          <p className="text-gray-500 m-auto text-2xl">No upcoming events.</p>
        )}
      </div>
      <Title heading="Past Events" />
      <div className="flex flex-wrap gap-10 justify-center items-center relative z-10 mx-20 mb-20">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => <PastEvent key={event._id} event={event} />)
        ) : (
          <p className="text-gray-500 m-auto text-2xl">No past events.</p>
        )}
      </div>
    </div>
  );
};

export default Event;
