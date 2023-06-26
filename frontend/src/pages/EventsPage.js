import React, { useEffect, useState } from "react";
import EventsList from "../components/EventsList";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch("http://localhost:8080/events");
        if (!resp.ok) {
          throw new Error("Something Went Wrong!");
        }
        const data = await resp.json();
        setEvents(data.events);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchEvents();
  }, []);
  let content = <p style={{ textAlign: "center" }}>Not Founds Events.</p>;
  if (events.length > 0) {
    content = <EventsList events={events} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (loading) {
    content = <p style={{ textAlign: "center" }}>LOADING...</p>;
  }
  return <>{content}</>;
};

export default EventsPage;
