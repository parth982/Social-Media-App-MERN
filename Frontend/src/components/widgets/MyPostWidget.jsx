import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit,
  FiLink,
  FiMessageSquare,
  FiPaperclip,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { z } from "zod";
import useStore from "../../state/store";
import UserImage from "../Peices/UserImage";
import Wrapper from "../Peices/Wrapper";

const Practice = ({ picPath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const { user, token, setPosts } = useStore();
  const isDesktopScreen = useMediaQuery("(min-width: 1000px)");
  const mediumMain = "#00D5FA";

  const { colorMode } = useColorMode();

  const schema = z.object({
    post: z.string(),
    picture: z.any(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handlePost = async (formData) => {
    const newFormData = new FormData();
    newFormData.append("userId", user._id);
    newFormData.append("description", formData.post);
    if (image) {
      newFormData.append("picture", image);
      newFormData.append("picPath", image.name);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/posts",
        newFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const posts = response.data;
      setPosts({ posts });
      setImage(null);
      reset({ post: "", picture: null });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Flex direction="column" alignItems="center">
        <Flex
          justify="space-between"
          gap={"4"}
          align="center"
          mb="5px"
          w="100%"
        >
          <UserImage size="70px" image={picPath} />
          <Input
            placeholder="What's on your mind..."
            {...register("post")}
            flexGrow={1}
            bg={colorMode === "light" ? "#F6F6F6" : "#1A202C"}
            borderRadius="2rem"
            padding="2rem 2rem"
            color={colorMode === "light" ? "black" : "white"}
            marginRight="1rem"
            mb={3} // Adds margin-bottom
          />
        </Flex>
        {isImage && (
          <Flex justify="space-between" alignItems="center">
            <Box
              as="label"
              htmlFor="picture"
              border={`2px dashed ${mediumMain}`}
              p="10px"
              w="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              {!image ? (
                <p>
                  <Input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    {...register("picture")}
                    display="block"
                    pt={"4px"}
                    onChange={(event) => setImage(event.target.files[0])}
                  />
                </p>
              ) : (
                <Flex justify="space-between" align="center">
                  <Text>{image.name}</Text>
                  <FiEdit />
                </Flex>
              )}
            </Box>
            {image && (
              <IconButton
                onClick={() => setImage(null)}
                sx={{ width: "15%" }}
                aria-label="Delete Image"
              >
                <FiTrash2 />
              </IconButton>
            )}
          </Flex>
        )}

        <Divider mt="1.25rem" mb="1.25rem" w="100%" />

        <Flex justify="space-between" align="center" w="100%">
          <Flex
            align="center"
            onClick={() => setIsImage(!isImage)}
            cursor="pointer"
          >
            <FiLink color={mediumMain} />
            <Text color={mediumMain} ml="0.25rem">
              Image
            </Text>
          </Flex>

          {isDesktopScreen ? (
            <>
              <Flex align="center" gap="0.25rem">
                <FiMessageSquare color={mediumMain} />
                <Text color={mediumMain}>Clip</Text>
              </Flex>

              <Flex align="center" gap="0.25rem">
                <FiPaperclip color={mediumMain} />
                <Text color={mediumMain}>Attachment</Text>
              </Flex>

              <Flex align="center" gap="0.25rem">
                <FiPlus color={mediumMain} />
                <Text color={mediumMain}>Audio</Text>
              </Flex>
            </>
          ) : (
            <Flex align="center" gap="0.25rem">
              {/* Add corresponding icon here */}
            </Flex>
          )}

          <Button
            disabled={!(image || errors.post)}
            onClick={handleSubmit(handlePost)}
            sx={{
              color: "white",
              backgroundColor: "#00D5FA",
              borderRadius: "3rem",
              marginLeft: "1rem",
            }}
          >
            POST
          </Button>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Practice;
