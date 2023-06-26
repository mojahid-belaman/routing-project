import React from "react";
import EventsNavigation from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

function RootEventLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default RootEventLayout;
