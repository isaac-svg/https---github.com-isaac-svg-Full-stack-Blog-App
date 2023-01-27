import React from "react";
import { Link, useParams } from "react-router-dom";

const Posts = ({ _id, title, cover, summary, content, createdAt }) => {
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <div className="image">
          <img src={`http://localhost:4000/${cover}`} alt="Cover" />
        </div>
      </Link>
      <div className="details">
        <h2 className="title">{title}</h2>
        <time>{createdAt}</time>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Posts;
