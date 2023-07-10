import React from "react";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  // const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main style={{ maxWidth: "60rem", margin: "auto", padding: "0 2rem" }}>
        {/* {navigation.state === 'loading' && <p>LOADING...</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
