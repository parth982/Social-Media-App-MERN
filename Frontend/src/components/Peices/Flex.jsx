import { Box } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";

const FlexBetween = chakra(Box, {
  baseStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default FlexBetween;
