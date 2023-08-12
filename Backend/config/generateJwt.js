import jwt from "jsonwebtoken";

const generateJwt = (userId) => {
  jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

export default generateJwt;
