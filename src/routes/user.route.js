import { Router } from "express";
import { getUserHandler,restrictTo } from "../controllers/user.controller.js";
import authenticate from "../middleware/authenticate.js";

const userRoutes = Router();

// prefix: /user
userRoutes.get("/",authenticate, restrictTo("resell"), getUserHandler);
userRoutes.get("/",authenticate, restrictTo("user"), getUserHandler);
userRoutes.get("/", authenticate, restrictTo("user"), getUserHandler);


export default userRoutes;
