import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  userProfile,
  userUpdate,
  userUpdate_admin,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(authUser);
userRoutes.route("/profile").get(protect, userProfile).put(protect, userUpdate);
userRoutes.route("/").get(protect, admin, getAllUsers);
export default userRoutes;
