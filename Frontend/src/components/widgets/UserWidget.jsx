import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  MdEdit,
  MdManageAccounts,
  MdOutlineLocationOn,
  MdWorkOutline,
} from "react-icons/md";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";
import UserImage from "../Peices/UserImage";
import Wrapper from "../Peices/Wrapper";

const UserWidget = ({ userId, picPath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { token } = useStore();
  const textColor = useColorModeValue("gray.800", "gray.200");

  const getUser = () => {
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://localhost:4000/users/${userId}`, { headers })
      .then((res) => {
        setUser(res.data.user);
      });
  };
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const { userName, location, occupation, friends } = user;

  return (
    <Wrapper>
      <Flex
        direction="column"
        color={textColor}
        borderRadius="lg"
        minWidth={"280px"}
        p={2}
        onClick={() => navigate(`/profile/${userId}`)}
        _hover={{ cursor: "pointer" }}
      >
        <Flex align="center" justify="space-between" mb="3">
          <Flex align="center">
            <UserImage image={picPath} size="80px" />
            <Box ml="3">
              <Heading as="h4" size="md" _hover={{ color: "purple.500" }}>
                {userName}
              </Heading>
              <Text>{friends?.length} friends</Text>
            </Box>
          </Flex>
          <Icon as={MdManageAccounts} fontSize="xl" color="gray.400" />
        </Flex>
        <Divider my="2" />
        <Flex direction="column" gap="2">
          <Flex align="center">
            <Icon as={MdOutlineLocationOn} fontSize="xl" color="gray.400" />
            <Text ml="2">{location}</Text>
          </Flex>
          <Flex align="center">
            <Icon as={MdWorkOutline} fontSize="xl" color="gray.400" />
            <Text ml="2">{occupation}</Text>
          </Flex>
        </Flex>
        <Divider my="2" />
        <Flex justify="space-between" align="center" mb="2">
          <Text>Who's viewed your profile</Text>
          <Text fontWeight="500">1003</Text>
        </Flex>
        <Flex justify="space-between" align="center" mb="2">
          <Text>Impressions on your Post</Text>
          <Text fontWeight="500">7886</Text>
        </Flex>
        <Divider my="2" />
        <Flex direction="column" gap="2">
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <img src="../assets/twitter.png" size="36px" />
              <Box ml="2">
                <Text fontWeight="500">Twitter</Text>
              </Box>
            </Flex>
            <Icon as={MdEdit} color="teal.300" />
          </Flex>
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <img src="../assets/linkedin.png" size="36px" />
              <Box ml="2">
                <Text fontWeight="500">LinkedIn</Text>
              </Box>
            </Flex>
            <Icon as={MdEdit} color="teal.300" />
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default UserWidget;
