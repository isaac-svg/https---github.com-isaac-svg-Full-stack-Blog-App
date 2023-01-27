import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../../Context/userContext";
import Posts from "../utils/Posts";

const IndexPage = () => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const [postInfo, setPostInfo] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/post`)
      .then((fufilled) => fufilled.json())
      .then((res) => setPostInfo(res));
  }, []);

  return (
    <>
      {postInfo.length > 0 &&
        postInfo.map((post) => <Posts key={post._id} {...post} />)}
    </>
  );
};

export default IndexPage;
