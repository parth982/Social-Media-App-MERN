import { Box, useMediaQuery } from "@chakra-ui/react";
import Navbar from "../global/NavBar";
import useStore from "../../state/store";
import UserWidget from "../../widgets/UserWidget";
// import MyPostWidget from "scenes/widgets/MyPostWidget";
// import PostsWidget from "scenes/widgets/PostsWidget";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const [isDesktopScreen] = useMediaQuery("(min-width:1000px)");
  const { user } = useStore();

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
          {/* <MyPostWidget picPath={picPath} />
          <PostsWidget userId={_id} /> */}
        </Box>
        {isDesktopScreen && (
          <Box flexBasis="26%">
            {/* <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
