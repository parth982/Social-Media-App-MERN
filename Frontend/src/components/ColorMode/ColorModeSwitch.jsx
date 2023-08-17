import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, IconButton, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <IconButton
        size={"sm"}
        mx={2}
        colorScheme={colorMode === "dark" ? "blue" : "gray"}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        aria-label={
          colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      />
    </HStack>
  );
};

export default ColorModeSwitch;
