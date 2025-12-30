import jwt from "jsonwebtoken";

const createToken = async (tokenName: string, data: unknown) => {
  const expires = "7d";
  try {
    return jwt.sign({ [tokenName]: data }, process.env.JWT_SECRET!, {
      expiresIn: expires,
    });
  } catch (error: any) {
    console.log("there is an error while creating the token", error.message);
  }
};

export default createToken;
