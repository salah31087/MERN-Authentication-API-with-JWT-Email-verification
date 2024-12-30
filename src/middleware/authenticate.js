import appAssert from "../utils/appAssert.js";
import { UNAUTHORIZED } from "../constants/http.js";
import { verifyToken } from "../utils/jwt.js";


// wrap with catchErrors() if you need this to be async
const authenticate = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    "InvalidAccessToken"
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    "InvalidAccessToken"
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
