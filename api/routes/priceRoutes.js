import express from "express";
import { allPrice } from "../controllers/priceController.js";

const priceRoutes = express.Router();
priceRoutes.route("/").get(allPrice);

export default priceRoutes;
