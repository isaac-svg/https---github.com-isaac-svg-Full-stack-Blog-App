import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "../../Context/userContext";

const Header = () => {
  const [redirect, setRedirect] = useState(false);
  /**
   * Update
   * I corrected  api call (side Effect) outside a useEffect
   * i.e the logout function
   * by introducing a new state as a depency for the effect
   *  */
  // state to play as a depency for the logout Effect
  const [signIn, setSignIn] = useState(false);
  const { userInfo, setUserInfo } = useContext(userContext);
  const username = userInfo?.username;
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((fufilled) => fufilled.json())
      .then((response) => setUserInfo((prev) => (prev = response)));
  }, []);
  const logout = (e) => {
    e.preventDefault();
    setSignIn(true);
    useEffect(() => {
      fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      }).then((response) => {
        if (response.ok) {
          setRedirect(true);
        }
      });

      return () => setSignIn(false);
    }, [signIn]);
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>

      {username && (
        <>
          <nav>
            <Link to={"/create"}>Create Post</Link>
            <Link to={"/logout"} onClick={logout}>
              Logout
            </Link>
          </nav>
        </>
      )}
      {!username && (
        <>
          <nav>
            <Link to={"/login"}>Login In</Link>
            <Link to={"/register"}>Register</Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
