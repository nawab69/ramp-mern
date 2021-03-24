import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  allPayment,
  createPayment,
  deletePayment,
  paidPayment,
  readPayment,
  updatePayment,
} from "../controllers/paymentControllers.js";

const paymentRoutes = express.Router();
paymentRoutes.route("/").get(protect, allPayment);
paymentRoutes.route("/create").post(protect, admin, createPayment);
paymentRoutes.route("/:id").get(protect, readPayment);
paymentRoutes.route("/:id").put(protect, updatePayment);
paymentRoutes.route("/:id").delete(protect, admin, deletePayment);
paymentRoutes.route("/paid/:id").post(protect, paidPayment);

export default paymentRoutes;
