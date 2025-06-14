import jwt from "jsonwebtoken";
export const verifyToken = async (token: string) => {
  const verification: jwt.JwtPayload = jwt.verify(
    token,
    process.env.JWT_TOKEN_KEY as string
  ) as jwt.JwtPayload;
  return verification;
};

export const getToken = (authHeader: string | null) => {
  if (authHeader && authHeader.startsWith("Bearer "))
    return authHeader.split(" ")[1];

  return null;
};
