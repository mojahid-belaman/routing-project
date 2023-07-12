import EventItem from "../components/EventItem";
import { json, redirect, useRouteLoaderData } from "react-router-dom";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event_detail");
  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.id;
  const res = await fetch("http://localhost:8080/events/" + id);
  if (!res.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    return res;
  }
}

export async function action({ request, params }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });
  if (!response.ok) {
    json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
}
