import { Box, Divider, useMediaQuery } from "@chakra-ui/react";
import useStore from "../../state/store";
import Navbar from "../global/NavBar";
import CreatePost from "../widgets/CreatePost";
import UserWidget from "../widgets/UserWidget";
import AllPosts from "../widgets/AllPosts";

import FriendsList from "../widgets/FriendsList";
import NavBar from "../global/NavBar";

const HomePage = () => {
  const [isDesktopScreen] = useMediaQuery("(min-width:1000px)");
  const { user } = useStore();

  // const isProfile = user?._id === userId;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isDesktopScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isDesktopScreen ? "26%" : undefined}>
          <UserWidget userId={user?._id} picPath={user?.picPath} />
        </Box>
        <Box
          flexBasis={isDesktopScreen ? "42%" : undefined}
          mt={isDesktopScreen ? undefined : "2rem"}
        >
          <CreatePost picPath={user.picPath} />

          <Divider my="1rem" />
          <AllPosts userId={user._id} isProfile={true} />
        </Box>
        {isDesktopScreen && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            {/* <Box m="2rem 0" /> */}
            <FriendsList userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
