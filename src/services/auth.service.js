import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import { signToken, verifyToken } from "../utils/jwt.js";
const refreshTokenSignOptions = {
  expiresIn: "30d",
  secret: process.env.JWT_REFRESH_SECRET,
};

export const createAccount = async ({ email, password }) => {
  const existingUser = await UserModel.findOne({ email });
  appAssert(!existingUser, 409, "Email already exists");

  const user = await UserModel.create({
    email,
    password,
  });

  const accessToken = signToken({
    userId: user._id,
  });

  const refreshToken = signToken(
    {
      userId: user._id,
    },
    refreshTokenSignOptions
  );

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  appAssert(user, 404, "User not found");

  const isValidPassword = await user.comparePassword(password);
  appAssert(isValidPassword, 401, "Invalid password");

  const accessToken = signToken({
    userId: user._id,
  });

  const refreshToken = signToken(
    {
      userId: user._id,
    },
    refreshTokenSignOptions
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken) => {
  const { payload } = verifyToken(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAssert(payload, 401, "Invalid refresh token");
  appAssert(payload.userId, 401, "Invalid refresh token payload");

  const user = await UserModel.findById(payload.userId);
  appAssert(user, 401, "User not found");

  const accessToken = signToken({
    userId: user._id,
  });

  // Only generate new refresh token if the current one is nearing expiration
  const now = Date.now();
  const tokenExp = payload.exp * 1000; // convert to milliseconds
  const timeUntilExp = tokenExp - now;
  const shouldRefresh = timeUntilExp < 24 * 60 * 60 * 1000; // less than 24 hours

  const newRefreshToken = shouldRefresh
    ? signToken(
        {
          userId: user._id,
        },
        refreshTokenSignOptions
      )
    : undefined;

  return {
    accessToken,
    newRefreshToken,
  };
};
