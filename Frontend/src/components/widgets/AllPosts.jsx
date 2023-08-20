import React, { useEffect, useState } from "react";
import Post from "./Post";
import useStore from "../../state/store";
import axios from "axios";

const AllPosts = ({ userId }) => {
  const { token, posts, setPosts } = useStore();
  // const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get("http://localhost:4000/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const posts = res.data;
        setPosts({ posts });
      })
      .catch((err) => console.log(err));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:4000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {posts?.posts?.map(
        ({
          _id,
          userId,
          userName,
          description,
          location,
          picPath,
          userPicPath,
          likes,
          comments,
        }) => (
          <div key={_id} style={{ marginBottom: "1rem" }}>
            <Post
              postId={_id}
              postUserId={userId}
              userName={userName}
              description={description}
              location={location}
              picPath={picPath}
              userPicPath={userPicPath}
              likes={likes}
              comments={comments}
            />
          </div>
        )
      )}
    </>
  );
};

export default AllPosts;
