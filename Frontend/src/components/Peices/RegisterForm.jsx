import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { z } from "zod";

const schema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string(),
  picPath: z.string(),
  location: z.string(),
  occupation: z.string(),
});

const RegisterForm = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const { colorMode } = useColorMode();

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = (formData) => {
    setLoading(true);
    axios
      .post("http://localhost:4000/auth/register", formData)
      .then((res) => {
        setLoading(false);
        reset();
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) => {
        toast({
          title: "Registration Failed!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit((formData) => submitHandler(formData))}
    >
      <Box
        as={VStack}
        spacing={1}
        px={6}
        py={4}
        border={"1px groove"}
        boxShadow="2xl"
        borderRadius="lg"
        bg={colorMode === "light" ? "white" : "gray.700"}
        color={colorMode === "light" ? "black" : "white"}
      >
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input {...register("userName")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input {...register("email")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Location</FormLabel>
          <Input {...register("location")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Occupation</FormLabel>
          <Input {...register("occupation")} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setValue("picPath", acceptedFiles[0].name);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                p="10px"
                width="100%"
                border="2px dashed teal"
                borderRadius="md"
                _hover={{ cursor: "pointer" }}
              >
                <Input {...getInputProps()} />
                {!getValues().picPath ? (
                  <Text fontSize="md" fontWeight="bold" color="gray.500">
                    Add Picture Here
                  </Text>
                ) : (
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>{getValues().picPath}</Text>
                    <MdEdit />
                  </Flex>
                )}
              </Box>
            )}
          </Dropzone>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          mt={2}
          width="100%"
          colorScheme="purple"
          size="md"
          type="submit"
          isLoading={isLoading}
        >
          Register
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
