import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./components/pages/CreatePost";
import EditPage from "./components/pages/EditPage";
import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";
import PostPage from "./components/pages/PostPage";
import RegisterPage from "./components/pages/RegisterPage";
import Layout from "./components/utils/Layout";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Route>
    </Routes>
  );
};

export default App;
