import express from "express";
import dotenv from "dotenv";
import connectDB from "./connectDB.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "../client/build")));
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use(errorHandler);
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "../client/build/index.html"));
});

// app.get("/", function (req, res) {
//   res.sendFile(process.cwd() + "/public/index.html");
// });

connectDB();

app.listen(process.env.PORT || 5000, () => console.log("Server is running"));
