import jwt from "jsonwebtoken";

const verifyToken = async (token: string) => {
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return { message: "Token is valid" };
  } catch (error: any) {
    console.log("there is an error while creating the token", error.message);
  }
};
export default verifyToken;
