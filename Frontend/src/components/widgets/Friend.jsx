import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { Box, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserImage from "../Peices/UserImage";
import useStore from "../../state/store";

const Friend = ({ friendId, userName, subtitle, userPicPath }) => {
  const navigate = useNavigate();

  const { setFriends, token, friends, user } = useStore();

  const mainColor = useColorModeValue("gray.700", "gray.300");
  const primaryLight = "#A3E3F1";
  const primaryDark = "#185A9D";

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${user._id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setFriends({ friends: data });
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" gap="1rem">
        <UserImage image={userPicPath} size="55px" />
        <Box
          onClick={() => {
            // navigate(`/profile/${friendId}`);
            // navigate(0);
          }}
        >
          <Text
            color={mainColor}
            fontWeight="500"
            fontSize="1.25rem"
            _hover={{ color: primaryLight, cursor: "pointer" }}
          >
            {userName}
          </Text>
          <Text color="gray.500" fontSize="0.75rem">
            {subtitle}
          </Text>
        </Box>
      </Box>
      <IconButton
        onClick={patchFriend}
        backgroundColor={primaryLight}
        p="0.6rem"
      >
        {isFriend ? (
          <FaUserMinus color={primaryDark} />
        ) : (
          <FaUserPlus color={primaryDark} />
        )}
      </IconButton>
    </Box>
  );
};

export default Friend;
