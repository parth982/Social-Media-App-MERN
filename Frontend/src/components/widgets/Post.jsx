import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Box,
  Divider,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Friend from "../widgets/Friend";
import Wrapper from "../Peices/Wrapper";
import useStore from "../../state/store";

const Post = ({
  postId,
  postUserId,
  userName,
  description,
  location,
  picPath,
  userPicPath,
  likes,
  comments,
}) => {
  const { token, setPost, user, posts } = useStore();
  const loggedInUserId = user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const mainColor = useColorModeValue("gray.700", "gray.300");
  const primaryColor = "#319795";

  const patchLike = async () => {
    const response = await fetch(`http://localhost:4000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    setPost({ updatedPost });
  };

  return (
    <Wrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        userName={userName}
        subtitle={location}
        userPicPath={userPicPath}
      />
      <Text color={mainColor} mt="1rem">
        {description}
      </Text>

      {picPath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:4000/assets/${picPath}`}
        />
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="0.5rem"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={patchLike}
            icon={
              isLiked ? (
                <AiFillHeart color={primaryColor} />
              ) : (
                <AiOutlineHeart />
              )
            }
          />
          <Text ml="0.5rem">{likeCount}</Text>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Post;
