import {
  Box,
  Button,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useStore from "../../state/store";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" })
    .max(50),
});

const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsLogged, setLogin } = useStore();
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { colorMode } = useColorMode(); // Access color mode (light/dark)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = (formData) => {
    console.log("Loggin user:", formData);
    axios
      .post("http://localhost:4000/auth/login", formData)
      .then((res) => {
        setLoading(false);
        reset();
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("token", res.data.token);
        setIsLogged(true);
        setLogin(res.data.user, res.data.token);
        // navigate("/home");
      })
      .catch((err) => {
        toast({
          title: "Login Failed!!",
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
    <form onSubmit={handleSubmit((formData) => submitHandler(formData))}>
      <Box
        as={VStack}
        spacing={4}
        p={6}
        border={"1px groove"}
        boxShadow="2xl"
        borderRadius="lg"
        bg={colorMode === "light" ? "white" : "gray.700"}
        color={colorMode === "light" ? "black" : "white"}
      >
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            width={"100%"}
            placeholder="Enter your Email.."
            {...register("email")}
          />
          {errors.email && (
            <Text as={"i"} color={"tomato"}>
              {errors.email.message}
            </Text>
          )}
        </FormControl>

        <FormControl required>
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
          {errors.password && (
            <Text as={"i"} color={"tomato"}>
              {errors.password.message}
            </Text>
          )}
        </FormControl>

        <Button
          width="100%"
          colorScheme="purple"
          size="md"
          type="submit"
          isLoading={isLoading}
        >
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
