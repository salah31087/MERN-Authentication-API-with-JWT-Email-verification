import { z } from "zod";
import AppError from "../utils/AppError.js";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.js";
import { REFRESH_PATH, clearAuthCookies } from "../utils/cookies.js";

const handleZodError = (res, error) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message,
  }));

  return res.status(BAD_REQUEST).json({
    errors,
    message: error.message,
  });
};

const handleAppError = (res, error) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};

const errorHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  if (error instanceof z.ZodError) {
    return handleZodError(res, error);
  }

  if (error instanceof AppError) {
    return handleAppError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;