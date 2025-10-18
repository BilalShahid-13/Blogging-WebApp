import jwt from "jsonwebtoken";
const secretKey = "secret_key";

interface payload {
  id: string
  email: string
  username: string
  avatarUrl: string | null | undefined
}

const options: jwt.SignOptions = {
  expiresIn: '1h' // Token expires in 1 hour
};

export function generateToken(payload: payload) {
  return jwt.sign(payload, secretKey, options);
  }