import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const login = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setTimeout(() => {
        setError("");
      }, 2000);
      return setError("Please provide credentials");
    }
    fetch("http://localhost:4000/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((fufilled) => fufilled.json())
      .then((response) => {
        if (response == "ok") {
          return setRedirect(true);
        } else {
          setTimeout(() => {
            setError("");
          }, 2000);
          return setError("Username or Password incorrect");
        }
      });
  };
  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <form className="login" onSubmit={login}>
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
      <button typeof="submit">Submit</button>
      <span className="error">{error}</span>
    </form>
  );
}
