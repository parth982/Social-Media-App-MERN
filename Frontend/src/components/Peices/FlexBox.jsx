import { Box } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";

const FlexBox = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default FlexBox;
