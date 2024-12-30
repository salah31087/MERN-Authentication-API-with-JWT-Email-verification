import { NOT_FOUND, OK } from "../constants/http.js";
import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});
