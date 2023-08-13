import { HStack, useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

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
