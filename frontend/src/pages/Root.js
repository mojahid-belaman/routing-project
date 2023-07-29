import React, { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from "../utils/auth";

const RootLayout = () => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) return;

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDur = getTokenDuration();
    console.log(tokenDur);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDur);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main style={{ maxWidth: "60rem", margin: "auto", padding: "0 2rem" }}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
