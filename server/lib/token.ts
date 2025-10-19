import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
const secretKey = "secret_key";

interface payload extends jwt.JwtPayload {
  id: string
  email: string
  username: string
  avatarUrl: string | null | undefined
}

const options: jwt.SignOptions = {
  expiresIn: '1d' // Token expires in 1 hour
};

export function generateToken(payload: payload) {
  return jwt.sign(payload, secretKey, options);
}

export function verifyToken(token: string): payload | null {
  try {
    return jwt.verify(token, secretKey) as payload
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken?.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Consider it expired if decoding fails
  }
}