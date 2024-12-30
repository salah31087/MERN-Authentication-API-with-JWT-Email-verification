import jwt from "jsonwebtoken";
import "dotenv/config";

const defaults = {
  audience: "User",
};

const accessTokenSignOptions = {
  expiresIn: "15m",
  secret: process.env.JWT_SECRET,
};

export const refreshTokenSignOptions = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET,
};

export const signToken = (payload, options) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...signOpts,
  });
};

export const verifyToken = (token, options) => {
  const { secret = process.env.JWT_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    });
    return {
      payload,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
