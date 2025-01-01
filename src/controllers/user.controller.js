import UserModel from "../models/user.model.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, 404, "User not found");
  return res.status(200).json(user.omitPassword());
});
export const restrictTo = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Vérifier si req.userId est défini
      if (!req.userId) {
        return res.status(401).json({
          status: "fail",
          message: "User ID not found. Authentication is required.",
        });
      }

      // Rechercher l'utilisateur dans la base de données
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found.",
        });
      }

      // Vérifier si le type de compte est autorisé
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          status: "fail",
          message: "You do not have permission to perform this action.",
        });
      }

      // Si l'utilisateur est autorisé, passer au middleware suivant
      next();
    } catch (error) {
      console.error("Error in restrictTo middleware:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error.",
      });
    }
  };
};