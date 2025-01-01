import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from "../services/auth.service.js";
import appAssert from "../utils/appAssert.js";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies.js";
import catchErrors from "../utils/catchErrors.js";
import {
  loginSchema,
  registerSchema,
} from "./auth.schemas.js";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse(req.body);
  const { user, accessToken, refreshToken } = await createAccount(request);
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(201)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse(req.body);
  const { accessToken, refreshToken } = await loginUser(request);

  // set cookies
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(200)
    .json({ message: "Login successful" });
});

export const logoutHandler = catchErrors(async (req, res) => {
  // clear cookies
  return clearAuthCookies(res)
    .status(200)
    .json({ message: "Logout successful" });
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  appAssert(refreshToken, 401, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(
    refreshToken
  );
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }
  return res
    .status(200)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({ message: "Access token refreshed" });
});
