import EventItem from "../components/EventItem";
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getToken } from "../utils/auth";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event_detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>LOADING...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>LOADING...</p>}>
        <Await resolve={events}>
          {(loadedEvent) => <EventsList events={loadedEvent} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const data = await response.json();
    return data.events;
  }
}

async function loaderEvent(id) {
  const res = await fetch("http://localhost:8080/events/" + id);
  if (!res.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const data = await res.json();
    return data.event;
  }
}

export async function loader({ request, params }) {
  const id = params.id;

  return defer({
    event: await loaderEvent(id),
    events: loaderEvents(),
  });
}

export async function action({ request, params }) {
  const id = params.id;
  const token = getToken();
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("/events");
}
