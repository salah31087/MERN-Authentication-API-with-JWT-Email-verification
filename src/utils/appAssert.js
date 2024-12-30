import assert from "node:assert";
import AppError from "./AppError.js";

/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert = (condition, httpStatusCode, message, appErrorCode) =>
  assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
