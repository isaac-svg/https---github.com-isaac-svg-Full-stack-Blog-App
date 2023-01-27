import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => response.json())
      .then((data) => setPostInfo(data));
  }, []);

  return (
    <>
      <div className="post">
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="Cover" />
        </div>
        {id === postInfo._id && <Link to={`/edit/${postInfo._id}`}>Edit</Link>}
        <div className="details">
          <h2 className="title">{postInfo.title}</h2>
          <time>{postInfo.createdAt}</time>
          <p className="summary">{postInfo.summary}</p>
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
