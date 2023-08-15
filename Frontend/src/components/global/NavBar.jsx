import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  EmailIcon,
  HamburgerIcon,
  QuestionIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";
import ColorModeSwitch from "../Color Mode/ColorModeSwitch";

const NavBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const navigate = useNavigate();
  const [isDesktopScreen] = useMediaQuery("(min-width: 768px)");
  const { user, setLogout } = useStore();
  const { colorMode } = useColorMode();

  const textColor = { light: "gray.700", dark: "gray.200" };
  const bgColor = { light: "gray.100", dark: "gray.700" };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogout();
    navigate("/");
  };

  return (
    <Box
      bg={bgColor[colorMode]}
      color={colorMode === "dark" ? "white" : "black"}
      boxShadow="md"
      px={2}
    >
      <Flex justify="space-between" align="center" p="1rem" boxShadow="md">
        <Flex align="center">
          <Heading as="h1" size="lg">
            MediaX
          </Heading>
          {isDesktopScreen && (
            <InputGroup ml="4">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color={textColor[colorMode]} />
              </InputLeftElement>
              <Input type="text" placeholder="Search.." />
            </InputGroup>
          )}
        </Flex>

        {isDesktopScreen ? (
          // Display elements for desktop screens
          <Flex align="center">
            <ColorModeSwitch />
            <ChatIcon mx="3" color={textColor[colorMode]} fontSize="20px" />
            <BellIcon mx="3" color={textColor[colorMode]} fontSize="20px" />
            <EmailIcon mx="3" color={textColor[colorMode]} fontSize="20px" />
            <QuestionIcon mx="3" color={textColor[colorMode]} fontSize="20px" />
            <Menu size={"sm"}>
              <MenuButton
                as={Button}
                size={"sm"}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                colorScheme={colorMode === "dark" ? "gray" : "blue"}
              >
                {user?.userName}
              </MenuButton>
              <MenuList>
                <MenuItem>Your Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log-Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          // Display only the hamburger icon for mobile screens
          <IconButton
            icon={<HamburgerIcon />}
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            ml="4"
            colorScheme={colorMode === "dark" ? "gray" : "blue"}
          />
        )}
      </Flex>
      {/* Mobile menu list */}
      {isMobileMenuToggled && !isDesktopScreen && (
        <Box
          position="fixed"
          top="0px"
          right="0"
          height="48%"
          zIndex="10"
          width="35%"
          bg={colorMode === "dark" ? "gray.700" : "white"}
          px="4"
          pt="2"
          border={"1px groove "}
          borderRadius={7}
          shadow={"2xl"}
        >
          <Flex justify="flex-end">
            <IconButton
              size={"xs"}
              icon={<CloseIcon />}
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              colorScheme={colorMode === "dark" ? "gray" : "blue"}
            />
          </Flex>
          <Flex
            flexDirection="column"
            alignItems={"center"}
            gap={4}
            mt="2"
            spacing="2"
          >
            <ColorModeSwitch />
            <ChatIcon color={textColor[colorMode]} fontSize="20px" />
            <BellIcon color={textColor[colorMode]} fontSize="20px" />
            <EmailIcon color={textColor[colorMode]} fontSize="20px" />
            <QuestionIcon color={textColor[colorMode]} fontSize="20px" />
            <Menu>
              <MenuButton
                size={"sm"}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                colorScheme={colorMode === "dark" ? "gray" : "blue"}
              >
                Brian
                {/* {user.userName} */}
              </MenuButton>
              <MenuList>
                <MenuItem>Your Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log-Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
