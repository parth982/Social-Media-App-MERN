import { Box, useMediaQuery } from "@chakra-ui/react";
import useStore from "../../state/store";
import Navbar from "../global/NavBar";
import MyPostWidget from "../widgets/MyPostWidget";
import UserWidget from "../widgets/UserWidget";
// import MyPostWidget from "../widgets/MyPostWidget";
// import PostsWidget from "../widgets/PostsWidget";
// import AdvertWidget from "../widgets/AdvertWidget";
// import FriendListWidget from "../widgets/FriendListWidget";

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
          <MyPostWidget picPath={user.picPath} />
          {/* <PostsWidget userId={_id} /> */}
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
