import React, { useEffect } from "react";
import Post from "../components/Post";
import useStore from "../state/store";
import axios from "axios";

const AllPosts = ({ userId }) => {
  const { token, posts, setPosts } = useStore();

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

  useEffect(() => {
    getPosts();
  }, [posts]);

  return (
    <>
      {posts?.map(
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
