import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Please provide credentials");
    }

    fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((fufilled) => fufilled.json())
      .then((response) => {
        if (response.code === 11000) {
          setTimeout(() => {
            setError("");
          }, 2000);
          return setError("Username taken");
        } else if (username.length < 4 || password.length < 4) {
          setTimeout(() => {
            setError("");
          }, 2000);
          return setError(response.message);
        }
        if (response) {
          setRedirect(true);
        }
      });
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <form className="register" onSubmit={register}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button typeof="submit">Register</button>
      <span className="error">{error}</span>
    </form>
  );
};

export default RegisterPage;
