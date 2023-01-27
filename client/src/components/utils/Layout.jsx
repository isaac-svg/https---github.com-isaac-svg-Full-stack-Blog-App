import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const [proved, setProved] = useState({});
  // useEffect(() => {
  //   fetch("http://localhost:4000/profile")
  //     .then((response) => {
  //       console.log(response, "response from layout");
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data, "data from layout");
  //       return setProved(data);
  //     });
  // }, []);
  // console.log(proved, "proved from layout component");
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
