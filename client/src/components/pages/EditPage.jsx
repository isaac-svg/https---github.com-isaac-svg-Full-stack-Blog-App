import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
const EditPage = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setFile(data.cover);
        setSummary(data.summary);
      });
  }, []);

  const updatePost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("file", file[0]);
    data.set("content", content);
    data.set("id", id);
    const setInfo = (res) => {
      setUserInfo(res);
    };
    fetch("http://localhost:4000/post", {
      credentials: "include",
      method: "PUT",
      body: data,
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        setRedirect(true);
      }
    });
  };
  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <form
      className="create"
      onSubmit={updatePost}
      encType="multipart/form-data"
    >
      <input
        type="title"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files)} />
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
      <button type="submit" className="createBtn">
        Create Post
      </button>
    </form>
  );
};

export default EditPage;
