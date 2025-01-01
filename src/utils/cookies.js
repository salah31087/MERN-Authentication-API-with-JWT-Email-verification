export const REFRESH_PATH = "/auth/refresh";



export const getAccessTokenCookieOptions = () => ({
  sameSite: "strict",
  httpOnly: true,
  secure: true,
  expires: Date.now() + 15 * 60 * 1000,
});

export const getRefreshTokenCookieOptions = () => ({
  sameSite: "strict",
  httpOnly: true,
  secure: true,
  expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
  path: "/auth/refresh",
});

export const setAuthCookies = ({ res, accessToken, refreshToken }) =>
  res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res) =>
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH });
